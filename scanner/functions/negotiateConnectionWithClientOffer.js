async function negotiateConnectionWithClientOffer(peerConnection, endpoint) {
	/** https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer */
	const offer = await peerConnection.createOffer();
	/** https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setLocalDescription */
	await peerConnection.setLocalDescription(offer);
	/** Wait for ICE gathering to complete */
	let ofr = await waitToCompleteICEGathering(peerConnection);
	if (!ofr) {
		throw Error('failed to gather ICE candidates for offer');
	}
	/**
	 * As long as the connection is open, attempt to...
	 */
	while (peerConnection.connectionState !== 'closed') {
		/**
		 * This response contains the server's SDP offer.
		 * This specifies how the client should communicate,
		 * and what kind of media client and server have negotiated to exchange.
		 */
		let response = await postSDPOffer(endpoint, ofr.sdp);
		if (response.status === 201) {
			let answerSDP = await response.text();
			await peerConnection.setRemoteDescription(
				new RTCSessionDescription({ type: 'answer', sdp: answerSDP })
			);
			const loc = response.headers.get('Location');
			if (loc) {
				if (loc.startsWith('http')) {
					// absolute path
					return loc;
				} else {
					// relative path
					const parsed = new URL(endpoint);
					parsed.pathname = loc;
					return parsed.toString();
				}
			}
		} else if (response.status === 405) {
			console.log('Remember to update the URL passed into the WHIP or WHEP client');
		} else {
			const errorMessage = await response.text();
			console.error(errorMessage);
		}
		/** Limit reconnection attempts to at-most once every 5 seconds */
		await new Promise(r => setTimeout(r, 5000));
	}
}