function doContactPicker() {
	navigator.contacts.pickContact(function(contact){
		console.log('The following contact has been selected:' + JSON.stringify(contact));
		//Build a simple string to display the Contact - would be better in Handlebars
		var s = "";
		s += "<h2>"+getName(contact)+"</h2>";

		if(contact.emails && contact.emails.length) {
			s+= "Email: "+contact.emails[0].value+"<br/>";
		}

		if(contact.phoneNumbers && contact.phoneNumbers.length) {
			s+= "Phone: "+contact.phoneNumbers[0].value+"<br/>";
		}

		if(contact.photos && contact.photos.length) {
			s+= "<p><img src='"+contact.photos[0].value+"'></p>";
		}

		document.querySelector("#selectedContact").innerHTML=s;
	},function(err){
		console.log('Error: ' + err);
	});
}