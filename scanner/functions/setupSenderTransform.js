function setupSenderTransform(sender)
{
	logger.debug('setupSenderTransform()');

	assertSupported();

	const senderStreams = sender.createEncodedStreams();
	const readableStream = senderStreams.readable || senderStreams.readableStream;
	const writableStream = senderStreams.writable || senderStreams.writableStream;

	worker.postMessage(
		{
			operation : 'encode',
			readableStream,
			writableStream
		},
		[ readableStream, writableStream ]
	);
}