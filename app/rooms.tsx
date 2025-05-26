import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { db } from './firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

export default function RoomListScreen() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  const router = useRouter();
  const { game } = useLocalSearchParams();

  useEffect(() => {
    if (!game) return;
    const q = query(collection(db, 'rooms'), where('game', '==', game));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [game]);

  const handleCreateRoom = async () => {
    if (!newRoom) {
      alert('Por favor, insira um nome para a sala.');
      return;
    }
    try {
      await addDoc(collection(db, 'rooms'), {
        name: newRoom,
        game
      });
      setNewRoom('');
    } catch (error: any) {
      alert(`Erro ao criar sala: ${error.message}`);
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

      <div className="flex flex-col mt-4">
        {/* Cabeçalho */}
        <h1 className="text-3xl font-bold mb-1">Salas de {game}</h1>
        <p className="text-[#999999] text-sm mb-8">
          Junte-se a uma sala ou crie uma nova para começar a jogar!
        </p>

        {/* Lista de salas */}
        <div className="space-y-4 mb-6">
          {rooms.length > 0 ? (
            rooms.map(room => (
              <button
                key={room.id}
                onClick={() => router.push(`/chat/${room.id}`)}
                className="w-full bg-[#111111] border border-[#333333] rounded-full py-3 px-4 text-white hover:bg-[#1A1A1A] transition-colors text-left"
              >
                {room.name}
              </button>
            ))
          ) : (
            <p className="text-[#999999] text-sm">Nenhuma sala encontrada para {game}.</p>
          )}
        </div>

        {/* Formulário para criar sala */}
        <div className="space-y-4 mb-6">
          <div className="relative">
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
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              placeholder="Nome da nova sala"
              className="w-full bg-[#111111] rounded-full py-3 pl-10 pr-4 text-white border border-[#333333] focus:outline-none focus:border-[#00E676]"
            />
          </div>
          <button
            onClick={handleCreateRoom}
            className="w-full bg-[#00E676] text-black font-bold py-3 px-8 rounded-full hover:bg-[#00C462] transition-colors"
          >
            Criar Sala
          </button>
        </div>
      </div>
    </div>
  );
}