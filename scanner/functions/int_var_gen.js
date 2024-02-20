function int_var_gen(x,name=null) { 
  let output = ()=> {
    let out = Var( int(x), name, 'int' ) 
    return out
  }

  return output
}