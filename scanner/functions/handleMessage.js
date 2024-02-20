function handleMessage(smsg) {
      //NVR.debug ("Websocket received message:"+smsg);
      str = JSON.parse(smsg);
      NVR.debug("EventServer: Real-time event: " + JSON.stringify(str));

      // Error messages
      if (str.status != 'Success') {
        NVR.log("EventServer: Error: " + JSON.stringify(str));

        if (str.reason == 'APNSDISABLED') {
          console.log("FORCE CLOSING");
          iClosed=true;
          ws.close();
          NVR.displayBanner('error', ['Event Server: APNS disabled'], 2000, 6000);
          $rootScope.apnsToken = "";
        }
      }

      if (str.status == 'Success' ) {
        if (str.event == 'auth') {
          authState = connState.SUCCESS;

          // Now handle pending messages in queue

          if (pendingMessages.length) {
            NVR.debug("EventServer: Sending pending messages, as auth confirmation received");
            while (pendingMessages.length) {
              var p = pendingMessages.pop();
              sendMessage(p.type, p.obj);
            }
          } else {
            NVR.debug("EventServer: auth confirmation received, no pendingMessages in queue");
          }

          if (str.version == undefined)
            str.version = "0.1";
          //console.log ('************* COMPARING '+str.version+'to '+zm.minEventServerVersion);
          if (NVR.versionCompare(str.version, zm.minEventServerVersion) == -1) {
            $rootScope.zmPopup = $ionicPopup.alert({
              title: $translate.instant('kEventServerVersionTitle'),
              template: $translate.instant('kEventServerVersionBody1') + " " + str.version + ". " + $translate.instant('kEventServerVersionBody2') + " " +
              zm.minEventServerVersion,
              okText: $translate.instant('kButtonOk'),
              cancelText: $translate.instant('kButtonCancel'),
            });
          }
        } else if (str.event == 'alarm') {
          // new events

          var localNotText;
          // ZMN specific hack for Event Server
          if (str.supplementary != 'true') {
            new Audio('sounds/blop.mp3').play();
            localNotText = "";
            $rootScope.isAlarm = 1;

            // Show upto a max of 99 when it comes to display
            // so aesthetics are maintained
            if ($rootScope.alarmCount == "99") {
              $rootScope.alarmCount = "99+";
            }
            if ($rootScope.alarmCount != "99+") {
              $rootScope.alarmCount = (parseInt($rootScope.alarmCount) + 1).toString();
            }

          } else {
            NVR.debug("EventServer: received supplementary event information over websockets");
          }
          var eventsToDisplay = [];
          var listOfMonitors = [];
          for (var iter = 0; iter < str.events.length; iter++) {
            // lets stack the display so they don't overwrite
            //eventsToDisplay.push(str.events[iter].Name + ": latest new alarm (" + str.events[iter].EventId + ")");
            var txt = str.events[iter].EventId;
            if (str.events[iter].Cause) {
              txt = str.events[iter].Cause;
            }
            eventsToDisplay.push(str.events[iter].Name + ": " + txt);
            localNotText = localNotText + str.events[iter].Name + ": " + txt + ",";
            listOfMonitors.push(str.events[iter].MonitorId);
          }
          localNotText = localNotText.substring(0, localNotText.length - 1);

          // if we are in background, do a local notification, else do an in app display
          if (!NVR.isBackground()) {
            //emit alarm details - this is when received over websockets
            $rootScope.$broadcast('alarm', {
              message: listOfMonitors
            });

            if (str.supplementary != 'true') {
              NVR.debug("EventServer: App is in foreground, displaying banner");
              if (eventsToDisplay.length > 0) {
                if (eventsToDisplay.length == 1) {
                  //console.log("Single Display: " + eventsToDisplay[0]);
                  NVR.displayBanner('alarm', [eventsToDisplay[0]], 5000, 5000);
                } else {
                  NVR.displayBanner('alarm', eventsToDisplay,
                    5000, 5000 * eventsToDisplay.length);
                }
              }
            }
          } // end if ! NVR.isBackground
        } // end if type == alarm | auth
      } // end if status == success
    }