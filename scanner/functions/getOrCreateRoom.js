async function getOrCreateRoom({ roomId, consumerReplicas })
{
	let room = rooms.get(roomId);

	// If the Room does not exist create a new one.
	if (!room)
	{
		logger.info('creating a new Room [roomId:%s]', roomId);

		const mediasoupWorker = getMediasoupWorker();

		room = await Room.create({ mediasoupWorker, roomId, consumerReplicas });

		rooms.set(roomId, room);
		room.on('close', () => rooms.delete(roomId));
	}

	return room;
}