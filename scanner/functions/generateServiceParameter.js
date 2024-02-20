function generateServiceParameter(serviceParameterName, requestParameter) {
  return {
    serviceParameterName: serviceParameterName,
    location: requestParameter.location,
    parameterType: requestParameter.parameterType,
    parameterCatalog: 'REQUEST'
  };
}