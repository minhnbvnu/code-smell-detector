function treeCopy(obj)
{
    if (obj instanceof Array)
    {
        let newObj = new Array(obj.length);

        for (let i = 0; i < obj.length; ++i)
            newObj[i] = treeCopy(obj[i]);

        return newObj;
    }

    if (obj instanceof Object)
    {
        let newObj = {...obj};

        for (let k in obj)
            newObj[k] = treeCopy(obj[k]);

        return newObj;
    }

    return obj;
}