'use client';

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:3333/proof/session', { email, password });
      const { data } = response;

      localStorage.setItem('user', JSON.stringify({
        profile: data.profile,
        email: data.email,
        token: data.token,
        id: data.id
      }));
      
      router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage(error.response?.data.message);
        } else {
          setErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.');
        }
      } else {
        setErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado Esquerdo - Formulário */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="mb-6">
          <Image src="/images/logo.png" alt="Logo" width={160} height={68} />
        </div>
        <div className="w-[360px] bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>

            {/* Se houver mensagem de erro, exibe o alerta */}
            {errorMessage && (
              <div className="mb-4 p-2 bg-red-500 text-white rounded-lg text-sm text-center">
                {errorMessage}
              </div>
            )}
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#FE7C6E] font-semibold text-sm mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                required
                className="w-full h-[48px] px-4 rounded-lg border border-gray-300 focus:outline-none"
              />
            </div>

            {/* Senha */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-[#FE7C6E] font-semibold text-sm mb-1">
                Senha
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full h-[48px] px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-[42px] text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="lg" />
              </button>
            </div>

            {/* Esqueci a senha */}
            <div className="text-right mb-4">
              <a href="#" className="text-[#FE7C6E] text-sm font-semibold">Esqueci a senha</a>
            </div>

            {/* Botão de login */}
            <button
              type="submit"
              className="w-full h-[48px] bg-[#FE7C6E] text-white font-semibold text-sm rounded-lg hover:bg-[#e76b5f] cursor-pointer"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      {/* Lado Direito - Imagem de fundo */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/az_suite_login_servicos.png')" }}></div>
    </div>
  );
}
