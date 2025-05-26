import React from "react";
import { auth, db } from './firebase';
import { useState } from "react";
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !username || !email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    if (!termsAccepted) {
      alert("Você deve aceitar os Termos de Serviço e a Política de Privacidade.");
      return;
    }

    try {
      // Criar usuário com e-mail e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Atualizar o perfil do usuário com o nome
      await updateProfile(user, { displayName: name });

      // Salvar nome de usuário no Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        username,
        email,
        createdAt: new Date().toISOString(),
      });

      router.push('/games');
    } catch (error: any) {
      alert(`Erro ao criar conta: ${error.message}`);
    }
  };

  const handleGoogleSignup = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: user.displayName || "Usuário Google",
            username: user.email ? user.email.split('@')[0] : "default_username", // Use part of the email as the default username
            email: user.email,
            createdAt: new Date().toISOString(),
        });

        router.push('/games');
    } catch (error: any) {
      alert(`Erro ao fazer cadastro com Google: ${error.message}`);
    }
  };

  const handleAppleSignup = async () => {
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

 
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "Usuário Apple",
        username: user.email ? user.email.split('@')[0] : `apple_user_${user.uid.slice(0, 8)}`, // Nome de usuário padrão
        email: user.email || "N/A",
        createdAt: new Date().toISOString(),
      });

      router.push('/games');
    } catch (error: any) {
      alert(`Erro ao fazer cadastro com Apple: ${error.message}`);
    }
  };

  const handleGameCenterSignup = () => {
    alert("Cadastro com Game Center não está disponível em navegadores web. Use um aplicativo iOS para acessar esta funcionalidade.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] p-5 text-white">
      {/* Botão voltar */}
      <button onClick={() => router.push('/')} className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center mb-10">
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
        <h1 className="text-3xl font-bold mb-1">Olá,</h1>
        <h1 className="text-3xl font-bold mb-4">Crie sua conta</h1>

        <p className="text-[#999999] text-sm mb-8">Cadastre-se agora para uma experiência completa nos seus jogos!</p>

        {/* Formulário */}
        <div className="space-y-4 mb-4">
          {/* Campo Nome */}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              className="w-full bg-[#111111] rounded-full py-3 pl-10 pr-4 text-white border border-[#333333] focus:outline-none focus:border-[#00E676]"
            />
          </div>

          {/* Campo Nome de Usuário */}
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
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nome de usuário"
              className="w-full bg-[#111111] rounded-full py-3 pl-10 pr-4 text-white border border-[#333333] focus:outline-none focus:border-[#00E676]"
            />
          </div>

          {/* Campo Email */}
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
                <rect x="4" y="6" width="16" height="12" rx="2" stroke="#777777" strokeWidth="2" />
                <path
                  d="M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9"
                  stroke="#777777"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full bg-[#111111] rounded-full py-3 pl-10 pr-4 text-white border border-[#333333] focus:outline-none focus:border-[#00E676]"
            />
          </div>

          {/* Campo Senha */}
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
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="#777777" strokeWidth="2" />
                <path
                  d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full bg-[#111111] rounded-full py-3 pl-10 pr-4 text-white border border-[#333333] focus:outline-none focus:border-[#00E676]"
            />
          </div>

          {/* Campo Confirmar Senha */}
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
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="#777777" strokeWidth="2" />
                <path
                  d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar senha"
              className="w-full bg-[#111111] rounded-full py-3 pl-10 pr-4 text-white border border-[#333333] focus:outline-none focus:border-[#00E676]"
            />
          </div>
        </div>

        {/* Termos e condições */}
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 border border-[#333333] rounded bg-[#111111] focus:ring-[#00E676] focus:ring-2"
            />
          </div>
          <label htmlFor="terms" className="ml-2 text-sm text-[#999999]">
            Eu concordo com os <span className="text-[#00E676]">Termos de Serviço</span> e{" "}
            <span className="text-[#00E676]">Política de Privacidade</span>
          </label>
        </div>

        {/* Botão de Cadastro */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSignup}
            className="w-full bg-[#00E676] text-black font-bold py-3 px-8 rounded-full hover:bg-[#00C462] transition-colors"
          >
            Criar Conta
          </button>
        </div>

        {/* Separador */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex-grow h-px bg-[#333333]"></div>
          <span className="px-4 text-[#999999] text-sm">ou continue com</span>
          <div className="flex-grow h-px bg-[#333333]"></div>
        </div>

        {/* Botões de cadastro social - primeira linha */}
        <div className="flex space-x-4 mb-4">
          {/* Botão Google */}
          <button
            onClick={handleGoogleSignup}
            className="flex-1 flex items-center justify-center bg-[#111111] border border-[#333333] rounded-full py-3 hover:bg-[#1A1A1A] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                fill="#FFC107"
              />
              <path
                d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z"
                fill="#FF3D00"
              />
              <path
                d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z"
                fill="#4CAF50"
              />
              <path
                d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                fill="#1976D2"
              />
            </svg>
            <span className="ml-2 text-white">Google</span>
          </button>
        </div>

        {/* Link para login */}
        <div className="flex justify-center items-center">
          <span className="text-[#999999] text-sm">Já tem uma conta? </span>
          <button onClick={() => router.push('/')} className="text-[#00E676] text-sm font-medium ml-1">Fazer login</button>
        </div>
      </div>
    </div>
  );
}