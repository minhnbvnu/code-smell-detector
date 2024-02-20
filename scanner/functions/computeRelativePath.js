function computeRelativePath(event) {
    var relativePath = "";
    var loginData = NVR.getLogin();
    var str = event.Event.StartTime;
    var yy = moment(str).locale('en').format('YY');
    var mm = moment(str).locale('en').format('MM');
    var dd = moment(str).locale('en').format('DD');
    var hh = moment(str).locale('en').format('HH');
    var min = moment(str).locale('en').format('mm');
    var sec = moment(str).locale('en').format('ss');
    relativePath = event.Event.MonitorId + "/" +
      yy + "/" +
      mm + "/" +
      dd + "/" +
      hh + "/" +
      min + "/" +
      sec + "/";
    return relativePath;

  }