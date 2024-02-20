function getAllDataAndSendMail(){
    let HtmlData = {};
    // how long with
    let today = new Date();
    console.log(today)
    let initDay = new Date(startDay);
    let lastDay = Math.floor((today - initDay) / 1000 / 60 / 60 / 24);
    let todaystr =
      today.getFullYear() +
      " / " +
      (today.getMonth() + 1) +
      " / " +
      today.getDate();
    HtmlData["lastDay"] = lastDay;
    HtmlData["todaystr"] = todaystr;

    Promise.all([getOneData(),getWeatherTips(),getWeatherData()]).then(
        function(data){
            HtmlData["todayOneData"] = data[0];
            HtmlData["weatherTip"] = data[1];
            HtmlData["threeDaysData"] = data[2];
            sendMail(HtmlData)
        }
    ).catch(function(err){
        getAllDataAndSendMail() //再次获取
        console.log('获取数据失败： ',err);
    })
}