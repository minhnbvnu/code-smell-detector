function _textDimensionsToArray(textDimensions) {
  const errorMessage = 'The dimensions you provided are invalid.';

  if (typeof textDimensions !== 'string') throw new Error(errorMessage);

  const dimArray = textDimensions.split('x').map(val => Number(val));
  const isValid = (dimArray.length === 2 && !isNaN(dimArray[0]) && !isNaN(dimArray[0]));

  if (!isValid) throw new Error(errorMessage);

  return textDimensions.split('x').map(val => Number(val));
}