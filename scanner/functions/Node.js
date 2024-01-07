constructor(tree) {
    // special case for text nodes
    if (typeof tree === 'string') {
      this.type = 'text';
      this.text = tree;
      return;
    }

    this.type = tree.shift();
    this.attrs = {};

    if (typeof tree[0] === 'object' && !Array.isArray(tree[0])) {
      this.attrs = tree.shift();
    }

    // parse sub nodes
    this.content = [];
    while (tree.length) {
      this.content.push(new Node(tree.shift()));
    }

    switch (this.type) {
      case 'header':
        this.type = `h${this.attrs.level}`;
        break;

      case 'code_block':
        // use code mirror to syntax highlight the code block
        var code = this.content[0].text;
        this.content = [];
        CodeMirror.runMode(code, 'javascript', (text, style) => {
          const color = colors[style] || colors.default;
          const opts = {
            color,
            continued: text !== '\n'
          };

          return this.content.push(new Node(['code', opts, text]));
        });

        if (this.content.length) {
          this.content[this.content.length - 1].attrs.continued = false;
        }
        codeBlocks.push(code);
        break;

      case 'img':
        // images are used to generate inline example output
        // stores the JS so it can be run
        // in the render method
        this.type = 'example';
        code = codeBlocks[this.attrs.alt];
        if (code) {
          this.code = code;
        }
        this.height = +this.attrs.title || 0;
        break;
    }

    this.style = styles[this.type] || styles.para;
  }