function setupReceiverTransform(receiver)
{
	logger.debug('setupReceiverTransform()');

	assertSupported();

	const receiverStreams = receiver.createEncodedStreams();
	const readableStream = receiverStreams.readable || receiverStreams.readableStream;
	const writableStream = receiverStreams.writable || receiverStreams.writableStream;

	worker.postMessage(
		{
			operation : 'decode',
			readableStream,
			writableStream
		},
		[ readableStream, writableStream ]
	);
}