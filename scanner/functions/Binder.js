constructor(root) {
    this.root = root;
    this.datasets = root.datasets;

    if (root.datasets && root.datasets.data) {
      this.emptyMerge = false;
      this.data = root.datasets.data;
    } else {
      this.emptyMerge = true;
      this.data = new _xfa_object.XmlObject(_namespaces.NamespaceIds.datasets.id, "data");
    }

    this.root.form = this.form = root.template[_xfa_object.$clone]();
  }