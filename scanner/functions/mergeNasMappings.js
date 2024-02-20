function mergeNasMappings(fromTpl, fromNasYml) {

  return _.mapValues(fromTpl, (nasMappings, serviceName) => {

    if (_.isEmpty(fromNasYml[serviceName])) {
      return nasMappings;
    }
    return _.unionWith([...fromNasYml[serviceName], ...nasMappings], _.isEqual);
  });
}