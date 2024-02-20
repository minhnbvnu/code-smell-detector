function GetUsers() {
	return sc.getService("acc:u0", (acc) => {
		var numAccounts = sc.ipcMsg(0).sendTo(acc).assertOk().dataBuffer[0];
		var obuf = new Uint32Array(4*8);
		sc.ipcMsg(2).datau32().cDescriptor(obuf, obuf.length * 4, true).sendTo(acc).assertOk();
		var ids = [];
		for(var i = 0; i < numAccounts; i++) {
			ids[i] = [obuf[i*4+0], obuf[i*4+1], obuf[i*4+2], obuf[i*4+3]];
		}
		return ids;
	});
}