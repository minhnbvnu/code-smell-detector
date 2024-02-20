function Activator(container) {
    this.active = false;

    this.dom = {
      container: container
    };

    this.dom.overlay = document.createElement('div');
    this.dom.overlay.className = 'vis-overlay';

    this.dom.container.appendChild(this.dom.overlay);

    this.hammer = Hammer(this.dom.overlay);
    this.hammer.on('tap', this._onTapOverlay.bind(this));

    // block all touch events (except tap)
    var me = this;
    var events = ['tap', 'doubletap', 'press', 'pinch', 'pan', 'panstart', 'panmove', 'panend'];
    events.forEach(function (event) {
      me.hammer.on(event, function (event) {
        event.stopPropagation();
      });
    });

    // attach a click event to the window, in order to deactivate when clicking outside the timeline
    if (document && document.body) {
      this.onClick = function (event) {
        if (!_hasParent(event.target, container)) {
          me.deactivate();
        }
      };
      document.body.addEventListener('click', this.onClick);
    }

    if (this.keycharm !== undefined) {
      this.keycharm.destroy();
    }
    this.keycharm = keycharm();

    // keycharm listener only bounded when active)
    this.escListener = this.deactivate.bind(this);
  }