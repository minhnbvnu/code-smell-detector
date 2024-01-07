constructor() {
    super();
    this.stylesheetsPath = path.dirname(
      atom.themes.resolveStylesheet('../static/atom.less')
    );
    this.watch();
  }