import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from './firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import Svg, { Path } from "react-native-svg";

type Room = {
  id: string;
  name: string;
  game: string;
};

export default function RoomListScreen() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoom, setNewRoom] = useState('');
  const router = useRouter();
  const { game } = useLocalSearchParams();

  useEffect(() => {
    if (!game) return;
    const q = query(collection(db, 'rooms'), where('game', '==', game));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRooms(snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name ?? '',
          game: data.game ?? '',
        } as Room;
      }));
    });
    return () => unsubscribe();
  }, [game]);

  const handleCreateRoom = async () => {
    if (!newRoom) {
      Alert.alert("Erro", 'Por favor, insira um nome para a sala.');
      return;
    }
    try {
      await addDoc(collection(db, 'rooms'), {
        name: newRoom,
        game,
      });
      setNewRoom('');
    } catch (error: any) {
      Alert.alert("Erro", `Erro ao criar sala: ${error.message}`);
    }
  };

  const renderRoomItem = ({ item }: { item: Room }) => (
    <TouchableOpacity
      onPress={() => router.push(`/chat/${item.id}`)}
      style={styles.roomButton}
    >
      <Text style={styles.roomText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão voltar */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
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
        <Text style={styles.title}>Salas de {game}</Text>
        <Text style={styles.subtitle}>
          Junte-se a uma sala ou crie uma nova para começar a jogar!
        </Text>

        {/* Lista de salas */}
        <FlatList
          data={rooms}
          renderItem={renderRoomItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma sala encontrada para {game}.</Text>
          }
          style={styles.roomList}
        />

        {/* Formulário para criar sala */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              style={styles.icon}
            >
              <Path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
                stroke="#777777"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <TextInput
              value={newRoom}
              onChangeText={setNewRoom}
              placeholder="Nome da nova sala"
              style={styles.input}
              placeholderTextColor="#999999"
            />
          </View>
          <TouchableOpacity onPress={handleCreateRoom} style={styles.createButton}>
            <Text style={styles.createButtonText}>Criar Sala</Text>
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
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: '#999999',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  roomList: {
    flexGrow: 1,
    marginBottom: 24,
  },
  roomButton: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  roomText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
  },
  emptyText: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    padding: 12,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#00E676',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});