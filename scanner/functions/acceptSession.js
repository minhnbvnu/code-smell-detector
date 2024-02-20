function acceptSession(handle) {
		sdb.svc(0x41, [sdbIpcBuf, handle]);
		return sdb.read4(sdbIpcBuf);
	}