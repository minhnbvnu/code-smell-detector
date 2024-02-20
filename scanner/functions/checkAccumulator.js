function checkAccumulator()
{
//
// Check the accumulator to see how many messages were received from the
// partner process via the MQTT passthrough.
//
   var i, messages = 0, accSave=accumulator;
   for (i = 0; i < 48; i++)
   {
      if (accumulator & 1)
      {
         messages++;
      }
      accumulator = accumulator>>1;
   }
   console.log(messages+' messages received, accumulator='+accSave.toString(16));
}