function tryLogin(){
    apiRequest('pools', {}, function(response){
        showAdminCenter();
        displayMenu(response.result)
    });
}