function setCryptoKey(operation, key, useCryptoOffset)
{
	logger.debug(
		'setCryptoKey() [operation:%o, useCryptoOffset:%o]',
		operation, useCryptoOffset);

	assertSupported();

	worker.postMessage(
		{
			operation        : operation,
			currentCryptoKey : key,
			useCryptoOffset  : useCryptoOffset
		});
}