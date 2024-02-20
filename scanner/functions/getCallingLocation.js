function getCallingLocation() {
  let errorStack = (new Error).stack;
  //console.log(errorStack);
  //console.log(navigator.userAgent);
  let lineAndColumn = [0, 0];

  let matchingString = ", <anonymous>:";
  if (navigator.userAgent.includes("Chrom")) {
    matchingString = ", <anonymous>:";
  }else if (navigator.userAgent.includes("Moz")) {
    matchingString = "eval:";
  } else {
    lineAndColumn[0] = "-1";
    lineAndColumn[1] = "-1";
    return lineAndColumn;
  }

  errorStack.split("\n").forEach((line) => {
    if (line.includes(matchingString)) {
      lineAndColumn = line.split(matchingString)[1].split(':');
    }
  });
  lineAndColumn[0] = parseFloat(lineAndColumn[0]);
  lineAndColumn[1] = parseFloat(lineAndColumn[1]);

  return lineAndColumn;
}