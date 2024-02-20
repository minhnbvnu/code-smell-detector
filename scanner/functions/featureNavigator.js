function featureNavigator(e) {
  e && e.preventDefault();

  if (this.props.navigatorPosition === "is-aside") {
    if (this.props.isWideScreen) {
      this.props.setNavigatorPosition("moving-featured");

      setTimeout(() => {
        this.props.setNavigatorPosition("resizing-featured");
        setTimeout(() => {
          this.props.setNavigatorPosition("is-featured");
          this.props.setNavigatorShape("open");

          // uncomment following lines if you want to count featuring Navigator as a visit
          // to index page ('/'), you have to also uncomment import { navigateTo }...
          /*
          setTimeout(() => {
            navigateTo("/");
          }, 1000);
          */
        });
      }, 300);
    } else {
      setTimeout(() => {
        this.props.setNavigatorPosition("is-featured");
      }, 0);
    }
  }
}