function collectSelectID() {
    let $checked = $(".qor-js-table tbody").find(
        ".mdl-checkbox__input:checked"
      ),
      IDs = [];

    if (!$checked.length) {
      return false;
    }

    $checked.each(function() {
      IDs.push(
        $(this)
          .closest("tr")
          .data("primary-key")
      );
    });

    return IDs;
  }