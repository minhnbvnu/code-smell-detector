function prepareImages(e) {
      var d = $q.defer();
      var imglist = [];
      var myurl = loginData.apiurl + '/events/' + e.Event.Id + ".json?"+$rootScope.authSession;
      $http.get(myurl)
        .then(function (succ) {
            var data = succ.data;
            var fps = 0;
            var lastTime = "";

            for (var i = 0; i < data.event.Frame.length; i++) {
              if (data.event.Frame[i].Type == "Alarm")
              //if (1)
              {
                var fname;
                //console.log ("PATH="+e.Event.imageMode);
                
                  fname = e.Event.recordingURL + "/index.php?view=image&width=" + zm.maxGifWidth + "&fid=" + data.event.Frame[i].Id+$rootScope.authSession;
             

                if (data.event.Frame[i].TimeStamp != lastTime /*|| fps < 2*/ )

                {
                  imglist.push(fname);
                  //fps = data.event.Frame[i].TimeStamp != lastTime ? 0 : fps+1;
                  lastTime = data.event.Frame[i].TimeStamp;
                }

              }

            }

            // next up make sure we are not processing more than 100 images

            while (imglist.length > zm.maxGifCount2) {
              NVR.debug("Too many images: " + imglist.length + ", deleting  alternate frames to keep it <=" + zm.maxGifCount2);

              for (var l = 0; l < imglist.length; l++) {
                imglist.splice(l + 1, 2);
                if (imglist.length <= zm.maxGifCount2) break;
              }

            }
            NVR.debug("final image list length is:" + imglist.length);

            d.resolve(imglist);
            return d.promise;
          },
          function (err) {
            d.reject(err);
            return d.promise;
          });
      return d.promise;
    }