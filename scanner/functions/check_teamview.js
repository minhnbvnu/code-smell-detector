function check_teamview(data, emails){

  return open_page_func({
    url    : application_host + 'calendar/teamview/',
    driver : data.driver,
  })
  .then(function(data){
    var promise_to_check = data.driver
      .findElements(By.css( 'tr.teamview-user-list-row > td.left-column-cell' ))

      // Make sure that number of users is as expected
      .then(function(elements){

        expect(elements.length).to.be.equal( emails.length );

        return Promise.all(_.map(elements, function(el){ return el.getText();  }));
      })

      // Make sure that users are actually those as expected
      .then(function(full_names){

        // The idea is to extract unique tokens from provided emails
        var tokens_from_emails = _.map(emails, function(email){
          return email.substring(0, email.lastIndexOf("@"));
        }).sort();

        // ... extract unique tokens from full names on the page
        var tokens_from_name = _.map(full_names, function(name){
          return name.substring(4, name.lastIndexOf(" "));
        }).sort();

        // ... and make sure that they are matched
        expect( tokens_from_emails ).to.be.eql(tokens_from_name);

        return Promise.resolve(data);
      });

    return promise_to_check;
  });
}