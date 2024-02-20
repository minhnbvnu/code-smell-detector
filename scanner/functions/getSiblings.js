function getSiblings(d) {
      var siblings = [];
      if (d.parent) {
        var me = d.parent.children.indexOf(d);
        siblings = d.parent.children.slice(0);
        siblings.splice(me, 1);
      }
      return siblings;
    }