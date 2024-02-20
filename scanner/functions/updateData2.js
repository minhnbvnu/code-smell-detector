function updateData2() {
    if (!$scope.data1 || !$scope.kernel) return
    var w = $scope.iw, h = $scope.ih
    $scope.data2 = []
    var k = $scope.kernel.map(function(d) { return +d })
    kernel($scope.data1, w, h, k, $scope.data2)
    for(var i = 0; i < w; i++) $scope.data2[i] = 0
    for(var j = 0; j < h; j++)
      $scope.data2[j * w] = $scope.data2[(j + 1) * w - 1] = 0
    for(var i = 0; i < w; i++) $scope.data2[w * h - w + i] = 0
  }