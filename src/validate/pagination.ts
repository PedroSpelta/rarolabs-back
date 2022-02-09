import Joi from 'joi';
import paginationErrors from '../errors/paginationErrors';

const paginationSchema = Joi.object({
  actualPage: Joi.number().required(),
  totalPages: Joi.number().required(),
})

const validatePaginationQuery = (query:any) => {
  // Check if query is valid
  
  const isValid = paginationSchema.validate(query);

  // Throw a error if it is not
  if ( isValid.error) throw paginationErrors.invalidQuery;
  
  return;  
}

export default {
  validatePaginationQuery
}