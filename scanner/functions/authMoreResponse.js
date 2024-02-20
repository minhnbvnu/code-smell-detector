function authMoreResponse(packet) {
	var AuthStatusFlags;
	(function (AuthStatusFlags) {
		AuthStatusFlags[(AuthStatusFlags['FullAuth'] = 4)] = 'FullAuth';
		AuthStatusFlags[(AuthStatusFlags['FastPath'] = 3)] = 'FastPath';
	})(AuthStatusFlags || (AuthStatusFlags = {}));
	const REQUEST_PUBLIC_KEY = 2;
	const statusFlag = packet.body.skip(1).readUint8();
	let authMoreData,
		done = true,
		next,
		quickRead = false;
	if (statusFlag === AuthStatusFlags.FullAuth) {
		authMoreData = new Uint8Array([REQUEST_PUBLIC_KEY]);
		done = false;
		next = encryptWithKey;
	}
	if (statusFlag === AuthStatusFlags.FastPath) {
		done = false;
		quickRead = true;
		next = terminate;
	}
	return {
		done,
		next,
		quickRead,
		data: authMoreData,
	};
}