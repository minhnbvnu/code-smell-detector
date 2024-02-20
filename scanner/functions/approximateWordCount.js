function approximateWordCount(text) {
  const m = text.match(/\S+/g);
  return m ? m.length : 0;
}