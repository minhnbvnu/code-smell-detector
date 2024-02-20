function getFriendFileUrl(file){
        return  "/system.library/file/read?authid=" + Application.authId  + "&path=" + file.Path + "&mode=rs";
    }