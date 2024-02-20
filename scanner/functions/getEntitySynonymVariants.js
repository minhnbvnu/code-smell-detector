function getEntitySynonymVariants(synonym_id) {
    EntitySynonymVariants.query({ synonym_id: synonym_id }).$promise.then(function (data) {
      var tags = [];
      for (var i = 0; i <= data.length - 1; i++) {
        tags.push({
          text: data[i].synonym_value,
          synonym_variant_id: data[i].synonym_variant_id
        });
      }
      $scope.tags[synonym_id] = tags;
    }
    );
  }