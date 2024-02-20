function XRData() {
        this.leftViewRotation =  [0, 0, 0, 1];
        this.rightViewRotation = [0, 0, 0, 1];
        this.leftViewPosition =  [0, 0, 0];
        this.rightViewPosition = [0, 0, 0];
        this.gamepads = [];
        this.controllerA = new XRControllerData();
        this.controllerB = new XRControllerData();
        this.handLeft = new XRHandData();
        this.handRight = new XRHandData();
        this.viewerHitTestPose = new XRHitPoseData();
        this.frameNumber = 0;
        this.touchIDs = [];
        this.touches = [];
        this.eventsNamesToIDs = {};
        this.CreateTouch = function (pageElement, xPercentage, yPercentage) {
          var touchID = 0;
          while (this.touchIDs.includes(touchID))
          {
            touchID++;
          }
          var touch = new XRTouch(touchID, pageElement, xPercentage, yPercentage);
          this.touchIDs.push(touchID);
          this.touches.push(touch);
          return touch;
        }
        this.RemoveTouch = function (touch) {
          touch.ended = true;
          this.touchIDs = this.touchIDs.filter(function(item) {
            return item !== touch.identifier
          });
          this.touches = this.touches.filter(function(item) {
            return item !== touch
          });
        }
        this.SendTouchEvent = function(JSEventsObject, eventName, target, changedTouches) {
          var touchEvent = new XRTouchEvent(eventName, target, this.touches, this.touches, changedTouches);
          JSEventsObject.eventHandlers[this.eventsNamesToIDs[eventName]].eventListenerFunc(touchEvent);
        }
      }