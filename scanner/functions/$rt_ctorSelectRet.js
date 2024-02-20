function $rt_ctorSelectRet(retVal, thisVal)
{
    if ($ir_is_undef(retVal))
        return thisVal;

    return retVal;
}