function check_presense_promises(args){

  var selectors = args.selectors,
      driver    = args.driver,
      presense  = args.presense || false;

  var promises_to_check = _.map(
   selectors,
    function( selector ){
      return driver
        .isElementPresent(By.css(selector))
        .then(function(is_present){
          expect(is_present).to.be.equal(presense);
          return bluebird.resolve();
        })
    }
  );

  return promises_to_check;
}