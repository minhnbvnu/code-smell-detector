function get_filter(name)
{
    function filter(key, value)
    {
        //println('key: ' + key);
        //println('value: ' + value);

        return (key == name) ? undefined : value;
    }

    return filter;
}