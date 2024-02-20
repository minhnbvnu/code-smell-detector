function sendNotification(general){
		const n = new Notification(rTitle, options);
		if (general)
		{ //普通模式
			if (onclick) n.onclick = onclick;
		}else
		{ //选项模式，这里和TamperMonkey API不一样，区分了关闭和点击。
			if (ondone) n.onclick = ondone;
			if (onclose) n.onclose = onclose;
		}
	}