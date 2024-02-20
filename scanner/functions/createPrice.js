function createPrice(value) {
  switch (value.slice(0, 1)) {
    case '￥':
      return new CnyPrice(value);
    case '$':
      return new UsdPrice(value);
    case 'k':
      return new HkdPrice(value);
    default:
      throw new Error('un support unit');
  }
}