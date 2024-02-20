function API(agent) {
  this.agent = agent
  this.shim = new TransactionShim(agent, 'NewRelicAPI')
  this.awsLambda = new AwsLambda(agent)
}