function LoginAndGetFileList(callback, username, password){
    passport.passportLogin(username, password, function(err, json){
	//console.log(json);
	if (!err)
	    GetFileList(callback, username, json.bduss);
	else
	    console.log(err);		
    });	
}