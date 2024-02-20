function render(event) {
      (event.event == 'start' ? open : close)(event.node);
    }