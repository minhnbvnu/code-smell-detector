function getInterval(id) {
     // means no interval, should only happen one time
     // till we save
     if ($scope.loginData.eventServerInterval == "")
       return 0;
     var retval = 0;
     for (var i = 0; i < res.length; i++) {
       if (res[i] == id) {
         retval = parseInt(minterval[i]);
         break;
       }
     }
     return retval;
   }