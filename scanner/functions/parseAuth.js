function parseAuth(packet) {
	switch (packet.type) {
		case PacketType.EOF_Packet:
			return AuthResult.MethodMismatch;
		case PacketType.Result:
			return AuthResult.AuthMoreRequired;
		case PacketType.OK_Packet:
			return AuthResult.AuthPassed;
		default:
			return AuthResult.AuthPassed;
	}
}