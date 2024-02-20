function buildDlgLogin() {
	const dlg = new Dialog("登录账户", "pubd-login", "pubd-login");
	dlg.newAuth = null;

	var frm = dlg.content.appendChild(new Frame("1.做好获取 APP 登录连接的准备", "pubd-auth-help"));
	const aHelp = frm.content.appendChild(document.createElement("a"));
	aHelp.appendChild(document.createTextNode("如何获取 APP 登录连接？"));
	aHelp.target = "_blank";
	aHelp.href = "https://github.com/Mapaler/PixivUserBatchDownload/wiki/%E8%8E%B7%E5%8F%96APP%E7%99%BB%E9%99%86%E9%93%BE%E6%8E%A5";

	var frm = dlg.content.appendChild(new Frame("2.进行官方 APP 登录", "pubd-auth-weblogin"));
	const aLogin = frm.content.appendChild(document.createElement("a"));
	aLogin.appendChild(document.createTextNode("访问官方登录页面"));
	aLogin.className = "pubd-login-official-link";
	aLogin.target = "_blank";

	var frm = dlg.content.appendChild(new Frame("3.填写 APP 登录连接", "pubd-auth-applogin"));
	dlg.content.appendChild(frm);

	var div = frm.content.appendChild(document.createElement("div"));
	const pixivLink = div.appendChild(document.createElement("input"));
	pixivLink.type = "url";
	pixivLink.className = "pubd-pixiv-app-link";
	pixivLink.placeholder = "例如：pixiv://account/login?code=xxxxxx&via=login";

	const btnLogin = div.appendChild(document.createElement("button"));
	btnLogin.className = "pubd-login-auth";
	btnLogin.appendChild(document.createTextNode("登录"));
	//登录按钮
	btnLogin.onclick = function() {
		if (/^pixiv:\/\//i.test(pixivLink.value))
		{
			const loginLink = new URL(pixivLink.value);
			const authorization_code = loginLink.searchParams.get("code");
			if (authorization_code)
			{
				//使用token登录
				dlg.error.replace("登录中···");
				const options = {
					onload:function(jore) { //onload_suceess_Cb
						dlg.error.replace("登录成功");
						dlg.newOAuth.save(); //保存新的认证
						pubd.oAuth = dlg.newOAuth; //使用新的认证替换原来的认证
						pubd.dialog.config.refreshLoginState();
					},
					onload_hasError:function(jore) { //onload_haserror_Cb //返回错误消息
						dlg.error.replace(["错误代码：" + jore.errors.system.code, jore.errors.system.message]);
					},
					onload_notJson:function(re) { //onload_notjson_Cb //返回不是JSON
						dlg.error.replace(["服务器返回不是 JSON 格式", re]);
					},
					onerror:function(re) { //onerror_Cb //网络请求发生错误
						dlg.error.replace("网络请求发生错误");
					},
				}
				dlg.newOAuth.login(authorization_code, options);
			}else
			{
				alert("PUBD：登录链接中未找到 code");
			}
		}else
		{
			alert("PUBD：输入的链接格式不正确");
		}
	};

	//错误信息
	dlg.error = dlg.content.appendChild(new ErrorMsg());

	dlg.content.appendChild(document.createElement("hr"));

	var frm = dlg.content.appendChild(new Frame("使用现有刷新许可证登录", "pubd-refresh_token-login"));
	dlg.content.appendChild(frm);

	var div = frm.content.appendChild(document.createElement("div"));
	const iptRefreshToken = div.appendChild(document.createElement("input"));
	iptRefreshToken.type = "text";
	iptRefreshToken.className = "pubd-refresh-token";
	iptRefreshToken.placeholder = "refresh_token";

	const btnRefreshToken = div.appendChild(document.createElement("button"));
	btnRefreshToken.className = "pubd-login-refresh_token";
	btnRefreshToken.appendChild(document.createTextNode("登录"));
	//登录按钮
	btnRefreshToken.onclick = function() {
		if (!pubd.oAuth.auth_data)
		{
			pubd.oAuth.auth_data = {};
		}
		pubd.oAuth.auth_data.refresh_token = iptRefreshToken.value;
		//刷新许可
		pubd.dialog.refresh_token.show(
			(document.body.clientWidth - 370)/2,
			window.scrollY+300
		);
	};

	//窗口初始化
	dlg.initialise = function() {
		this.error.clear();

		//每次打开这个窗口，都创建一个新的认证
		this.newOAuth = new oAuth2();
		aLogin.href = this.newOAuth.get_login_url();
	};
	return dlg;
}