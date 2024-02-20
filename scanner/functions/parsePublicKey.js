function parsePublicKey(packet) {
	return packet.body.skip(1).readNullTerminatedString();
}