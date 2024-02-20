function setSetting(session, cls, nam, value) { // session is set:fd
	var a = new Uint32Array(1);
	a[0] = value;
	var x1 = utils.str2ab(cls);
	var x2 = utils.str2ab(nam);
	return sc.ipcMsg(2).xDescriptor(x1, 48, 0).xDescriptor(x2, 48, 1).aDescriptor(a, 4, 0).sendTo(session).asResult();
}