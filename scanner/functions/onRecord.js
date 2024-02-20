function onRecord() {
    microm.record().then(function() {
      status.innerHTML = 'Recording';
    }).catch(function(error) {
      console.log('error recording', error);
    })
  }