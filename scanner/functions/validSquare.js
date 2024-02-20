function validSquare(square) {
  if (typeof square !== 'string') return false;
  return (square.search(/^[a-h][1-8]$/) !== -1);
}