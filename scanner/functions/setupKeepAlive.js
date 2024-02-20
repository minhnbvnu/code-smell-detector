function setupKeepAlive() {
                ++keepAliveSetupTries;
                if (dataConnection.open) {
                    keepAlive(dataConnection, undefined, function (dataConnection) {
                        guest.disconnect();
                        showPopupMessage(dataConnection.metadata.name.toUpperCase() + ' left');
                    });
                } else if (setupKeepAliveTries < 10) {
                    setTimeout(setupKeepAlive, 250);
                } else {
                    console.log('Failed after 10 tries to set up keepAlive() on the host');
                }
            }