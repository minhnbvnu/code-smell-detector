function moveNavigatorAside(e) {
  const target = e ? e.currentTarget : null;
  const dataShape = target ? target.getAttribute("data-shape") : null;
  const navigatorShape = dataShape ? dataShape : "open";

  if (this.props.navigatorPosition === "is-featured") {
    if (this.props.isWideScreen) {
      this.props.setNavigatorPosition("moving-aside");

      setTimeout(() => {
        if (typeof window !== `undefined`) {
          if (window.location.pathname !== "/") {
            this.props.setNavigatorPosition("resizing-aside");
            this.props.setNavigatorShape(navigatorShape);
            setTimeout(() => {
              this.props.setNavigatorPosition("is-aside");
              setTimeout(forceCheck, 600);
            });
          }
        }
      }, 1000);
    } else {
      setTimeout(() => {
        this.props.setNavigatorPosition("is-aside");
      }, 100);
    }
  }
}