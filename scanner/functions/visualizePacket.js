function visualizePacket(packet) {
    let messages = packet.split(' ');
    messages.forEach(message => {
        if (message === '') return;
        let coords = message.split(',');
        panelContext.fillStyle = 'black';
        panelContext.fillRect(
            coords[0],
            coords[1],
            9,
            9
        )
    });
}