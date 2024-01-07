function getEncoding(encodingName) {
  switch (encodingName) {
    case "WinAnsiEncoding":
      return WinAnsiEncoding;

    case "StandardEncoding":
      return StandardEncoding;

    case "MacRomanEncoding":
      return MacRomanEncoding;

    case "SymbolSetEncoding":
      return SymbolSetEncoding;

    case "ZapfDingbatsEncoding":
      return ZapfDingbatsEncoding;

    case "ExpertEncoding":
      return ExpertEncoding;

    case "MacExpertEncoding":
      return MacExpertEncoding;

    default:
      return null;
  }
}