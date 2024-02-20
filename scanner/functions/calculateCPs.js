function calculateCPs(
  object,
  mixinDetails,
  errorsForObject,
  expensiveProperties,
  tracked
) {
  expensiveProperties = expensiveProperties || [];
  mixinDetails.forEach((mixin) => {
    mixin.properties.forEach((item) => {
      if (item.overridden) {
        return true;
      }
      if (!item.value.isCalculated) {
        let cache = cacheFor(object, item.name);
        item.isExpensive = expensiveProperties.indexOf(item.name) >= 0;
        if (cache !== undefined || !item.isExpensive) {
          let value;
          if (item.canTrack && HAS_GLIMMER_TRACKING) {
            const tagInfo = (tracked[item.name] = {});
            tagInfo.tag = track(() => {
              value = calculateCP(object, item, errorsForObject);
            });
            if (tagInfo.tag === tagForProperty(object, item.name)) {
              if (!item.isComputed && !item.isService) {
                item.code = '';
                item.isTracked = true;
              }
            }
            item.dependentKeys = getTrackedDependencies(
              object,
              item.name,
              tagInfo
            );
            tagInfo.revision = tagValue(tagInfo.tag);
          } else {
            value = calculateCP(object, item, errorsForObject);
          }
          if (!value || !(value instanceof CalculateCPError)) {
            item.value = inspectValue(object, item.name, value);
            item.value.isCalculated = true;
            if (item.value.type === 'type-function') {
              item.code = '';
            }
          }
        }
      }
    });
  });
}