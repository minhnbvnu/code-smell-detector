async function step2() {
    try {
        if (cookies == "") {
            return 0
        }
        let timeStamp = (new Date()).getTime()
        let url = 'https://plogin.m.jd.com/cgi-bin/m/tmauthreflogurl?s_token=' + s_token + '&v=' + timeStamp + '&remember=true'
        const response = await got.post(url, {
            responseType: 'json',
            json: {
                'lang': 'chs',
                'appid': 300,
                'returnurl': 'https://wqlogin2.jd.com/passport/LoginRedirect?state=' + timeStamp + '&returnurl=//home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action',
                'source': 'wq_passport'
            },
            headers: {
                'Connection': 'Keep-Alive',
                'Content-Type': 'application/x-www-form-urlencoded; Charset=UTF-8',
                'Accept': 'application/json, text/plain, */*',
                'Cookie': cookies,
                'Referer': 'https://plogin.m.jd.com/login/login?appid=300&returnurl=https://wqlogin2.jd.com/passport/LoginRedirect?state=' + timeStamp + '&returnurl=//home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action&source=wq_passport',
                'User-Agent': 'jdapp;android;9.3.5;10;2346663656561603-4353564623932316;network/wifi;model/ONEPLUS A5010;addressid/138709979;aid/2dfceea045ed292a;oaid/;osVer/29;appBuild/86390;partner/jingdong;eufv/1;Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36',
                'Host': 'plogin.m.jd.com',
            }
        });
        token = response.body.token
        okl_token = response.headers['set-cookie'][0]
        okl_token = okl_token.substring(okl_token.indexOf("=") + 1, okl_token.indexOf(";"))
        var qrUrl = 'https://plogin.m.jd.com/cgi-bin/m/tmauth?appid=300&client_type=m&token=' + token;
        return qrUrl;
    } catch (error) {
        console.log(error.response.body);
        return 0
    }
}