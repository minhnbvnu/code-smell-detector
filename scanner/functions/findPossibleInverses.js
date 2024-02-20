function findPossibleInverses(type, inverseType, possibleRelationships) {
      possibleRelationships = possibleRelationships || [];

      var relationshipMap = get(inverseType, 'relationships');
      if (!relationshipMap) { return; }

      var relationships = relationshipMap.get(type);
      if (relationships) {
        possibleRelationships.push.apply(possibleRelationships, relationshipMap.get(type));
      }

      if (type.superclass) {
        findPossibleInverses(type.superclass, inverseType, possibleRelationships);
      }

      return possibleRelationships;
    }