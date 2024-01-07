constructor(attributes) {
    super(CONFIG_NS_ID, "present", true);
    this.behaviorOverride = null;
    this.cache = null;
    this.common = null;
    this.copies = null;
    this.destination = null;
    this.incrementalMerge = null;
    this.layout = null;
    this.output = null;
    this.overprint = null;
    this.pagination = null;
    this.paginationOverride = null;
    this.script = null;
    this.validate = null;
    this.xdp = null;
    this.driver = new _xfa_object.XFAObjectArray();
    this.labelPrinter = new _xfa_object.XFAObjectArray();
    this.pcl = new _xfa_object.XFAObjectArray();
    this.pdf = new _xfa_object.XFAObjectArray();
    this.ps = new _xfa_object.XFAObjectArray();
    this.submitUrl = new _xfa_object.XFAObjectArray();
    this.webClient = new _xfa_object.XFAObjectArray();
    this.zpl = new _xfa_object.XFAObjectArray();
  }