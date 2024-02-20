function buildJobTopic(thingName, jobId, operation) {
   var result = '$aws/things/' + thingName + '/jobs/';

   // check for omitted jobId and fixup parameters
   if (isUndefined(operation)) {
      operation = jobId;
   } else {
      result += jobId.toString() + '/';
   }

   result += operation;

   return result;
}