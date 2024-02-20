function date_format(micro_second) {
  	// 秒数
  	var second = Math.floor(micro_second / 1000);
  	// 小时位
  	var hr = Math.floor(second / 3600);
  	// 分钟位
  	var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  	// 秒位
	var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;


	return hr + ":" + min + ":" + sec + " ";
}