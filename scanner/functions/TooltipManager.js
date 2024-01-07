constructor({ keymapManager, viewRegistry }) {
    this.defaults = {
      trigger: 'hover',
      container: 'body',
      html: true,
      placement: 'auto top',
      viewportPadding: 2
    };

    this.hoverDefaults = {
      delay: { show: 1000, hide: 100 }
    };

    this.keymapManager = keymapManager;
    this.viewRegistry = viewRegistry;
    this.tooltips = new Map();
  }