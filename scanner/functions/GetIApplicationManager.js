function GetIApplicationManager(cb) {
	if(sc.hasService("ns:am")) {
		return sc.getService("ns:am", cb);
	} else {
		return sc.getService("ns:am2", (ns) => {
			return sc.ipcMsg(7996).sendTo(ns).assertOk().withHandles((r, m, c) => { // GetIApplicationManager
				return cb(m[0]);
			});
		});
	}
}