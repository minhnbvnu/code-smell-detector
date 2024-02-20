function sendConnectMessage() {
                dataConnection.send({
                    type: 'CONNECT',
                    name: myOnlineName,
                    player_index: player_index,

                    // Initial state of client graphics.
                    // Updates will be sent to all guests
                    // as new messages
                    private_view: PRIVATE_VIEW,
                    bloom: QRuntime.$postFX.bloom
                });
                console.log('sent connect message');
            }