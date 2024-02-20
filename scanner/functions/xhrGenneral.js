function xhrGenneral(url, onload_suceess_Cb, onload_hasError_Cb, onload_notJson_Cb, onerror_Cb, dlog=str=>str) {
	const headersObj = new HeadersObject();
	const auth = pubd.oAuth.auth_data;
	if (auth) {
		headersObj.Authorization = auth.token_type[0].toUpperCase() + auth.token_type.substring(1) + " " + auth.access_token;
	} else {
		console.info(dlog("未登录账户，尝试以非登录状态获取信息"));
	}

	GM_xmlhttpRequest({
		url: url,
		method: "get",
		responseType: "text",
		headers: headersObj,
		onload: function(response) {
			let jo;
			try {
				jo = JSON.parse(response.responseText);
			} catch (e) {
				console.error(dlog("错误：返回可能不是JSON格式，或本程序异常"), e, response);
				onload_notJson_Cb(response);
				return;
			}

			if (jo)
			{
				if (mdev) console.log("请求URL %s，结果 %o",url,JSON.parse(response.responseText));
				//jo.error.message 是JSON字符串的错误信息，Token错误的时候返回的又是普通字符串
				//jo.error.user_message 是单行文本的错误信息
				if (jo.error) {
					if (jo.error.message.includes("Error occurred at the OAuth process.")) {
						if (auth) {
							console.warn(dlog("授权 Token 过期，开始自动更新。"),jo);
							//自动重新登录
							pubd.dialog.refresh_token.show(
								(document.body.clientWidth - 370)/2,
								window.scrollY+300,
								{
									onload: ()=>{
										pubd.dialog.refresh_token.hide();
										xhrGenneral(url, onload_suceess_Cb, onload_hasError_Cb, onload_notJson_Cb, onerror_Cb);
									},
									onload_hasError: onload_hasError_Cb,
									onload_notJson: onload_notJson_Cb,
									onerror: onerror_Cb,
								}
							);
						} else {
							console.info(dlog("非登录模式尝试获取信息失败"),jo);
							onload_hasError_Cb(jo);
						}
						return;
					}else if (jo.error.message.includes("Rate Limit")) {
						console.warn(dlog("获取信息速度太快，触发P站速度限制，1分钟后自动重试。"),jo);
						setTimeout(()=>{
							xhrGenneral(url, onload_suceess_Cb, onload_hasError_Cb, onload_notJson_Cb, onerror_Cb);
						}, 1000 * 60)
						return;
					}else
					{
						onload_hasError_Cb(jo);
						return;
					}
				} else { //登录成功
					//console.info("JSON返回成功",jo);
					onload_suceess_Cb(jo);
					return;
				}
			}
		},
		onerror: function(response) {
			console.error(dlog("错误：网络请求发送失败"), response);
			onerror_Cb(response);
		}
	});
}