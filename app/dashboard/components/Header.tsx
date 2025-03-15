import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
    userName: string;
    onLogout: () => void;
  }

const Header = ({ userName, onLogout } : HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Função para alternar o dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Função para tratar o logout
  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false);  // Fecha o dropdown após o logout
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center ml-auto">
        <div className="text-right mr-3" onClick={toggleDropdown}>
          <div>
            <span className="font-medium text-gray-700">Olá,</span>
          </div>
          <div>
            <span className="font-bold text-gray-700">{userName}</span>
          </div>
        </div>
        
        {/* Ícone de usuário que também abre o dropdown */}
        <div 
          className="bg-orange-500 p-2 rounded-full flex items-center justify-center cursor-pointer" 
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
        </div>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute top-14 right-6 bg-white shadow-lg rounded-lg w-48">
          <div 
            className="p-3 cursor-pointer hover:bg-gray-200 flex items-center space-x-2"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-red-500" />
            <span className="text-gray-700">Sair</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
