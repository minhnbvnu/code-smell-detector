function ClassTransformer(path, file) {
	    (0, _classCallCheck3.default)(this, ClassTransformer);

	    this.parent = path.parent;
	    this.scope = path.scope;
	    this.node = path.node;
	    this.path = path;
	    this.file = file;

	    this.clearDescriptors();

	    this.instancePropBody = [];
	    this.instancePropRefs = {};
	    this.staticPropBody = [];
	    this.body = [];

	    this.bareSuperAfter = [];
	    this.bareSupers = [];

	    this.pushedConstructor = false;
	    this.pushedInherits = false;
	    this.isLoose = false;

	    this.superThises = [];

	    this.classId = this.node.id;

	    this.classRef = this.node.id ? t.identifier(this.node.id.name) : this.scope.generateUidIdentifier("class");

	    this.superName = this.node.superClass || t.identifier("Function");
	    this.isDerived = !!this.node.superClass;
	  }