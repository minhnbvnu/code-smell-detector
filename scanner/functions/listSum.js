function listSum(lst) {
    if (lst == null)
        return 0;
    else
        return lst.val + listSum(lst.next);
}