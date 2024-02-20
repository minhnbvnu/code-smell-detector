function writePkcs8EdDSAPublic(key, der) {
	der.endSequence();

	utils.writeBitString(der, key.part.A.data);
}