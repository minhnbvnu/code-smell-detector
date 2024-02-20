function setupOption (name, ref) {
      $this[name] = function (arg) {
        $this.options[ref || name] = arg
        return $this
      }
    }