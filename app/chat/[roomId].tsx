import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

export default function ChatRoomScreen() {
  const { roomId } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!roomId) return;
    const q = query(collection(db, `rooms/${roomId}/messages`), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async () => {
    if (!message) {
      alert('Por favor, insira uma mensagem.');
      return;
    }
    try {
      await addDoc(collection(db, `rooms/${roomId}/messages`), {
        text: message,
        user: auth.currentUser?.email || 'Anônimo',
        createdAt: serverTimestamp()
      });
      setMessage('');
    } catch (error: any) {
      alert(`Erro ao enviar mensagem: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] p-5 text-white">
      {/* Botão voltar */}
      <button
        className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center mb-10"
        onClick={() => router.back()}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex flex-col flex-1">
        {/* Cabeçalho */}
        <h1 className="text-3xl font-bold mb-1">Chat</h1>
        <p className="text-[#999999] text-sm mb-8">
          Converse com outros jogadores na sala!
        </p>

        {/* Lista de mensagens */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map(message => (
              <div
                key={message.id}
                className="bg-[#111111] border border-[#333333] rounded-lg p-3"
              >
                <span className="font-bold text-[#00E676]">{message.user}:</span>{' '}
                <span className="text-white">{message.text}</span>
              </div>
            ))
          ) : (
            <p className="text-[#999999] text-sm">Nenhuma mensagem ainda. Seja o primeiro a conversar!</p>
          )}
        </div>

        {/* Formulário para enviar mensagem */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#777777]"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem"
              className="w-full bg-[#111111] rounded-full py-3 pl-10 pr-4 text-white border border-[#333333] focus:outline-none focus:border-[#00E676]"
            />
          </div>
          <button
            onClick={sendMessage}
            className="bg-[#00E676] text-black font-bold py-3 px-6 rounded-full hover:bg-[#00C462] transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}