function getProtooUrl({ roomId, peerId, consumerReplicas })
{
	const hostname = window.location.hostname;

	return `wss://${hostname}:${protooPort}/?roomId=${roomId}&peerId=${peerId}&consumerReplicas=${consumerReplicas}`;
}