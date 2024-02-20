function vec3_var_gen(x=0, y, z,name=null) { 
  return ()=> Var( Vec3(x, y, z), name ) 
}