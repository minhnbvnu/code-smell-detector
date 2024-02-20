function timeAgo(oldTime, curTime)
{
    var secsAgo = Math.max((curTime - oldTime) / 1000, 0);
    var minsAgo = Math.floor(secsAgo / 60);
    var hoursAgo = Math.floor(minsAgo / 60);
    var daysAgo = Math.floor(hoursAgo / 24);

    if (daysAgo == 1)
        return 'yesterday';
    if (daysAgo > 1)
        return daysAgo + ' days ago';
    if (hoursAgo == 1)
        return '1 hour ago';
    if (hoursAgo > 1)
        return hoursAgo + ' hours ago';
    if (minsAgo > 1)
        return minsAgo + ' mins ago';

    return 'now';
}