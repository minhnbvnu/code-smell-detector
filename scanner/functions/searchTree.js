function searchTree(d, term) {
      var re = new RegExp(term),
          label = d.name;

      if(d.children) {
        d.children.forEach(function(child) {
          searchTree(child, term);
        });
      }

      if (label.match(re)) {
        d.highlight = true;
      } else {
        d.highlight = false;
      }
    }