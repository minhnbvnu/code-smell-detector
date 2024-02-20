function escapeUTF8(data) {
  return data.replace(xmlReplacer, singleCharReplacer);
}