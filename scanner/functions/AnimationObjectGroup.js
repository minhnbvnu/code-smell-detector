function AnimationObjectGroup() {

  this.uuid = _Math.generateUUID();

  // cached objects followed by the active ones
  this._objects = Array.prototype.slice.call(arguments);

  this.nCachedObjects_ = 0; // threshold
  // note: read by PropertyBinding.Composite

  var indices = {};
  this._indicesByUUID = indices; // for bookkeeping

  for (var i = 0, n = arguments.length; i !== n; ++i) {

    indices[arguments[i].uuid] = i;

  }

  this._paths = []; // inside: string
  this._parsedPaths = []; // inside: { we don't care, here }
  this._bindings = []; // inside: Array< PropertyBinding >
  this._bindingsIndicesByPath = {}; // inside: indices in these arrays

  var scope = this;

  this.stats = {

    objects: {
      get total() {

        return scope._objects.length;

      },
      get inUse() {

        return this.total - scope.nCachedObjects_;

      }
    },
    get bindingsPerObject() {

      return scope._bindings.length;

    }

  };

}