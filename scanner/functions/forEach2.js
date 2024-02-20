function forEach2(array1, array2, fn) {
    if (Array.isArray(array1)) {
      array1.forEach(function (elem1) {
        if (Array.isArray(array2)) {
          array2.forEach(function (elem2) {
            fn(elem1, elem2);
          });
        } else {
          fn(elem1, array2);
        }
      });
    } else {
      if (Array.isArray(array2)) {
        array2.forEach(function (elem2) {
          fn(array1, elem2);
        });
      } else {
        fn(array1, array2);
      }
    }
  }