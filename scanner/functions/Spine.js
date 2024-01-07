function Spine(app, atlasData, skeletonData, textureData) {
	    _classCallCheck(this, Spine);
	    _defineProperty(this, "autoUpdate", true);
	    _defineProperty(this, "skeleton", void 0);
	    _defineProperty(this, "states", void 0);
	    this._app = app;
	    this._position = new pc__namespace.Vec3();
	    var atlas;
	    if (spine$1.TextureAtlas.length === 1) {
	      atlas = new spine$1.TextureAtlas(atlasData);
	      var _iterator = _createForOfIteratorHelper(atlas.pages),
	        _step;
	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var page = _step.value;
	          page.setTexture(new SpineTextureWrapper(textureData[page.name]));
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }
	    } else {
	      atlas = new spine$1.TextureAtlas(atlasData, function (path) {
	        return new SpineTextureWrapper(textureData[path]);
	      });
	    }
	    var json = new spine$1.SkeletonJson(new spine$1.AtlasAttachmentLoader(atlas));
	    json.scale *= 0.01;
	    var _skeletonData = json.readSkeletonData(skeletonData);
	    this.skeletonVersion = semver.valid(semver.coerce(_skeletonData.version));
	    this._spine_3_6_0 = semver.satisfies(this.skeletonVersion, '<=3.6.0');
	    this._spine_3_7_99 = semver.satisfies(this.skeletonVersion, '<=3.7.99');
	    this._spine_4_1_X = semver.satisfies(this.skeletonVersion, '~4.1.23');
	    this.skeleton = new spine$1.Skeleton(_skeletonData);
	    this.skeleton.updateWorldTransform();
	    this.stateData = new spine$1.AnimationStateData(this.skeleton.data);
	    this.states = [new spine$1.AnimationState(this.stateData)];
	    this.clipper = new spine$1.SkeletonClipping();
	    this._node = new pc__namespace.GraphNode();
	    this._meshes = [];
	    this._meshInstances = [];
	    this._materials = {};
	    this._tint = {};
	    this._aabb = new pc__namespace.BoundingBox();
	    this._aabbTempArray = [];
	    this._aabbTempOffset = new pc__namespace.Vec2();
	    this._aabbTempSize = new pc__namespace.Vec2();
	    this._renderCounts = {
	      vertexCount: 0,
	      indexCount: 0
	    };
	    this._vertexFormat = null;
	    this._vertexBuffer = null;
	    this._indexBuffer = null;
	    this._priority = 0;
	    this._timeScale = 1;
	    this._layers = [pc__namespace.LAYERID_UI];
	    this.init();
	    this._hidden = false;
	  }