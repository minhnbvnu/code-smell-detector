function getTokenizer (e) {
  if (e.adapter === 'shamrock') {
    return new ShamrockTokenizer()
  } else {
    return new Tokenizer()
  }
}