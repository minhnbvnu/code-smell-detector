function testCardTypeByNumber(number, cardname, expected) {
	$("#cardnumber").val(number);
	var actual = $("#ccform").valid();
	equal(actual, expected, $.format("Expect card number {0} to validate to {1}, actually validated to ", number, expected));
}