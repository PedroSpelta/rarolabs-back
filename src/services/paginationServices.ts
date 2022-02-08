const { abs } = Math;

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
    let first = 0,
      last = 0;
    const leftNumbers = abs(actualPage - 1) < 4 ? abs(actualPage - 1) : 4;
    const rightNumbers = totalPages - actualPage < 4 ? totalPages - actualPage : 4;
    // const minNumber = flActual > 1 ? flActual : 1;
    // const maxNumber = frActual < totalPages ? frActual : totalPages;
    const twoBigNumbers = leftNumbers > 2 && rightNumbers > 2;

    if (leftNumbers === rightNumbers || twoBigNumbers) {
      if (leftNumbers > 2) {
        first = actualPage - 2;
        last = actualPage + 2;
      } else {
        first = actualPage - leftNumbers;
        last = actualPage + rightNumbers;
      }
    } else if (leftNumbers > rightNumbers) {
      first = actualPage - (leftNumbers - rightNumbers);
      last = actualPage + rightNumbers;
    } else if (leftNumbers < rightNumbers) {
      first = actualPage - leftNumbers;
      last = actualPage + (rightNumbers - leftNumbers);
    }

    return makeArray(first, last, actualPage);
  }
};

const getContinuity = (pages: Array<string>, totalPages: number) => {
  const withContinuity: Array<string> = [];
  if (pages[0] !== '1' && pages[0] !== '**1**') withContinuity.push('...');
  withContinuity.push(...pages);
  if (
    pages[pages.length - 1] !== totalPages.toString() &&
    pages[pages.length - 1] !== `**${totalPages.toString()}**`
  )
    withContinuity.push('...');
  return withContinuity;
};

const getPagination = async (actualPage: any, totalPages: any) => {
  const pages = getPages(actualPage, totalPages);
  const pagination = getContinuity(pages, totalPages);
  return pagination;
};

export default {
  getPagination,
};
