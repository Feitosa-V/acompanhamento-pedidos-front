import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, setCurrentPage } : PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg">
      {/* Botão para primeira página */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
        className={`p-2 rounded-full transition ${
          currentPage === 1 ? "text-gray-400" : "text-red-500 hover:bg-red-100"
        }`}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg" />
      </button>

      {/* Botão para página anterior */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`p-2 rounded-full transition ${
          currentPage === 1 ? "text-gray-400" : "text-red-500 hover:bg-red-100"
        }`}
      >
        <FontAwesomeIcon icon={faAngleLeft} size="lg" />
      </button>

      {/* Números das páginas */}
      <div className="flex space-x-2">
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-full transition ${
                currentPage === page ? "bg-red-500 text-white" : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Botão para próxima página */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`p-2 rounded-full transition ${
          currentPage === totalPages ? "text-gray-400" : "text-red-500 hover:bg-red-100"
        }`}
      >
        <FontAwesomeIcon icon={faAngleRight} size="lg" />
      </button>

      {/* Botão para última página */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`p-2 rounded-full transition ${
          currentPage === totalPages ? "text-gray-400" : "text-red-500 hover:bg-red-100"
        }`}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} size="lg" />
      </button>

      {/* Informação sobre páginas */}
      <span className="ml-4 text-gray-600">
        {currentPage} de {totalPages} páginas
      </span>
    </div>
  );
};

export default Pagination;
