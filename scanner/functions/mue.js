function mue(e,t){let r;if(t)return t;try{r=kT.lstatSync(e)}catch{return"file"}return r&&r.isDirectory()?"dir":"file"}