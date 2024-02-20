function array_sort(comparefn)
{
    var o = this;
    var len = o.length;

    if (comparefn === undefined)
        comparefn = array_sort_comparefn_default;

    /* Iterative mergesort algorithm */

    if (len >= 2)
    {
        /* Sort pairs in-place */

        for (var start=((len-2)>>1)<<1; start>=0; start-=2)
        {
            if (comparefn(o[start], o[start+1]) > 0)
            {
                var tmp = o[start];
                o[start] = o[start+1];
                o[start+1] = tmp;
            }
        }

        if (len > 2)
        {
            /*
             * For each k>=1, merge each pair of groups of size 2^k to
             * form a group of size 2^(k+1) in a second array.
             */

            var a1 = o;
            var a2 = new Array(len);

            var k = 1;
            var size = 2;

            do
            {
                var start = ((len-1)>>(k+1))<<(k+1);
                var j_end = len;
                var i_end = start+size;

                if (i_end > len)
                    i_end = len;

                while (start >= 0)
                {
                    var i = start;
                    var j = i_end;
                    var x = start;

                    for (;;)
                    {
                        if (i < i_end)
                        {
                            if (j < j_end)
                            {
                                if (comparefn(a1[i], a1[j]) > 0)
                                    a2[x++] = a1[j++];
                                else
                                    a2[x++] = a1[i++];
                            }
                            else
                            {
                                while (i < i_end)
                                    a2[x++] = a1[i++];
                                break;
                            }
                        }
                        else
                        {
                            while (j < j_end)
                                a2[x++] = a1[j++];
                            break;
                        }
                    }

                    j_end = start;
                    start -= 2*size;
                    i_end = start+size;
                }

                var t = a1;
                a1 = a2;
                a2 = t;

                k++;
                size *= 2;
            } while (len > size);

            if ((k & 1) === 0)
            {
                /* Last merge was into second array, so copy it back to o. */

                for (var i=len-1; i>=0; i--)
                    o[i] = a1[i];
            }
        }
    }

    return o;
}