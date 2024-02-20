function isEnabled(id) {
     if ($scope.loginData.eventServerMonitors == "")
       return true;

     var isThere = false;
     for (var i = 0; i < res.length; i++) {
       if (res[i] == id) {
         isThere = true;
         //console.log("isRes found: " + id);
         break;
       }
     }
     return isThere;
   }