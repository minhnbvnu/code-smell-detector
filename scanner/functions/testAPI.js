function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {

        FB.api('/me/picture', function (imageResponse) {
            console.log('Successful login for: ' + response.name);
            console.log('Id: ' + response.id);

            var thisUserData = {
                avatar: imageResponse.data.url,
                name: response.name,
                id: response.id
            };

            ViralContainer.writeMeta(thisUserData);

            ViralContainer.socket.on('connectionsGraph', function (data) {
                console.log('Received graph data');
                drawGraph(data);
            });

            ViralContainer.socket.emit('addConnection', {
                a: sentByData,
                b: thisUserData
            });

            if (sentByData) {
                console.log('You received application from ' + sentByData.name);
            }
        });
    });
}