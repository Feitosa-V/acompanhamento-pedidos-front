'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFile, faDollarSign, faChartLine, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/app/dashboard/components/Pagination';
import Header from '@/app/dashboard/components/Header';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [summary, setSummary] = useState<any>({ orders_total: 0, orders_count: 0, sales_total: 0, sales_count: 0, average_ticket: 0 });
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const formatDocumento = (doc: String) => {
    // (CPF)
    if (doc.length === 11) {
      return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    // (CNPJ)
    if (doc.length === 14) {
      return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return doc;
  };

  const handleLogout = () => {
    // Limpar os dados do localStorage
    localStorage.removeItem('user'); // Remove o item 'user' do localStorage
    // Redirecionar o usuário para a página de login (ou página desejada)
    window.location.href = '/login'; // Se estiver usando React Router, use history.push('/login')
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = user.token;
        const name = user.profile?.name;

        if (!token) {
          // Se não houver token, redireciona para a página de login
          router.push('/login');
          return;
        }

        setUserName(name);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:3333/proof/dashboard?page=${currentPage}&limit=10`, config);
        setPedidos(response.data.orders);
        setSummary(response.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError('Erro ao carregar dados.');
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <aside className="w-64 bg-white text-gray-800 p-6 shadow-md">
        <div className="flex justify-center mb-6">
            <Image src="/images/logo.png" alt="Logo" width={100} height={50} />
        </div>
        <nav className="mt-6">
            <a href="#" className="flex items-center bg-[#FE7C6E] text-white p-3 rounded-lg">
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
            Dashboard
            </a>
        </nav>
       </aside>

      <div className="flex-1 flex flex-col">
        <Header
          userName={userName} 
          onLogout={handleLogout}
        />
        {/* <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center ml-auto">
                <div className="text-right mr-3">
                <div>
                    <span className="font-medium text-gray-700">Olá,</span>
                </div>
                <div>
                    <span className="font-bold text-gray-700">{userName}</span>
                </div>
                </div>
                <div className="bg-orange-500 p-2 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
                </div>
            </div>
        </header> */}

        <main className="p-8">
          <h2 className="text-xl font-semibold text-[#59666F]">Resumo dos pedidos</h2>

          {/* Loading */}
          {loading && <p className="text-center text-gray-600">Carregando...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                  {
                  label: 'Pedidos',
                  value: summary.orders_count,
                  total: summary.orders_total,
                  icon: faFile,
                  bgColor: 'bg-pink-200',
                  iconColor: 'text-pink-500',
                  },
                  {
                  label: 'Vendas',
                  value: summary.sales_count, 
                  total: summary.sales_total, 
                  icon: faDollarSign,
                  bgColor: 'bg-green-200', 
                  iconColor: 'text-green-500', 
                  },
                  {
                  label: 'Ticket médio',
                  value: '',
                  total: summary.average_ticket,
                  icon: faChartLine,
                  bgColor: 'bg-blue-200',
                  iconColor: 'text-blue-500',
                  },
              ].map((item, index) => (
                  <div key={index} className="bg-white p-6 shadow-md rounded-lg text-center">
                  <div className={`w-12 h-12 ${item.bgColor} text-center rounded-full mx-auto flex items-center justify-center mb-4`}>
                      <FontAwesomeIcon icon={item.icon} className={`text-xl ${item.iconColor}`} />
                  </div>
                  <p className="text-lg font-semibold text-gray-700">{item.value} {item.label}</p>
                  <p className="text-gray-500 text-lg font-medium">R$ {item.total?.toFixed(2)}</p>
                  </div>
              ))}
            </div>
          )}

          {!loading && !error && (
            <div className="mt-6 rounded-lg shadow-md overflow-hidden">
              <table className="w-full text-gray-700 border-separate border-spacing-0">
                  <thead>
                  <tr className="bg-[#FE7C6E] text-white">
                      {['Pedido', 'ID da Loja', 'Criação', 'Nome do Cliente', 'CPF/CPNJ', 'Status do Pedido', 'Status do Pagamento', 'Método de Pagamento', 'Total'].map((header, index) => (
                      <th key={index} className="p-3 text-left">{header}</th>
                      ))}
                  </tr>
                  </thead>
                  <tbody>
                  {pedidos.map((pedido, index) => (
                      <tr key={index} className="border-b text-center hover:bg-gray-100">
                      <td className="p-3">#{index + 1}</td>
                      <td className="p-3">{pedido.seller.id}</td>
                      <td className="p-3">{new Date(pedido.payment.date).toLocaleDateString()}</td>
                      <td className="p-3">{pedido.customer.name}</td>
                      <td className="p-3">{formatDocumento(pedido.customer.doc)}</td>
                      <td className="p-3">
                          <label className={`px-3 py-1 rounded-lg text-white ${pedido.delivery.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}> 
                          {pedido.delivery.status == 'pending' ? 'Pendente' : pedido.delivery.status}
                          </label>
                      </td>
                      <td className="p-3">
                          <label className={`py-1 px-3 rounded-full text-white ${pedido.payment.status === 'pending' ? 'bg-orange-500' : 'bg-green-500'}`}> 
                          {pedido.payment.status === 'pending' ? 'Pendente' : 'Concluído'}
                          </label>
                      </td>
                      <td className="p-3">
                          {(() => {
                          const metodo = pedido.payment.method;
                          switch (metodo) {
                              case 'credit': return 'Crédito';
                              case 'boleto': return 'Boleto Bancário';
                              case 'debit': return 'Débito';
                              case 'credit_installments': return 'Parcelas de Crédito';
                              case 'pix': return 'Pix';
                              case 'PIX': return 'Pix';
                              default: return metodo;
                          }
                          })()}
                      </td>
                      <td className="p-3">R$ {pedido.payment.amount.toFixed(2)}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>

              <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
