import { addContinuity, getPages } from "../utils/pagination";
import { validatePaginationQuery } from "../validate/pagination";

const getPagination = async (paginaAtual: any, quantidadePaginas: any) => {
  const actualPage = Number(paginaAtual);
  const totalPages = Number(quantidadePaginas);
  
  // Validate user query 
  validatePaginationQuery({actualPage, totalPages});

  // Get the pagination
  const pages = getPages(actualPage, totalPages);
  const pagination = addContinuity(pages, totalPages);

  // Return pagination
  return pagination;
};

export default {
  getPagination,
};
