function sc_hashtableContains(ht, key) {
    var hash = sc_hash(key);
    if (hash in ht)
	return true;
    else
	return false;
}