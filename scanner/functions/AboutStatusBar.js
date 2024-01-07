constructor() {
    super();
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.tooltips.add(this.element, {
        title:
          'An update will be installed the next time Atom is relaunched.<br/><br/>Click the squirrel icon for more information.'
      })
    );
  }