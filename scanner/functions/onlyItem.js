function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }