function zQ({inputs:n,attrs:t,backend:e}){let{x:i}=n,r=hn+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,o=new jn(i.shape,r);return e.runWebGLProgram(o,[i],i.dtype)}