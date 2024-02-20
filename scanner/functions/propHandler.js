function propHandler() {
    var $this = $(this);
    if (window.event.propertyName == "value" && !$this.data("triggering.inputEvent")) {
      $this.data("triggering.inputEvent", true).trigger("input");
      window.setTimeout(function () {
        $this.data("triggering.inputEvent", false);
      }, 0);
    }
  }