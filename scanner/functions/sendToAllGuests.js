function sendToAllGuests(message) {
    console.assert(isHosting);
    for (let g = 0; g < connectedGuestArray.length; ++g) {
        const guest = connectedGuestArray[g];
        if (guest.dataConnection.open) {
            console.log('Sending', message);
            guest.dataConnection.send(message);
        }
    }
}