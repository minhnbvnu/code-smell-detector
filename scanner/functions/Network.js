function Network(name) {
    this.name = name != null ? name : 'Untitled Network';
    this.sortTopologically = bind(this.sortTopologically, this);
    this.findEndNodes = bind(this.findEndNodes, this);
    this.nodes = [];
  }