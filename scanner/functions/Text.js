function Text(el1, name1) {
    var child;
    this.el = el1;
    this.name = name1;
    this.templateValue = ((function() {
      var i, len, ref, results;
      ref = this.el.childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        if (child.nodeType === helpers.TEXT_NODE) {
          results.push(child.nodeValue);
        }
      }
      return results;
    }).call(this)).join('');
    this.children = _.toArray(this.el.children);
    if (!(this.textNode = this.el.firstChild)) {
      this.el.appendChild(this.textNode = this.el.ownerDocument.createTextNode(''));
    } else if (this.textNode.nodeType !== helpers.TEXT_NODE) {
      this.textNode = this.el.insertBefore(this.el.ownerDocument.createTextNode(''), this.textNode);
    }
  }