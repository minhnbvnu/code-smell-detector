function dumpModule(module, loader, name) {
	//We need a ILocationResolver to pass to fsp to say what we are reading so we're getting a handle
	sc.getService("lr", (lripc) => {
		//3 is the StorageID for NAND System
		var lr = sc.ipcMsg(0).data(3).sendTo(lripc).assertOk();
		sc.withHandle(lr.movedHandles[0], (content) => {
				//We are getting our ContentPath needed for fsp, c being the "receiving" buffer
			var buf = new ArrayBuffer(0x300);
			sc.ipcMsg(0).data(utils.parseAddr(module)).cDescriptor(buf).sendTo(content).assertOk();

			//We are now mounting our code region
			var fs =sc.ipcMsg(0).datau64(utils.parseAddr(module)).xDescriptor(buf).sendTo(loader).assertOk();
			sc.withHandle(fs.movedHandles[0], (storage) => {
				//utils.log('Got IFileSystem handle: 0x'+ storage.toString(16));
				var fs = new sc.IFileSystem(sc, storage);
				var dir = fs.OpenDir('/').getValue();
				//DUMP ALL THE THINGS
				dir.DirDump(name);
			});
		});
	});
}