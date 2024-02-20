function GetTitleIds() {
	return GetIApplicationManager((iam) => {
		var buf = new Uint32Array(0x18*32); // 32 games max
		var count = sc.ipcMsg(0).datau32(0).bDescriptor(buf).sendTo(iam).assertOk().data[0];
		var tids = [];
		for(var i = 0; i < count; i++) {
			tids[i] = [buf[6*i+0], buf[6*i+1]];
		}
		return tids;
	});
}