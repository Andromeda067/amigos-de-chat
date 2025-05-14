import { Text, View } from "react-native";
import { useState } from "react"


export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Implementar lógica de login aqui
    console.log("Login com:", email, password)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black p-5 text-white">
      <div className="flex flex-col mt-4">
        {/* Cabeçalho */}
        <h1 className="text-3xl font-bold mb-1">Olá</h1>
        <h1 className="text-3xl font-bold mb-4">Bem vindo(a) novamente </h1>

        <p className="text-gray-400 text-sm mb-8"> Faça login agora para melhor experiencia no seus games !</p>

        {/* Formulário */}
        <div className="space-y-4 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">

            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
              className="w-full bg-zinc-900 rounded-full py-3 pl-10 pr-4 text-white border border-zinc-800 focus:outline-none focus:border-[#00E676]"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">

            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full bg-zinc-900 rounded-full py-3 pl-10 pr-4 text-white border border-zinc-800 focus:outline-none focus:border-[#00E676]"
            />
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <button className="text-gray-300 text-sm">Esqueceu a senha ?</button>
        </div>

        {/* Botão de Login */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleLogin}
            className="bg-[#00E676] text-black font-bold py-3 px-8 rounded-full hover:bg-[#00C462] transition-colors"
          >
            Login
          </button>
        </div>

        {/* Link para cadastro */}
        <div className="flex justify-center items-center">
          <span className="text-gray-400 text-sm">Não tem conta ? </span>
          <button className="text-[#00E676] text-sm font-medium ml-1">Criar conta</button>
        </div>
      </div>
    </div>
  )
}
