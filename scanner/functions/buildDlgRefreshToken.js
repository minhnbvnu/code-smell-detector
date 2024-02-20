function buildDlgRefreshToken() {
	const dlg = new Dialog("刷新许可", "pubd-refresh-token pubd-dialog-transparent", "pubd-refresh-token");

	//Logo部分
	const logo_box = dlg.content.appendChild(document.createElement("div"));
	logo_box.className = "logo-box";
	const logo = logo_box.appendChild(document.createElement("img"));
	logo.className = "pixiv-logo";
	logo.src = "https://s.pximg.net/accounts/assets/6bea8becc71d27cd20649ffbc047e456.svg";
	logo.alt = "pixiv logo";

	const progress = dlg.tokenExpires = dlg.content.appendChild(buildProgressToken());

	const lblRefreshToken = dlg.content.appendChild(document.createElement("label"));
	lblRefreshToken.textContent = "刷新用许可证代码(refresh_token)";
	const iptRefreshToken = lblRefreshToken.appendChild(document.createElement("input"));
	iptRefreshToken.className = "pubd-refresh-token";
	iptRefreshToken.type = "text";
	iptRefreshToken.readOnly = true;

	//错误信息
	dlg.error = dlg.content.appendChild(new ErrorMsg());

	//窗口关闭
	dlg.close = function() {
		progress.stop_token_animate();
	};
	//关闭窗口按钮
	dlg.cptBtns.close.addEventListener("click", dlg.close);

	//窗口初始化
	dlg.initialise = function(arg = {}) {
		this.error.clear();
		iptRefreshToken.value = pubd.oAuth.auth_data.refresh_token;
		progress.start_token_animate();
		dlg.error.replace("刷新许可中···");
		const options = {
			onload:function(jore) { //onload_suceess_Cb
				pubd.oAuth.save();
				dlg.error.replace("成功更新");
				iptRefreshToken.value = jore.refresh_token;
				progress.start_token_animate();
				pubd.dialog.config.refreshLoginState();
				if (arg.onload) arg.onload(jore);
			},
			onload_hasError:function(jore) { //onload_haserror_Cb //返回错误消息
				dlg.error.replace(["错误代码：" + jore.errors.system.code, jore.errors.system.message]);
				if (arg.onload_hasError) arg.onload_hasError(jore);
			},
			onload_notJson:function(re) { //onload_notjson_Cb //返回不是JSON
				dlg.error.replace(["服务器返回不是 JSON 格式", re]);
				if (arg.onload_notJson) arg.onload_notJson(re);
			},
			onerror:function(re) { //onerror_Cb //网络请求发生错误
				dlg.error.replace("网络请求发生错误");
				if (arg.onerror) arg.onerror(re);
			},
		}
		pubd.oAuth.refresh_token(options);
	};
	return dlg;
}