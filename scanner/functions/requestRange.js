function requestRange(request) {
            $scope.$emit('pagination:loadStart', request);
            $http({
              method: 'GET',
              url: $scope.url,
              params: $scope.urlParams,
              headers: angular.extend(
                {}, $scope.headers,
                { 'Range-Unit': 'items', Range: [request.from, request.to].join('-') }
              ),
              transformResponse: appendTransform($http.defaults.transformResponse, $scope.transformResponse)
            }).success(function (data, status, headers, config) {
              var response = parseRange(headers('Content-Range'));
              if(status === 204 || (response && response.total === 0)) {
                $scope.numItems = 0;
                $scope.collection = [];
              } else {
                $scope.numItems = response ? response.total : data.length;
                $scope.collection = data || [];
              }

              if(response) {
                $scope.rangeFrom = response.from;
                $scope.rangeTo   = response.to;
                if(length(response) < response.total) {
                  if(
                    ( request.to < response.total - 1) ||
                    (response.to < response.total - 1 && response.total < request.to)
                  ) {
                    if(!$scope.perPage || length(response) < $scope.perPage) {
                      if($scope.autoPresets) {
                        var idx = quantizedIndex(length(response));
                        if(quantizedNumber(idx) > length(response)) {
                          idx--;
                        }
                        $scope.serverLimit = quantizedNumber(idx);
                      } else {
                        $scope.serverLimit = length(response);
                      }
                      $scope.perPage = $scope.Math.min(
                        $scope.serverLimit,
                        $scope.clientLimit
                      );
                    }
                  }
                }
              }
              $scope.numPages = Math.ceil($scope.numItems / ($scope.perPage || defaultPerPage));

              $scope.$emit('pagination:loadPage', status, config);
            }).error(function (data, status, headers, config) {
              $scope.$emit('pagination:error', status, config);
            });
          }