function addConnectionToDB(connectionData) {
    var data = JSON.stringify(connectionData);
    var connection = new Connection({data: data});
    connection.save();
}