function mandreel_is_indexeddb()
{
	if (mandreel_indexedDB.db)
		return true;

	return false;
}