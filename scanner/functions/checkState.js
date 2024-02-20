function checkState() {
        var $this = $(elem);
        if (elem.value != state && !$this.data("triggering.inputEvent")) {
          state = elem.value;

          $this.data("triggering.inputEvent", true).trigger("input");
          window.setTimeout(function () {
            $this.data("triggering.inputEvent", false);
          }, 0);
        }
      }