function sendInvite() {
    let network = [];
    let requestData = {};
    for (let i = 1; i <= GlobalValue; i++) {
        let temp = {
            "teamId": $("#teamDropDown" + i).val(),
            "userName": "@" + $("#userID" + i).val(),
            "accName": $("#accountName" + i).val(),
            "email": $("#emailID" + i).val(),
            "network": $("#socialMediaSelected" + i).val(),
        };
        network.push(temp);
    }
    requestData["data"] = network;
    ajaxInvitation(requestData);
}