
import { useState } from "react"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Implementar lógica de login aqui
    console.log("Login com:", email, password)
  }

  const handleGoogleLogin = () => {
    console.log("Login com Google")
  }

  const handleAppleLogin = () => {
    console.log("Login com Apple")
  }

  const handleGameCenterLogin = () => {
    console.log("Login com Game Center")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] p-5 text-white">
      {/* Botão voltar */}
      <button className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center mb-10">
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
        <h1 className="text-3xl font-bold mb-4">Bem vindo(a) novamente </h1>

        <p className="text-[#999999] text-sm mb-8">Faça login agora para melhor experiencia no seus games !</p>

        {/* Formulário */}
        <div className="space-y-4 mb-4">
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
              placeholder="Password"
              className="w-full bg-[#111111] rounded-full py-3 pl-10 pr-4 text-white border border-[#333333] focus:outline-none focus:border-[#00E676]"
            />
          </div>
        </div>

        <div className="flex justify-end mb-5">
          <button className="text-[#00E676] text-sm font-medium">Esqueceu a senha ?</button>
        </div>

        {/* Botão de Login */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleLogin}
            className="w-full bg-[#00E676] text-black font-bold py-3 px-8 rounded-full hover:bg-[#00C462] transition-colors"
          >
            Login
          </button>
        </div>

        {/* Separador */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex-grow h-px bg-[#333333]"></div>
          <span className="px-4 text-[#999999] text-sm">ou continue com</span>
          <div className="flex-grow h-px bg-[#333333]"></div>
        </div>

        {/* Botões de login social - primeira linha */}
        <div className="flex space-x-4 mb-4">
          {/* Botão Google */}
          <button
            onClick={handleGoogleLogin}
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

          {/* Botão Apple */}
          <button
            onClick={handleAppleLogin}
            className="flex-1 flex items-center justify-center bg-[#111111] border border-[#333333] rounded-full py-3 hover:bg-[#1A1A1A] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.05 20.28C16.07 21.23 15 21.08 13.97 20.63C12.88 20.17 11.88 20.15 10.73 20.63C9.28998 21.25 8.52998 21.07 7.66998 20.28C2.78998 15.25 3.50998 7.59 9.04998 7.31C10.4 7.38 11.34 8.05 12.13 8.11C13.31 7.87 14.44 7.18 15.7 7.27C17.21 7.39 18.35 7.99 19.1 9.07C15.98 10.94 16.72 15.05 19.58 16.2C19.01 17.7 18.27 19.19 17.04 20.29L17.05 20.28ZM12.03 7.25C11.88 5.02 13.69 3.18 15.77 3C16.06 5.58 13.43 7.5 12.03 7.25Z"
                fill="white"
              />
            </svg>
            <span className="ml-2 text-white">Apple</span>
          </button>
        </div>

        {/* Botão Game Center */}
        <div className="mb-8">
          <button
            onClick={handleGameCenterLogin}
            className="w-full flex items-center justify-center bg-[#111111] border border-[#333333] rounded-full py-3 hover:bg-[#1A1A1A] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="12" r="4" fill="#5AC8FA" />
              <circle cx="17" cy="7" r="4" fill="#FF2D55" />
              <circle cx="17" cy="17" r="4" fill="#4CD964" />
              <circle cx="12" cy="12" r="2" fill="#FFCC00" />
            </svg>
            <span className="ml-2 text-white">Game Center</span>
          </button>
        </div>

        {/* Link para cadastro */}
        <div className="flex justify-center items-center">
          <span className="text-[#999999] text-sm">Não tem conta ? </span>
          <button className="text-[#00E676] text-sm font-medium ml-1">Criar conta</button>
        </div>
      </div>
    </div>
  )
}
