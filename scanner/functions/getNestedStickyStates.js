function getNestedStickyStates() {
      var newStates = {};
      /*
               aside
             /    (sticky)
      (root)-- A -- A._1 -- A._1.__1
                \
                 -- _2 -- __2
                 (sticky)
       */

      newStates['aside'] = {};
      newStates['A'] =    {views: { 'A@': {} }};

      newStates['A._1'] = {sticky: true, views: { '_1@A': {} }};
      newStates['_2'] = {sticky: true, views: { '_2@A': {} }, parent: 'A'};

      newStates['A._1.__1'] = {};
      newStates['__2'] = {parent: '_2'};

      return newStates;
    }