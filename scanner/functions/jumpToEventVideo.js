function jumpToEventVideo(dirn) {
    var ld = NVR.getLogin();
    var url = ld.url + '/index.php?view=request&request=status&entity=nearevents&id=' + $scope.eventId;
    // url += "&filter%5BQuery%5D%5Bterms%5D%5B0%5D%5Battr%5D=MonitorId&filter%5BQuery%5D%5Bterms%5D%5B0%5D%5Bop%5D=%3D&filter%5BQuery%5D%5Bterms%5D%5B0%5D%5Bval%5D=5&sort_field=StartTime&sort_asc=1"; // wtf junk
    NVR.debug("Asking nearest video EID using " + url);
    $http.get(url)
      .then(function (succ) {
          // console.log ("GOT "+JSON.stringify(succ));

        },
        function (err) {
          // console.log ("ERR GOT "+JSON.stringify(succ));
        }
      );
  }