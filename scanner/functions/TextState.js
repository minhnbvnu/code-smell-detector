function TextState(){_classCallCheck(this,TextState);this.ctm=new Float32Array(c.IDENTITY_MATRIX);this.fontName=null;this.fontSize=0;this.font=null;this.fontMatrix=c.FONT_IDENTITY_MATRIX;this.textMatrix=c.IDENTITY_MATRIX.slice();this.textLineMatrix=c.IDENTITY_MATRIX.slice();this.charSpacing=0;this.wordSpacing=0;this.leading=0;this.textHScale=1;this.textRise=0}