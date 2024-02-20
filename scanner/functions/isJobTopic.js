function isJobTopic(topicTokens) {
   //
   // Job topics have the forms:
   //
   //      $aws/things/{thingName}/jobs/#
   //
   return (topicTokens[0] === '$aws' && topicTokens[1] === 'things' && topicTokens[3] === 'jobs');
}