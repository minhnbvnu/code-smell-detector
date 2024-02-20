function isAlreadyThere(connectionData) {

    for (var i = 0; i < Object.keys(connections).length; i++) {
        var connectionKey = Object.keys(connections)[i],
            connectionToCheck = connections[connectionKey];

        if (connectionToCheck.a.name === connectionData.a.name && connectionToCheck.b.name === connectionData.b.name) {
            return true;
        }

        //console.log(connectionToCheck.a.name + ' !== ' + connectionData.a.name);
        //console.log(connectionToCheck.b.name + ' !== ' + connectionData.b.name);
    }

    return false;
}