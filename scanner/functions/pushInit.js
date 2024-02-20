function pushInit() {
      NVR.log("EventServer: Setting up push registration");
      var push;
      var mediasrc;
      var media;
      var ld = NVR.getLogin();

      //var plat = $ionicPlatform.is('ios') ? 'ios' : 'android';
      var plat = $rootScope.platformOS;

      if ($rootScope.platformOS == 'desktop') {
       NVR.log ('push: Not setting up push as this is desktop.');
        return;
      }
     
      // get permission if we need it
      FirebasePlugin.hasPermission(function(hasPermission){
        if (!hasPermission) {
          window.FirebasePlugin.grantPermission(function(hasPermission){
            if (hasPermission) {
              NVR.debug ('push: permission granted, waiting for token');
            } else {
              NVR.log('ERROR: push: Permission not granted for push');
            }
          });
        } else {
          NVR.debug('push: permissions are already enabled');
        }
      });

      if ($rootScope.platformOS == 'android') {
        // Define custom  channel - all keys are except 'id' are optional.
        var channel  = {
          // channel ID - must be unique per app package
          id: "zmninja",
          // Channel description. Default: empty string
          description: "zmNinja push",
          // Channel name. Default: empty string
          name: "zmNinja",
          //The sound to play once a push comes. Default value: 'default'
          //Values allowed:
          //'default' - plays the default notification sound
          //'ringtone' - plays the currently set ringtone
          //'false' - silent; don't play any sound
          //filename - the filename of the sound file located in '/res/raw' without file extension (mysound.mp3 -> mysound)
          sound: "default",

          //Vibrate on new notification. Default value: true
          //Possible values:
          //Boolean - vibrate or not
          //Array - vibration pattern - e.g. [500, 200, 500] - milliseconds vibrate, milliseconds pause, vibrate, pause, etc.
          vibration: true,
          // Whether to blink the LED
          light: true,
          //LED color in ARGB format - this example BLUE color. If set to -1, light color will be default. Default value: -1.
          lightColor: parseInt("FF0000FF", 16).toString(),
          //Importance - integer from 0 to 4. Default value: 4
          //0 - none - no sound, does not show in the shade
          //1 - min - no sound, only shows in the shade, below the fold
          //2 - low - no sound, shows in the shade, and potentially in the status bar
          //3 - default - shows everywhere, makes noise, but does not visually intrude
          //4 - high - shows everywhere, makes noise and peeks
          importance: 4,

          //Show badge over app icon when non handled pushes are present. Default value: true
          badge: true,

          //Show message on locked screen. Default value: 1
          //Possible values (default 1):
          //-1 - secret - Do not reveal any part of the notification on a secure lockscreen.
          //0 - private - Show the notification on all lockscreens, but conceal sensitive or private information on secure lockscreens.
          //1 - public - Show the notification in its entirety on all lockscreens.
          visibility: 1
        };

        // Create the channel
        FirebasePlugin.createChannel(channel,
        function(){
          NVR.debug('push: Channel created: ' + channel.id);
        },
        function(error){
        NVR.debug('push: Create channel error: ' + error);
        });
      }

      if ($rootScope.platformOS == 'ios') {
        if (ld.isUseEventServer) {
          NVR.debug ('push: ios, setting badge alarm count at start');
          window.FirebasePlugin.getBadgeNumber(function(cnt) {
            if (cnt) {
              NVR.debug('push: ios, badge is:'+cnt);
              $rootScope.isAlarm = 1;
              $rootScope.alarmCount = cnt;
              if ($rootScope.alarmCount > 99) {
                $rootScope.alarmCount = '99+';
              }
            }
          });
        }
      } // ios
      //
      // called when token is assigned
      window.FirebasePlugin.onTokenRefresh(
        function (token) {
          NVR.debug("push: got token:"+token);
          $rootScope.apnsToken = token;
          NVR.debug ('push: setting up onMessageReceived...');
          window.FirebasePlugin.onMessageReceived(function(message) {
            $ionicPlatform.ready(function () {

              NVR.debug("push: EventServer: received push notification with payload:"+JSON.stringify(message));

              if ($rootScope.platformOS != 'desktop') {
                NVR.debug ("push: clearing badge");
                window.FirebasePlugin.setBadgeNumber(0);
              }
              
              var ld = NVR.getLogin();
              if (ld.isUseEventServer == false) {
                NVR.debug("push: EventServer: received push notification, but event server disabled. Not acting on it");
                return;
              }
              NVR.debug('push: Message type received is:'+message.messageType);
              
              sendMessage('push', {
                type: 'badge',
                badge: 0,
              });
              var mid;
              var eid = message.eid;
              if (message.mid) {
                mid = message.mid;
                var mi = mid.indexOf(',');
                if (mi > 0) {
                  mid = mid.slice(0, mi);
                }
                mid = parseInt(mid);
              }
              
              if (message.tap=='foreground') {
                console.log ('push: Foreground');
                $rootScope.tappedNotification = 0;
                $rootScope.tappedEid = 0;
                $rootScope.tappedMid = 0;

                if (ld.soundOnPush) {
                  media.play({
                    playAudioWhenScreenIsLocked: false
                  });
                }
                if ($rootScope.alarmCount == "99") {
                  $rootScope.alarmCount = "99+";
                }
                if ($rootScope.alarmCount != "99+") {
                  $rootScope.alarmCount = (parseInt($rootScope.alarmCount) + 1).toString();
                }
                $rootScope.isAlarm = 1;

              } else if (message.tap == 'background') {
                $rootScope.alarmCount = "0";
                $rootScope.isAlarm = 0;
                $rootScope.tappedNotification = 1;
                $rootScope.tappedMid = mid;
                $rootScope.tappedEid = eid;
                NVR.log("EventServer: Push notification: Tapped Monitor taken as:" + $rootScope.tappedMid);
  
                $timeout ( function () {
                  NVR.debug ("EventServer: broadcasting process-push");
                  $rootScope.$broadcast('process-push');
                },100);
  
              } else {
                NVR.debug ("push: message tap not defined");
                $rootScope.tappedNotification = 0;
                $rootScope.tappedEid = 0;
                $rootScope.tappedMid = 0;
              }

            }); // ready
          });
        }, 
        function (err) {
          NVR.debug ('push: Error getting token:'+err);
        });

      if (plat == 'ios') {
        mediasrc = "sounds/blop.mp3";
       /* push = PushNotification.init(

          {
            "ios": {
              "alert": "true",
              "badge": "true",
              "sound": "true",
              //"sound": "true",
              "clearBadge": "true",
              //"fcmSandbox": "true"
            }
          }

        );*/

      } else {
        mediasrc = "/android_asset/www/sounds/blop.mp3";
        var android_media_file = "blop";

       /* push = PushNotification.init(

          {
            "android": {
              // "senderID": zm.gcmSenderId,
              "icon": "ic_stat_notification",
              sound: "true",
              vibrate: "true",
              //"sound": android_media_file
            }
          }

        );*/

      }

     /* PushNotification.hasPermission(function (succ) {
        NVR.debug ("Push permission returned: "+JSON.stringify(succ));
      }, function (err) {
        NVR.debug ("Push permission error returned: "+JSON.stringify(err));
      });*/
      // console.log("*********** MEDIA BLOG IS " + mediasrc);

      try {
        media = $cordovaMedia.newMedia(mediasrc);  
      }
      catch (err) {
        NVR.debug ("Media init error:"+JSON.stringify(err));
      }

      /*
      push.on('registration', function (data) {
        pushInited = true;
        NVR.debug("EventServer: Push Notification registration ID received: " + JSON.stringify(data));
        $rootScope.apnsToken = data.registrationId;

        var plat = $rootScope.platformOS;
        var ld = NVR.getLogin();
        var pushstate = "enabled";
        if (ld.disablePush == true)
          pushstate = "disabled";

        // now at this stage, if this is a first registration
        // zmeventserver will have no record of this token
        // so we need to make sure we send it a legit list of 
        // monitors otherwise users will get notifications for monitors
        // their login is not supposed to see. Refer #391

        var monstring = '';
        var intstring = '';
        NVR.getMonitors()
          .then(function (succ) {
              var mon = succ;

              if (ld.eventServerMonitors != '') {
                // load previous monlist and intlist
                // so we don't overwrite 
                monstring = ld.eventServerMonitors;
                intstring = ld.eventServerInterval;
                NVR.debug("EventServer: loading saved monitor list and interval of " + monstring + ">>" + intstring);

              } else { // build new list

                for (var i = 0; i < mon.length; i++) {
                  monstring = monstring + mon[i].Monitor.Id + ",";
                  intstring = intstring + '0,';
                }
                if (monstring.charAt(monstring.length - 1) == ',')
                  monstring = monstring.substr(0, monstring.length - 1);

                if (intstring.charAt(intstring.length - 1) == ',')
                  intstring = intstring.substr(0, intstring.length - 1);

              }

              $rootScope.monstring = monstring;
              $rootScope.intstring = intstring;

              sendMessage('push', {
                type: 'token',
                platform: plat,
                token: $rootScope.apnsToken,
                monlist: monstring,
                intlist: intstring,
                state: pushstate
              }, 1);

            },
            function (err) {
              NVR.log("EventServer: Could not get monitors, can't send push reg");
            });

      }); */
      
      // add push code here
    
    }