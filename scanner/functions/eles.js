function eles() {
      var col = cy.collection();

      for (var i = 0; i < arguments.length; i++) {
        var ele = arguments[i];
        col = col.add(ele);
      }

      return col;
    }