function test_hyphen_character ()
{
    //print(new RegExp("[-djhd]").exec("xabcx-"));
    if (!check_equal_matches(/-/g.exec("somestring-inthe"),["-"]))
        return 1;
    if (!check_equal_matches(/a-c/g.exec("a-cabc"),["a-c"]))
        return 2;
    if (!check_equal_matches(/[-xyz]/g.exec("somestring-inthe"),["-"]))
        return 3;
    if (!check_equal_matches(/[xz-]/g.exec("somestring-inthe"),["-"]))
        return 4;

    return 0;
}