function loadServices() {
          NVR.log("Language file loaded, continuing with rest");
          NVR.init();
          zmCheckUpdates.start();
         // NVR.log("Setting up POST LOGIN timer");
          setupPauseAndResume();
        }