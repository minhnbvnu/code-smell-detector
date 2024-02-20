function insertNS() {
      return this.insertBefore(d3_document.createElementNS(name.space, name.local), d3_select(before, this));
    }