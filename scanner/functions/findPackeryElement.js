function findPackeryElement(i) {
        pckry.getItemElements().forEach(function (elem) {

          var id = elem.getAttribute("data-item-id");
          if (id == $scope.MontageMonitors[i].Monitor.Id) {
            if ($scope.MontageMonitors[i].Monitor.isStamp)
              pckry.unstamp(elem);
            else
              pckry.stamp(elem);

            $scope.MontageMonitors[i].Monitor.isStamp = !$scope.MontageMonitors[i].Monitor.isStamp;
            NVR.debug("Stamp for " + $scope.MontageMonitors[i].Monitor.Name + " is:" + $scope.MontageMonitors[i].Monitor.isStamp);
            //break;
          }
        });
      }