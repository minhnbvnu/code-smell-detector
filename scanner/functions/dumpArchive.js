function dumpArchive(hndle, archive) {
	utils.log("Dumping " + archive);
	sc.ipcMsg(1).datau64(0).sendPid().sendTo(hndle).assertOk();
	var res = sc.ipcMsg(202).datau64(3, utils.parseAddr(archive), 1).sendTo(hndle).assertOk();
	sc.withHandle(res.movedHandles[0], (storage) => {
		utils.log('Got IStorage handle: 0x'+ storage.toString(16));
		res = sc.ipcMsg(4).sendTo(storage).assertOk();
		var archive_len = [res.data[0], res.data[1]];
		utils.log(archive+' is size '+utils.paddr(archive_len));
		var buf = new ArrayBuffer(utils.trunc32(archive_len));
		res = sc.ipcMsg(0).datau64(0, archive_len).bDescriptor(buf, archive_len, 1).sendTo(storage);
		sc.memdump(buf, buf.byteLength, 'archives/'+archive+'.bin');
		utils.log('done');
	});
}