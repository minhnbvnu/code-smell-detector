function count_down(that) {

    if (starRun == 0) {
      return;
    }

    if (countTooGetLocation >= 100) {
      var time = date_format(total_micro_second);
      that.updateTime(time);
    }

  	if (countTooGetLocation >= 5000) { //1000为1s
        that.getLocation();
        countTooGetLocation = 0;
  	}   
    

 setTimeout
  	setTimeout(function(){
		countTooGetLocation += 10;
    total_micro_second += 10;
		count_down(that);
    }
    ,10
    )
}