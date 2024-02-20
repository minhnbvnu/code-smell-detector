function RichText(node) {
    _classCallCheck(this, RichText);

    this._node = [];
    this._cell = null;
    this._remainingNodes = [];

    if (node) {
      for (var i = 0; i < node.length; i++) {
        var fragment = node[i];

        if (fragment.name === 'r') {
          this._node.push(new RichTextFragment(fragment, null, this));
        } else {
          // special node, e.g. rPh, phoneticPr in Japanese language.
          this._remainingNodes.push(fragment);
        }
      }
    }
  }