function GetProfile(id) {
	return sc.getService("acc:u0", (acc) => {
		return sc.withHandle(sc.ipcMsg(5).datau32(id[0], id[1], id[2], id[3]).sendTo(acc).assertOk().movedHandles[0], (iProfile) => {
			var userData = new Uint8Array(0x80);
			var profileBase = new Uint32Array(
				sc.ipcMsg(0).cDescriptor(userData).sendTo(iProfile).assertOk().data);
			var imageSize = sc.ipcMsg(10).sendTo(iProfile).assertOk().data[0];
			var image = new Uint8Array(imageSize);
			sc.ipcMsg(11).bDescriptor(image, image.byteLength, 0).sendTo(iProfile).assertOk();
			return {
				name: utils.u8a2nullstr(new Uint8Array(profileBase.buffer, 0x18, 10)),
				imageData: image
			};
		});
	});
}