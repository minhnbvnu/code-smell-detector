function RichTextFragment(value, styles, richText) {
    _classCallCheck(this, RichTextFragment);

    this._richText = richText;

    if (value.name === 'r') {
      this._node = value;
      this._fontNode = xmlq.findChild(this._node, 'rPr');

      if (!this._fontNode) {
        this._fontNode = {
          name: 'rPr',
          attributes: {},
          children: []
        };

        this._node.children.unshift(this._fontNode);
      }

      this._valueNode = xmlq.findChild(this._node, 't');
    } else {
      this._node = {
        name: 'r',
        attributes: {},
        children: [{
          name: 'rPr',
          attributes: {},
          children: []
        }, {
          name: 't',
          attributes: {},
          children: []
        }]
      };
      this._fontNode = xmlq.findChild(this._node, 'rPr');
      this._valueNode = xmlq.findChild(this._node, 't');
      this.value(value);

      if (styles) {
        this.style(styles);
      }
    }
  }