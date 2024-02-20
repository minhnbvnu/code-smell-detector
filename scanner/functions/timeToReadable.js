function timeToReadable(time) {
      var hours = Math.floor(time / 3600);
      time = time - hours * 3600;
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;
      return hours + ' hours, ' + minutes + ' minutes and ' + seconds +
        ' seconds';
    }