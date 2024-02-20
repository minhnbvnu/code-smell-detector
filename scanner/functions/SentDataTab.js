function SentDataTab(file)
{
    var method = file.request.method;

    // Convert to lower case and capitalize the first letter.
    method = method.charAt(0).toUpperCase() + method.slice(1).toLowerCase();

    this.file = file;
    this.id =  method;
    this.label = Strings[method];
}