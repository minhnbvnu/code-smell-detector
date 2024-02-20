function isLegal(value) {
      return _.isNumber(value) && value > 0 && value < 1000000 // 不能小于等于0, 不能大于1000秒 
    }