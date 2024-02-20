function needToTransForm(serviceName, functionName) {
  return (typeof serviceName === 'string' && typeof functionName === 'string');
}