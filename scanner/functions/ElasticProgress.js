function ElasticProgress(target,options){
  if(!isSet(options)){
    options={};
  };
  this.options=extend(
    {},
    defaultOptions,
    options
  );
  // shortcut to options
  options=this.options;

  this.target=target;

  //// setup options
  // format align in case it's a string
  // if(typeof options.align=="string"){
  //   switch(options.align){
  //     case "left":
  //       options.align=0;
  //       break;
  //     case "right":
  //       options.align=1;
  //       break;
  //     default:
  //       options.align=0.5;
  //       break;
  //   }
  // }
  // ... however, align is not supported for now
  options.align=0.5;

  // width by default is the element's width...
  if(options.width <= -1){
    options.width = target.clientWidth;
  }else{
    // otherwise it sets the element's width
    target.style.width = options.width+"px";
  }

  // buttonSize by default is the element's height
  if(options.buttonSize <= -1){
    options.buttonSize = target.clientHeight;
  }else{
    // otherwise it sets the element's height
    target.style.height = options.buttonSize+"px";
  }

  var progressbar=target.getAttribute("data-progressbar");
  if(progressbar!=null){
    options.progressbar=progressbar;
  }

  var progressbarLabel=target.getAttribute("data-progressbar-label");
  if(progressbarLabel!=null){
    options.progressbarLabel=progressbarLabel;
  }

  this.graphics={};
  this.state=clone(this.state);

  this.init();
}