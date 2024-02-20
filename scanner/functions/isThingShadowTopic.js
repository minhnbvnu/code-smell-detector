function isThingShadowTopic(topicTokens, direction) {
   var rc = false;
   if (topicTokens[0] === '$aws') {
      //
      // Thing shadow topics have the form:
      //
      //      $aws/things/{thingName}/shadow/{Operation}/{Status}
      //
      // Where {Operation} === update|get|delete
      //   And    {Status} === accepted|rejected|delta
      //
      if ((topicTokens[1] === 'things') &&
         (topicTokens[3] === 'shadow') &&
         ((topicTokens[4] === 'update') ||
            (topicTokens[4] === 'get') ||
            (topicTokens[4] === 'delete'))) {
         //
         // Looks good so far; now check the direction and see if
         // still makes sense.
         //
         if (direction === 'subscribe') {
            if (((topicTokens[5] === 'accepted') ||
                  (topicTokens[5] === 'rejected') ||
                  (topicTokens[5] === 'delta')) &&
               (topicTokens.length === 6)) {
               rc = true;
            }
         } else // direction === 'publish'
         {
            if (topicTokens.length === 5) {
               rc = true;
            }
         }
      }
   }
   return rc;
}