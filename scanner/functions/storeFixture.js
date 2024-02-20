function storeFixture() {
	var fixture = id( "qunit-fixture" );
	if ( fixture ) {
		config.fixture = fixture.innerHTML;
	}
}