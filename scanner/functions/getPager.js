function getPager() {
        if (!pager) {
          var childScope = $scope.$new();
          pager = jqLite('<ion-pager></ion-pager>');
          $element.append(pager);
          pager = $compile(pager)(childScope);
        }
        return pager;
      }