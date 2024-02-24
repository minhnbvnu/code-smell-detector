function batchNormalization_(e,t,n,r,o,a){void 0===r&&(r=.001);var i,s,u,l=convertToTensor(e,"x","batchNormalization"),c=convertToTensor(t,"mean","batchNormalization"),p=convertToTensor(n,"variance","batchNormalization");null!=o&&(i=convertToTensor(o,"scale","batchNormalization")),null!=a&&(s=convertToTensor(a,"offset","batchNormalization")),assert(c.rank===p.rank,"Batch normalization gradient requires mean and variance to have equal ranks."),assert(null==s||c.rank===s.rank,"Batch normalization gradient requires mean and offset to have equal ranks."),assert(null==i||c.rank===i.rank,"Batch normalization gradient requires mean and scale to have equal ranks."),u=0===l.rank||1===l.rank?l.as4D(1,1,1,l.size):2===l.rank?l.as4D(1,1,l.shape[0],l.shape[1]):3===l.rank?l.as4D(1,l.shape[0],l.shape[1],l.shape[2]):l;return ENV.engine.runKernel(function(e){return e.batchNormalization(u,batchnormReshape4D(c),batchnormReshape4D(p),r,batchnormReshape4D(i),batchnormReshape4D(s))},{$x:l,$mean:c,$variance:p,$scale:i,$offset:s},function(e){var t=null==i?scalar(1):i,n=getReductionAxes(c.shape,u.shape),o=[];if(1===c.rank){for(var a=0;a<u.shape.length-1;++a)o.push(u.shape[a]);o.push(1);}var s=l.sub(c),d=e.mul(t),h=rsqrt(p.add(scalar(r))),f=h.mul(h).mul(h).mul(scalar(-.5));return {$x:function(){return 1===c.rank?e.mul(tile(h.as4D(1,1,1,c.shape[0]),o)).mul(t).reshape(l.shape):e.mul(h).mul(t).reshape(l.shape)},$mean:function(){var e=h.mul(scalar(-1)).mul(d);return 1===c.rank&&(e=e.sum(n)),e.reshape(c.shape)},$variance:function(){var e=f.mul(s).mul(d);return 1===c.rank&&(e=e.sum(n)),e.reshape(c.shape)},$scale:function(){var t=s.mul(h),r=e.mul(t);return 1===c.rank&&(r=r.sum(n)),r.reshape(c.shape)},$offset:function(){var t=e;return 1===c.rank&&(t=t.sum(n)),t.reshape(c.shape)}}}).reshape(l.shape)}