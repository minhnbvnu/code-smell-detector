function cycleMontageProfiles() {
      var ld = NVR.getLogin();

      if (!ld.cycleMontageProfiles) {
        // NVR.debug ("cycling disabled");
        return;
      }

      if ($scope.reOrderActive) {
        NVR.debug("not cycling, re-order in progress");
        return;
      }

      if ($scope.isDragabillyOn) {
        NVR.debug("not cycling, edit in progress");
        return;
      }

      var nextProfile = findNext(ld.currentMontageProfile, ld.packeryPositionsArray);

      if (nextProfile == ld.currentMontageProfile) {
        NVR.debug("Not cycling profiles, looks like you only have one");
      } else {
        NVR.debug("Cycling profile from: " + ld.currentMontageProfile + " to:" + nextProfile);
        switchMontageProfile(nextProfile);
      }
    }