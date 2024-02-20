function InitAdapter() {
	if (!OS_MOBILEWEB) {
		throw 'localStorage persistence supported only with MobileWeb.';
	}
}