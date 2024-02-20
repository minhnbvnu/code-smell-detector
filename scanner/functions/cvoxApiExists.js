function cvoxApiExists() {
  return (typeof(cvox) !== 'undefined') && cvox && cvox.Api;
}