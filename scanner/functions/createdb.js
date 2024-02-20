function createdb(done, dbname, version)
{
    var rq_open = createdb_for_multiple_tests(dbname, version);
    return rq_open.setDone(done);
}