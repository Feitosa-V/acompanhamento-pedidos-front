import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Formulário de Login - Lado Esquerdo */}
      <div className="w-1/2 flex justify-center items-center p-8">
        <div className="relative w-[358px] h-[290px] bg-white p-6 rounded-lg shadow-lg">
          <form>
            {/* Email */}
            <div className="relative mb-4">
              <label htmlFor="email" className="absolute top-3 left-4 text-[#FE7C6E] font-bold text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                className="w-full h-[80px] pl-4 pr-4 rounded-lg border border-[#E6E6E6] focus:outline-none"
              />
            </div>

            {/* Senha */}
            <div className="relative mb-4">
              <label htmlFor="password" className="absolute top-3 left-4 text-[#FE7C6E] font-bold text-sm">
                Senha
              </label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                className="w-full h-[80px] pl-4 pr-4 rounded-lg border border-[#E6E6E6] focus:outline-none"
              />
            </div>

            {/* Botão de login */}
            <button
              type="submit"
              className="w-full h-[48px] bg-[#FE7C6E] text-white font-semibold text-sm rounded-lg mt-4"
            >
              Entrar
            </button>
          </form>

          {/* Link Esqueci a senha */}
          <div className="text-center mt-2">
            <a href="#" className="text-[#FE7C6E] text-sm font-semibold">Esqueci a senha</a>
          </div>
        </div>

        {/* Logo */}
        <div className="absolute w-[160px] h-[68px] left-[280px] top-[96px]">
          <Image src="/images/logo.png" alt="Logo" width={160} height={68} />
        </div>

      </div>

      {/* Imagem de fundo - Lado Direito */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/images/az_suite_login_servicos.png')" }}></div>
    </div>
  );
}
