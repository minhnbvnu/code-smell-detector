function getSetting(session, cls, nam) { // session is set:sys
	var out = new Uint32Array(1);
	var x1 = utils.str2ab(cls);
	var x2 = utils.str2ab(nam);
	return sc.ipcMsg(38).bDescriptor(out, 4, 0).xDescriptor(x1, 48, 0).xDescriptor(x2, 48, 1).sendTo(session).asResult().map((r) => out[0]);
}