function buildProgressToken()
{
	const progress = new Progress("pubd-token-expires", true);
	progress.animateHook = null; //储存Token进度条动画句柄
	progress.token_animate = function(){
		const _this = progress;
		if (!pubd.oAuth.auth_data)
		{
			_this.set(0, 2, "尚未登录");
			clearInterval(_this.animateHook);
			return;
		}
		const nowdate = new Date();
		const olddate = new Date(pubd.oAuth.login_time);
		const expires_in = parseInt(pubd.oAuth.auth_data.expires_in);
		const differ = expires_in - (nowdate - olddate) / 1000;
		if (differ > 0) {
			const scale = differ / expires_in;
			_this.set(scale, 2, "Token有效剩余 " + parseInt(differ) + " 秒");
		} else {
			_this.set(0, 2, "Token已失效，请刷新");
			clearInterval(_this.animateHook);
		}
		//console.log("Token有效剩余" + differ + "秒"); //检测动画后台是否停止
	}
	//开始动画
	progress.start_token_animate = function(){
		const _this = progress;
		_this.stop_token_animate();
		requestAnimationFrame(_this.token_animate);
		_this.animateHook = setInterval(()=>requestAnimationFrame(_this.token_animate), 1000);
	};
	//停止动画
	progress.stop_token_animate = function(){
		const _this = progress;
		clearInterval(_this.animateHook);
	};
	return progress;
}