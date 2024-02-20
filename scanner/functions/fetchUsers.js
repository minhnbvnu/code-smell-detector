function fetchUsers(uid = null, callback){
    let user = null;
    if(uid){
        // console.log("redux action setUser", uid);
        Fetcher("/api/v1/users/own", "GET").then(function (response) {
            // console.log("user response", response);
            if(!response.error && response.length){
                user = response[0];
                callback(null, user);
            }else{
                callback(response.error)
                // console.log("error fetching own user after login");
            }
        });
    }
    callback("no uid");
}