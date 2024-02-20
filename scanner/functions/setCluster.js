function setCluster(clusterName) {
            if(allClusters.length === 0) {
                setMissingEnvJS(true);
                console.log("File [env.js] does not exist")
             }
             if(angular.isUndefined(clusterName)) {
                  selectedCluster = allClusters[0];
             } else {
                  var filteredArray = allClusters.filter(function(el) {return el.NAME == clusterName});
                  selectedCluster = filteredArray.length == 1 ?  filteredArray[0]  : allClusters[0];
             }
          }