function rewriteIndex()
{
    Log.info("!!!!!!!!! Runnning page filter");

    var div = document.getElementById("index");

    var lis = div.getElementsByTagName("li");

    for (var i = 0; i < lis.length; ++i)
    {
        var li = lis[i];
        removeDuplicates(li);
    }
}