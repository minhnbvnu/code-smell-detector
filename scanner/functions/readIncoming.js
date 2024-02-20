function readIncoming(handle) {
		utils.log('Writing handle');
		sdb.write8([handle, 0], sdb.scratch);
		utils.log('replyandreceive');
		var ret = sdb.svc(0x44, [sdb.scratch, sdbIpcBuf, 0x1000, sdb.scratch, 1, [0, 0], [0xffffffff, 0xffffffff]])[0];
		utils.log('Copying data');
		if(ret == 0xf601)
			return null;
		var data = new Uint32Array(0x100);
		sdb.memcpyToBrowser(data, sdbIpcBuf, 7 << 2);
		utils.log('Done?');
		return data;
	}