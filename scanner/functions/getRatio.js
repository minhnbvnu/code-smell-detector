function getRatio(data) {
  if (!data) {
    return {
      num: 1,
      den: 1
    };
  }

  const ratio = data.trim().split(/\s*:\s*/).map(x => parseFloat(x)).filter(x => !isNaN(x));

  if (ratio.length === 1) {
    ratio.push(1);
  }

  if (ratio.length === 0) {
    return {
      num: 1,
      den: 1
    };
  }

  const [num, den] = ratio;
  return {
    num,
    den
  };
}