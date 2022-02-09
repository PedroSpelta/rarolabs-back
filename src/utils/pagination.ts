const { abs } = Math;

export const makeArray = (from: number, to: number, selected: number) => {
  const array = [];

  // Construct a array starting in "from" and ending with "to"
  for (let i = from; i <= to; i += 1) {
    const iString = i.toString();
    if (i === selected) array.push(`**${iString}**`);
    else array.push(iString);
  }
  return array;
};

export const getPages = (actualPage: number, totalPages: number) => {
  // If pages < 5 dont need to check size
  if (totalPages <= 5) {
    return makeArray(1, totalPages, actualPage);
  } else {
    let first = 0,
    last = 0;
    // Check distance left and right of the actualPage, maximum of 4
    const leftNumbers = abs(actualPage - 1) < 4 ? abs(actualPage - 1) : 4;
    const rightNumbers = totalPages - actualPage < 4 ? totalPages - actualPage : 4;
    
    const twoBigNumbers = leftNumbers > 2 && rightNumbers > 2;

    // If both distances are equal or big pagination will be equilateral
    if (leftNumbers === rightNumbers || twoBigNumbers) {
      if (leftNumbers > 2) {
        first = actualPage - 2;
        last = actualPage + 2;
      } else {
        first = actualPage - leftNumbers;
        last = actualPage + rightNumbers;
      }
    } 
    // If distances are different the smaller will only be as big as the difference between the other two
    else if (leftNumbers > rightNumbers) {
      first = actualPage - (leftNumbers - rightNumbers);
      last = actualPage + rightNumbers;
    } else if (leftNumbers < rightNumbers) {
      first = actualPage - leftNumbers;
      last = actualPage + (rightNumbers - leftNumbers);
    }

    return makeArray(first, last, actualPage);
  }
};

export const addContinuity = (pages: Array<string>, totalPages: number) => {
  const withContinuity: Array<string> = [];

  // Checks if pagination has previous, if true pushes ...
  if (pages[0] !== '1' && pages[0] !== '**1**') withContinuity.push('...');

  // Push the pages
  withContinuity.push(...pages);

  // Checks if pagination has next numbers, if true pushes ...
  if (
    pages[pages.length - 1] !== totalPages.toString() &&
    pages[pages.length - 1] !== `**${totalPages.toString()}**`
  )
    withContinuity.push('...');
  return withContinuity;
};