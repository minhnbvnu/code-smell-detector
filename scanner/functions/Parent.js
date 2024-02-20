function Parent() {
    return Parent.__super__.constructor.apply(this, arguments);
  }