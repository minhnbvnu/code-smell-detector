function getWeatherTips(){
    let p = new Promise(function(resolve,reject){
        superagent.get(WeatherUrl).end(function(err, res) {
            if (err) {
                reject(err);
            }
            let threeDaysData = [];
            let weatherTip = "";
            let $ = cheerio.load(res.text);
            $(".wea_tips").each(function(i, elem) {
              weatherTip = $(elem)
                .find("em")
                .text();
            });
            resolve(weatherTip)
          });
    })
    return p
}