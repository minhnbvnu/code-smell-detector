function genConnKey() {
        return (Math.floor((Math.random() * 999999) + 1)).toLocaleString('en-US', { minimumIntegerDigits: 6, useGrouping: false});
      }