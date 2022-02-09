import { StatusCodes } from "http-status-codes";

const paginationErrors = {
  invalidQuery: {
    status: StatusCodes.BAD_REQUEST,
    message: "paginaAtual and quantidadedePaginas must be numbers"
  }
}

export default paginationErrors;