function getExpandedEvents(i, indivGrab) {
        var d = $q.defer();
        var ld = NVR.getLogin();
        // console.log ("Expanded API: " + indivGrab);
        $http({
          method: 'get',
          url: indivGrab
        }).then(function (succ) {
            var data = succ.data;
             //console.log ("EXPANDED DATA FOR MONITOR " + i + JSON.stringify(data));
            if (data.events.length > 0) {
              if (!NVR.isBackground()) {
                var bw = NVR.getBandwidth() == "lowbw" ? zm.eventMontageQualityLowBW : ld.montageHistoryQuality;
                var eType = data.events[0].Event.DefaultVideo != ''? 'video':'jpeg';

                var eid =  data.events[0].Event.Id;

                if (eType=='video') {
                  var videoURL= $scope.MontageMonitors[i].Monitor.baseURL  + "/index.php?view=view_video&mode=mpeg&format=h264&eid=" + eid;

                  videoURL += $rootScope.authSession;
                  if ($rootScope.basicAuthToken) videoURL = videoURL + "&basicauth=" + $rootScope.basicAuthToken;

          
                  $scope.MontageMonitors[i].Monitor.videoObject = {
                    config: {
                      autoPlay: true,
                      responsive: false,
                      nativeControls: false,
                      nativeFullScreen: true,
        
                      playsInline: true,
                      sources: [{
                          src: $sce.trustAsResourceUrl(videoURL),
                          type: "video/mp4"
                        }
        
                      ],
        
                      theme: "external/videogular2.2.1/videogular.min.css",
                      cuepoints: {
                        theme: {
                          url: "external/videogular2.2.1/videogular-cuepoints.min.css"
                        },
                        points: [],
                      }
                    }
                  };
                }
                $scope.MontageMonitors[i].Monitor.eventType = eType;
                $scope.MontageMonitors[i].Monitor.eventUrl = $scope.MontageMonitors[i].Monitor.streamingURL + "/nph-zms?source=event&mode=jpeg&event=" + data.events[0].Event.Id + "&frame=1&replay=gapless&rate=" + $scope.sliderVal.realRate + "&connkey=" + $scope.MontageMonitors[i].Monitor.connKey + "&scale=" + bw + $rootScope.authSession;
                //console.log ("SWITCHING TO " + $scope.MontageMonitors[i].eventUrl);
                $scope.MontageMonitors[i].Monitor.eventUrlTime = data.events[0].Event.StartTime;
                $scope.MontageMonitors[i].Monitor.eid = data.events[0].Event.Id;
                $scope.MontageMonitors[i].Monitor.noGraph = true;
                $scope.MontageMonitors[i].Monitor.sliderProgress = {
                  progress: 0
                };
                $scope.MontageMonitors[i].Monitor.eventDuration = data.events[0].Event.Length;
                //console.log(">>> Setting Event for " + $scope.MontageMonitors[i].Monitor.Name + " to " + data.events[0].Event.Id);
                NVR.log("Found expanded event " + data.events[0].Event.Id + " for monitor " + $scope.MontageMonitors[i].Monitor.Id);
              } else {
                // $scope.MontageMonitors[i].eventUrl="img/noimage.png";
                //    $scope.MontageMonitors[i].eventUrlTime = "";
                //    NVR.log ("Setting img src to null as data received in background");
              }
            }
            d.resolve(true);

            return d.promise;

          },
          function (err) {
            d.resolve(true);

            return d.promise;

          }

        );
        return d.promise;
      }