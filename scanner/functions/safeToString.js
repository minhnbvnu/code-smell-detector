function safeToString(ob) {
    try
    {
        return ob.toString();
    }
    catch (exc)
    {
        return "";
    }
}