function notCategory(category) {
  return function (e) {
    return (category === null || e.category !== category) && category !== 'all';
  };
}