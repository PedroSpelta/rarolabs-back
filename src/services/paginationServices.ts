const makeArray = (from: number, to: number, selected: number) => {
  const array = [];
  for (let i = from; i <= to; i += 1) {
    const iString = i.toString();
    if (i === selected) array.push(`**${iString}**`);
    else array.push(iString);
  }
  return array;
};

const getPages = (actualPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return makeArray(1, totalPages, actualPage);
  } else {
    const flActual = actualPage - 2;
    const startingNumber = flActual > 1 ? flActual : 1;
    const frActual = actualPage + 2;
    const endingNumber = frActual < totalPages ? frActual : totalPages;
    console.log(startingNumber, endingNumber, actualPage);
    
    return makeArray(startingNumber, endingNumber, actualPage);
  }
};

const getPagination = async (actualPage: any, totalPages: any) => {
  return getPages(actualPage, totalPages);
};

export default {
  getPagination,
};
