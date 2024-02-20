function decode_escape_sequence(seq) {
    switch (seq[0]) {
      case "b": return "\b";
      case "f": return "\f";
      case "n": return "\n";
      case "r": return "\r";
      case "t": return "\t";
      case "u":
        var code;
        if (seq[1] == "{" && seq.slice(-1) == "}") {
            code = seq.slice(2, -1);
        } else if (seq.length == 5) {
            code = seq.slice(1);
        } else {
            return;
        }
        var num = parseInt(code, 16);
        if (num < 0 || isNaN(num)) return;
        if (num < 0x10000) return String.fromCharCode(num);
        if (num > 0x10ffff) return;
        return String.fromCharCode((num >> 10) + 0xd7c0) + String.fromCharCode((num & 0x03ff) + 0xdc00);
      case "v": return "\u000b";
      case "x":
        if (seq.length != 3) return;
        var num = parseInt(seq.slice(1), 16);
        if (num < 0 || isNaN(num)) return;
        return String.fromCharCode(num);
      case "\r":
      case "\n":
        return "";
      default:
        if (seq == "0") return "\0";
        if (seq[0] >= "0" && seq[0] <= "9") return;
        return seq;
    }
}