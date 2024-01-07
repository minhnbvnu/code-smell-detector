function a6($,z){var v=new Array(z.v),i=16+4*z.v;
for(var y=0,A=16;y<z.v;A+=4){var B=UTIF._binBE.readUint($,A);v[y]=$.slice(i,i+B);v[y].l=0;v[y].s=0;i+=B;
y++}if(i!=$.length)throw"Invalid data";return v}