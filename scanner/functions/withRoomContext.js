function withRoomContext(Component)
{
	return (props) => ( // eslint-disable-line react/display-name
		<RoomContext.Consumer>
			{(roomClient) => <Component {...props} roomClient={roomClient} />}
		</RoomContext.Consumer>
	);
}