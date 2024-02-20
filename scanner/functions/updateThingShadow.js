function updateThingShadow( )
{
   if (count < 48)
   {
      console.log('updating thing shadow...');
      clientToken = thingShadows.update( integrationTestShadow,
                       { state: { desired: { value: value, quit: 0 }}} );
      value = value*2;
      count++;
   }
   else
   {
       checkAccumulator();
//
// Tell the partner to exit.
//
      clientToken = thingShadows.update( integrationTestShadow,
                       { state: { desired: { value: value, quit: 1 }}} );
      setTimeout( function() { process.exit(0); }, 500 );
   }
}