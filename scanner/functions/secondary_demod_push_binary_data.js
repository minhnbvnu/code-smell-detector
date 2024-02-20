function secondary_demod_push_binary_data(x)
{
    secondary_demod_push_data(Array.from(x).map( y => (y)?"1":"0" ).join(""));
}