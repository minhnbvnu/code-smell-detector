function getMatchPropsData(data) {
        var matchData = {};
        var dataKeys = Object.keys(data);
        dataKeys.forEach(function (key) {
          matchData[key] = toRegExp(data[key]);
        });
        return matchData;
      }