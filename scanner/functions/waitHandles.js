function waitHandles(handles) {
		for(var i = 0; i < handles.length; ++i)
			sdb.write8([handles[i], 0], utils.add2(sdbIpcBuf, 4 + i * 4));
		var ret = sdb.svc(0x18, [sdbIpcBuf, utils.add2(sdbIpcBuf, 4), handles.length, 0])[0];
		var hndI = sdb.read4(sdbIpcBuf);
		return [ret, hndI];
	}