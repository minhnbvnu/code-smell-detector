function disconnectGuest(index) {
    if (index !== 1 && index !== 2 && index !== 3) { throw 'Can only disconnect guests with index 1, 2, 3'; }
    
    if (isHosting && QRuntime.gamepad_array[index].$status === 'guest') {
        for (let i = 0; i < connectedGuestArray.length; ++i) {
            const guest = connectedGuestArray[i]
            if (guest.player_index === index) {
                showPopupMessage('Disconnected ' + guest.dataConnection.metadata.name.toUpperCase());
                // Tell the guest to disconnect so that they don't
                // have to wait for a timeout (the 'close' event does
                // not work on all browsers!)
                if (guest.dataConnection.open) {
                    guest.dataConnection.send({type: 'DISCONNECT'});
                }
                
                setTimeout(function () { guest.disconnect(); });
                break;
            }
        }
    }
}