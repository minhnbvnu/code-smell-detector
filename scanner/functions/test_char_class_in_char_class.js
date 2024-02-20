function test_char_class_in_char_class ()
{
    if (!(new RegExp("[\\s]+")).test("   \n\t"))
        return 1;

    return 0;
}