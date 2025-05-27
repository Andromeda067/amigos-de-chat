import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { auth, db, rtdb } from '../firebase';
import { ref, push, onChildAdded, query, orderByChild, off } from 'firebase/database';
import { doc, getDoc } from "firebase/firestore";
import Svg, { Path } from "react-native-svg";

type Message = {
  id: string;
  text: string;
  user: string;
  createdAt: number;
};

export default function ChatRoomScreen() {
  const { roomId } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  const flatListRef = useRef<FlatList<Message>>(null); // Ref for scrolling to the latest message

  useEffect(() => {
    if (!roomId) return;

    const messagesRef = ref(rtdb, `rooms/${roomId}/messages`);
    const messagesQuery = query(messagesRef, orderByChild('createdAt'));

    const handleNewMessage = (snapshot: { val: () => any; key: any; }) => {
      const messageData = snapshot.val();
      setMessages((prev) => [...prev, { id: snapshot.key, ...messageData }]);
    };

    onChildAdded(messagesQuery, handleNewMessage);

    return () => {
      off(messagesRef, 'child_added', handleNewMessage); // Proper cleanup of listener
    };
  }, [roomId]);

  // Scroll to the latest message whenever messages update
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message) {
      Alert.alert("Erro", 'Por favor, insira uma mensagem.');
      return;
    }
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error('Usuário não autenticado');

      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      const nick = userDocSnap.exists() ? userDocSnap.data().username : auth.currentUser?.email;

      const messagesRef = ref(rtdb, `rooms/${roomId}/messages`);
      await push(messagesRef, {
        text: message,
        user: nick,
        createdAt: Date.now(),
      });
      setMessage('');
    } catch (error: any) {
      Alert.alert("Erro", `Erro ao enviar mensagem: ${error.message}`);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageUser}>{item.user}:</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botão voltar */}
      <TouchableOpacity onPress={() => router.push('/games')} style={styles.backButton}>
        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <Path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Cabeçalho */}
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.subtitle}>Converse com outros jogadores na sala!</Text>

        {/* Lista de mensagens */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhuma mensagem ainda. Seja o primeiro a conversar!
            </Text>
          }
          style={styles.messageList}
        />

        {/* Formulário para enviar mensagem */}
        <View style={styles.inputContainer}>
          <View style={styles.textInputWrapper}>
            <Svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={styles.inputIcon}
            >
              <Path
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M22 6L12 13L2 6"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Digite sua mensagem"
              style={styles.textInput}
              placeholderTextColor="#999999"
            />
          </View>
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    color: '#999999',
    fontSize: 14,
    marginBottom: 32,
  },
  messageList: {
    flex: 1,
    marginBottom: 24,
  },
  messageContainer: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  messageUser: {
    fontWeight: 'bold',
    color: '#00E676',
    marginRight: 4,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  emptyText: {
    color: '#999999',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  inputIcon: {
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF',
    padding: 12,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#00E676',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  sendButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});