function Outlet(inout, name1, hint, type, meta1, id) {
    this.inout = inout;
    this.name = name1;
    this.hint = hint;
    this.type = type;
    this.meta = meta1 != null ? meta1 : {};
    this.id = id;
    if (this.hint == null) {
      this.hint = Outlet.hint(this.name);
    }
    this.node = null;
    this.input = null;
    this.output = [];
    if (this.id == null) {
      this.id = Outlet.id(this.hint);
    }
  }