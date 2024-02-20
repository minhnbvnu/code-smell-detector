function mandreel_is_filesystem()
{
	if (mandreel_indexedDB.db)
		return false;

	if (!g_mandreel_fs)
		return false;

	return true;
}