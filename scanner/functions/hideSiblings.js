function hideSiblings(d) {
      var siblings = getSiblings(d);
      siblings.forEach(function(s) {
        hide(s);
      });
      if(d.parent) {
        hideSiblings(d.parent);
      }
    }