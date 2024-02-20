function Process() {
	        _super.apply(this, arguments);
	        this.startTime = Date.now();
	        this._cwd = '/';
	        /**
	         * Returns what platform you are running on.
	         * @return [String]
	         */
	        this.platform = 'browser';
	        this.argv = [];
	        this.execArgv = [];
	        this.stdout = null;
	        this.stderr = null;
	        this.stdin = null;
	        this.domain = null;
	        this._queue = new NextTickQueue();
	        this.execPath = __dirname;
	        this.env = {};
	        this.exitCode = 0;
	        this._gid = 1;
	        this._uid = 1;
	        this.version = 'v5.0';
	        this.versions = {
	            http_parser: '0.0',
	            node: '5.0',
	            v8: '0.0',
	            uv: '0.0',
	            zlib: '0.0',
	            ares: '0.0',
	            icu: '0.0',
	            modules: '0',
	            openssl: '0.0'
	        };
	        this.config = {
	            target_defaults: { cflags: [],
	                default_configuration: 'Release',
	                defines: [],
	                include_dirs: [],
	                libraries: [] },
	            variables: { clang: 0,
	                host_arch: 'x32',
	                node_install_npm: false,
	                node_install_waf: false,
	                node_prefix: '',
	                node_shared_cares: false,
	                node_shared_http_parser: false,
	                node_shared_libuv: false,
	                node_shared_zlib: false,
	                node_shared_v8: false,
	                node_use_dtrace: false,
	                node_use_etw: false,
	                node_use_openssl: false,
	                node_shared_openssl: false,
	                strict_aliasing: false,
	                target_arch: 'x32',
	                v8_use_snapshot: false,
	                v8_no_strict_aliasing: 0,
	                visibility: '' } };
	        this.pid = (Math.random() * 1000) | 0;
	        this.title = 'node';
	        this.arch = 'x32';
	        this._mask = 18;
	        // Undefined in main thread. Worker-only.
	        this.connected = undefined;
	    }