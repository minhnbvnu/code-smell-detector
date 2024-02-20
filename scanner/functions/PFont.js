function PFont(name, size) {
    if (name === undef) name = "";
    this.name = name;
    if (size === undef) size = 0;
    this.size = size;
    this.glyph = false;
    this.ascent = 0;
    this.descent = 0;
    this.leading = 1.2 * size;
    var illegalIndicator = name.indexOf(" Italic Bold");
    if (illegalIndicator !== -1) name = name.substring(0, illegalIndicator);
    this.style = "normal";
    var italicsIndicator = name.indexOf(" Italic");
    if (italicsIndicator !== -1) {
      name = name.substring(0, italicsIndicator);
      this.style = "italic"
    }
    this.weight = "normal";
    var boldIndicator = name.indexOf(" Bold");
    if (boldIndicator !== -1) {
      name = name.substring(0, boldIndicator);
      this.weight = "bold"
    }
    this.family = "sans-serif";
    if (name !== undef) switch (name) {
    case "sans-serif":
    case "serif":
    case "monospace":
    case "fantasy":
    case "cursive":
      this.family = name;
      break;
    default:
      this.family = '"' + name + '", sans-serif';
      break
    }
    this.context2d = null;
    computeFontMetrics(this);
    this.css = this.getCSSDefinition();
    this.context2d.font = this.css
  }