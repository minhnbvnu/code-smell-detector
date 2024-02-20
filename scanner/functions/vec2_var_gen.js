function vec2_var_gen(x, y,name=null) { 
  return ()=> Var( Vec2(x, y), name  ) 
}