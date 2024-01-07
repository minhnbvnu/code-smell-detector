constructor(document, options) {
    super();
    this.document = document;
    this.indent = options.indent || 0;
    this.characterSpacing = options.characterSpacing || 0;
    this.wordSpacing = options.wordSpacing === 0;
    this.columns = options.columns || 1;
    this.columnGap = options.columnGap != null ? options.columnGap : 18; // 1/4 inch
    this.lineWidth =
      (options.width - this.columnGap * (this.columns - 1)) / this.columns;
    this.spaceLeft = this.lineWidth;
    this.startX = this.document.x;
    this.startY = this.document.y;
    this.column = 1;
    this.ellipsis = options.ellipsis;
    this.continuedX = 0;
    this.features = options.features;

    // calculate the maximum Y position the text can appear at
    if (options.height != null) {
      this.height = options.height;
      this.maxY = this.startY + options.height;
    } else {
      this.maxY = this.document.page.maxY();
    }

    // handle paragraph indents
    this.on('firstLine', options => {
      // if this is the first line of the text segment, and
      // we're continuing where we left off, indent that much
      // otherwise use the user specified indent option
      const indent = this.continuedX || this.indent;
      this.document.x += indent;
      this.lineWidth -= indent;

      return this.once('line', () => {
        this.document.x -= indent;
        this.lineWidth += indent;
        if (options.continued && !this.continuedX) {
          this.continuedX = this.indent;
        }
        if (!options.continued) {
          return (this.continuedX = 0);
        }
      });
    });

    // handle left aligning last lines of paragraphs
    this.on('lastLine', options => {
      const { align } = options;
      if (align === 'justify') {
        options.align = 'left';
      }
      this.lastLine = true;

      return this.once('line', () => {
        this.document.y += options.paragraphGap || 0;
        options.align = align;
        return (this.lastLine = false);
      });
    });
  }