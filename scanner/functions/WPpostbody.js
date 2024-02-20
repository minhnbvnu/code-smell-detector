function WPpostbody() {
    var postbody = new Array();
    postbody.push(0);//blogid，无用
    postbody.push(config.WPusername);//用户名
    postbody.push(config.WPpassword);//密码
    return postbody;
}