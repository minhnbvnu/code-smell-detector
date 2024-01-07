function MathBackendWebGL(gpgpu) {
	    var _this;

	    _this = _KernelBackend.call(this) || this; // Maps data ids that have a pending read operation, to list of subscribers.

	    _this.pendingRead = new WeakMap(); // List of data ids that are scheduled for disposal, but are waiting on a
	    // pending read operation.

	    _this.pendingDisposal = new WeakSet(); // Used to count the number of 'shallow' sliced tensors that point to the
	    // same data id.

	    _this.dataRefCount = new WeakMap();
	    _this.numBytesInGPU = 0; // Accumulated time spent (including blocking) in uploading data to webgl.

	    _this.uploadWaitMs = 0; // Accumulated time spent (including blocking in downloading data from webgl.

	    _this.downloadWaitMs = 0;
	    _this.warnedAboutMemory = false;
	    _this.warnedAboutCPUBackend = false;
	    _this.pendingDeletes = 0;
	    _this.disposed = false;

	    if (!env().getBool('HAS_WEBGL')) {
	      throw new Error('WebGL is not supported on this device');
	    }

	    if (gpgpu == null) {
	      var gl = getWebGLContext(env().getNumber('WEBGL_VERSION'));
	      _this.binaryCache = getBinaryCache(env().getNumber('WEBGL_VERSION'));
	      _this.gpgpu = new GPGPUContext(gl);
	      _this.canvas = gl.canvas;
	      _this.gpgpuCreatedLocally = true;
	    } else {
	      _this.gpgpu = gpgpu;
	      _this.binaryCache = {};
	      _this.gpgpuCreatedLocally = false;
	      _this.canvas = gpgpu.gl.canvas;
	    }

	    _this.textureManager = new TextureManager(_this.gpgpu);
	    _this.numMBBeforeWarning = numMBBeforeWarning();
	    _this.texData = new DataStorage(_assertThisInitialized(_this), engine());
	    return _this;
	  }