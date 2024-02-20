function Primitives(context){
  if (this instanceof Primitives){
    this.context = context
    for (var i=0;i<names.length;i++){
      if (!this.context[names[i]]){
        this.context[names[i]] = wrap(primitives[i])
      }
    }
  } else {
    return new Primitives(context)
  }
}