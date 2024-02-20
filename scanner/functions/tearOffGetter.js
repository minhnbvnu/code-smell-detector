function tearOffGetter(a,b,c,d,e){var u=null
return e?function(f){if(u===null)u=H.oy(this,a,b,c,false,true,d)
return new u(this,a[0],f,d)}:function(){if(u===null)u=H.oy(this,a,b,c,false,false,d)
return new u(this,a[0],null,d)}}