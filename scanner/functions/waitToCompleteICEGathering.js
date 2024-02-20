async function waitToCompleteICEGathering(peerConnection) {
	return new Promise(resolve => {
		/** Wait at most 1 second for ICE gathering. */
		setTimeout(function () {
			resolve(peerConnection.localDescription);
		}, 1000);
		peerConnection.onicegatheringstatechange = ev =>
			peerConnection.iceGatheringState === 'complete' && resolve(peerConnection.localDescription);
	});
}