function zX(n){let{inputs:t,backend:e,attrs:i}=n,{x:r}=t,{k:o,sorted:s}=i;ut(r,"topk");let a=e.data.get(r.dataId).values,[l,c]=w1(a,r.shape,r.dtype,o,s);return[e.makeTensorInfo(l.shape,l.dtype,l.values),e.makeTensorInfo(c.shape,c.dtype,c.values)]}