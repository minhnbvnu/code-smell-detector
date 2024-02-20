function transformAsyncConfiguration (resources = {}, region, accountId) {
  _.forEach(resources, function(value) {
    if (value.Type === 'ALIYUN::FC::Function' && value.Properties) {
      if (value.Properties.AsyncConfiguration && value.Properties.AsyncConfiguration.Destination) {
        const { OnSuccess, OnFailure } = value.Properties.AsyncConfiguration.Destination;
        if (OnSuccess) {
          value.Properties.AsyncConfiguration.Destination.OnSuccess = OnSuccess.replace(':::', `:${region}:${accountId}:`);
        }
        if (OnFailure) {
          value.Properties.AsyncConfiguration.Destination.OnFailure = OnFailure.replace(':::', `:${region}:${accountId}:`);
        }
      }
    }
  });
}