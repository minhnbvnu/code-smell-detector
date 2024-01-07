constructor(props) {
    this.props = props;
    this.element = document.createElement('atom-overlay');
    if (this.props.className != null)
      this.element.classList.add(this.props.className);
    this.element.appendChild(this.props.element);
    this.element.style.position = 'fixed';
    this.element.style.zIndex = 4;
    this.element.style.top = (this.props.pixelTop || 0) + 'px';
    this.element.style.left = (this.props.pixelLeft || 0) + 'px';
    this.currentContentRect = null;

    // Synchronous DOM updates in response to resize events might trigger a
    // "loop limit exceeded" error. We disconnect the observer before
    // potentially mutating the DOM, and then reconnect it on the next tick.
    // Note: ResizeObserver calls its callback when .observe is called
    this.resizeObserver = new ResizeObserver(entries => {
      const { contentRect } = entries[0];

      if (
        this.currentContentRect &&
        (this.currentContentRect.width !== contentRect.width ||
          this.currentContentRect.height !== contentRect.height)
      ) {
        this.resizeObserver.disconnect();
        this.props.didResize(this);
        process.nextTick(() => {
          this.resizeObserver.observe(this.props.element);
        });
      }

      this.currentContentRect = contentRect;
    });
    this.didAttach();
    this.props.overlayComponents.add(this);
  }