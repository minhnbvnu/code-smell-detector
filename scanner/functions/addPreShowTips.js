function addPreShowTips(secondsLeft) {
	$('#preshow_timer').text(I18n.t('preshow.resume') + ' ' + secondsToTime(secondsLeft));
	var des = preshow_des && preshow_des[tmpImg.attr("ref")];
	if(des) {
		$('#tips').show();
		$('#tips').text(des);
	} else {
		$('#tips').hide();
	}
}