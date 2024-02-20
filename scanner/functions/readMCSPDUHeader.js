function readMCSPDUHeader(opcode, mcsPdu) {
	return (opcode >> 2) === mcsPdu;
}