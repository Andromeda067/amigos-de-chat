import React from "react";
import { auth } from './firebase';
import { useRouter } from 'expo-router';
import { signOut } from "firebase/auth";

export default function GameListScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error: any) {
      alert(`Erro ao fazer logout: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] p-5 text-white">
      {/* Botão voltar */}
      <button
        onClick={() => router.push('/')}
        className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center mb-10"
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
        <h1 className="text-3xl font-bold mb-1">Escolha um Jogo</h1>
        <p className="text-[#999999] text-sm mb-8">
          Selecione um jogo para começar a jogar agora!
        </p>

        {/* Lista de jogos */}
        <div className="space-y-4 mb-6">
          {/* Botão Jogo 1 */}
          <button
            onClick={() => router.push('/rooms?game=Jogo1')}
            className="w-full bg-[#111111] border border-[#333333] rounded-full py-3 px-8 text-white font-medium hover:bg-[#1A1A1A] transition-colors flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 text-[#00E676]"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#00E676"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#00E676"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#00E676"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Jogo 1
          </button>

          {/* Botão Jogo 2 */}
          <button
            onClick={() => router.push('/rooms?game=Jogo2')}
            className="w-full bg-[#111111] border border-[#333333] rounded-full py-3 px-8 text-white font-medium hover:bg-[#1A1A1A] transition-colors flex items-center justify-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 text-[#00E676]"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#00E676"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#00E676"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#00E676"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Jogo 2
          </button>
        </div>

        {/* Botão de Logout */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleLogout}
            className="w-full bg-[#FF3D00] text-white font-bold py-3 px-8 rounded-full hover:bg-[#D32F00] transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}