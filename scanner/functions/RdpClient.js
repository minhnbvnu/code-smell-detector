function RdpClient(config) {
	config = config || {};
	this.connected = false;
	this.bufferLayer = new layer.BufferLayer(new net.Socket());
	this.tpkt = new TPKT(this.bufferLayer);
	this.x224 = new x224.Client(this.tpkt);
	this.mcs = new t125.mcs.Client(this.x224);
	this.sec = new pdu.sec.Client(this.mcs, this.tpkt);
	this.global = new pdu.global.Client(this.sec, this.sec);
	
	// config log level
	log.level = log.Levels[config.logLevel || 'INFO'] || log.Levels.INFO;
	
	// credentials
	if (config.domain) {
		this.sec.infos.obj.domain.value = new Buffer(config.domain + '\x00', 'ucs2');
	}
	if (config.userName) {
		this.sec.infos.obj.userName.value = new Buffer(config.userName + '\x00', 'ucs2');
	}
	if (config.password) {
		this.sec.infos.obj.password.value = new Buffer(config.password + '\x00', 'ucs2');
	}
	
	if (config.enablePerf) {
		this.sec.infos.obj.extendedInfo.obj.performanceFlags.value = 
				pdu.sec.PerfFlag.PERF_DISABLE_WALLPAPER 
			| 	pdu.sec.PerfFlag.PERF_DISABLE_MENUANIMATIONS 
			| 	pdu.sec.PerfFlag.PERF_DISABLE_CURSOR_SHADOW 
			| 	pdu.sec.PerfFlag.PERF_DISABLE_THEMING 
			| 	pdu.sec.PerfFlag.PERF_DISABLE_FULLWINDOWDRAG;
	}
	
	if (config.autoLogin) {
		this.sec.infos.obj.flag.value |= pdu.sec.InfoFlag.INFO_AUTOLOGON;
	}
	
	if (config.screen && config.screen.width && config.screen.height) {
		this.mcs.clientCoreData.obj.desktopWidth.value = config.screen.width;
		this.mcs.clientCoreData.obj.desktopHeight.value = config.screen.height;
	}
	
	log.info('screen ' + this.mcs.clientCoreData.obj.desktopWidth.value + 'x' + this.mcs.clientCoreData.obj.desktopHeight.value);
	
	// config keyboard layout
	switch (config.locale) {
	case 'fr':
		log.info('french keyboard layout');
		this.mcs.clientCoreData.obj.kbdLayout.value = t125.gcc.KeyboardLayout.FRENCH;
		break;
	case 'en':
	default:
		log.info('english keyboard layout');
		this.mcs.clientCoreData.obj.kbdLayout.value = t125.gcc.KeyboardLayout.US;
	}
		
	
	//bind all events
	var self = this;
	this.global.on('connect', function () {
		self.connected = true;
		self.emit('connect');
	}).on('session', function () {
		self.emit('session');
	}).on('close', function () {
		self.connected = false;
		self.emit('close');
	}).on('bitmap', function (bitmaps) {
		for(var bitmap in bitmaps) {
			var bitmapData = bitmaps[bitmap].obj.bitmapDataStream.value;
			var isCompress = bitmaps[bitmap].obj.flags.value & pdu.data.BitmapFlag.BITMAP_COMPRESSION;
			
			if (isCompress && config.decompress) {
				bitmapData = decompress(bitmaps[bitmap].obj);
				isCompress = false;
			}
			
			self.emit('bitmap', { 
				destTop : bitmaps[bitmap].obj.destTop.value,
				destLeft : bitmaps[bitmap].obj.destLeft.value, 
				destBottom : bitmaps[bitmap].obj.destBottom.value, 
				destRight : bitmaps[bitmap].obj.destRight.value, 
				width : bitmaps[bitmap].obj.width.value,
				height : bitmaps[bitmap].obj.height.value,
				bitsPerPixel : bitmaps[bitmap].obj.bitsPerPixel.value,
				isCompress : isCompress,
				data : bitmapData
			});
		}
	}).on('error', function (err) {
		log.error(err.code + '(' + err.message + ')\n' + err.stack);
		if (err instanceof error.FatalError) {
			throw err;
		}
		else {
			self.emit('error', err);
		}
	});
}