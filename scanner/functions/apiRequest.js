function apiRequest(func, data, callback){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === 4 && httpRequest.responseText){
            if (httpRequest.status === 401){
                docCookies.removeItem('password');
                $('#password').val('');
                showLogin();
                alert('Incorrect Password');
            }
            else{
                var response = JSON.parse(httpRequest.responseText);
                callback(response);
            }
        }
    };
    httpRequest.open('POST', '/api/admin/' + func);
    data.password = password;
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(data));
}