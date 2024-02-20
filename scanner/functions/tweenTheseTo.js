function tweenTheseTo(groups,options){
  var dur=1;
  var value=0;
  if(isSet(options.duration)){
    dur=options.duration;
    delete options.duration;
  }
  if(isSet(options.value)){
    value=options.value;
    delete options.value;
  }

  groups.forEach(function(item){
    var props={};
    if(isSet(item.prop)){
      item.props=item.prop;
    }
    if(!Array.isArray(item.props)){
      item.props=[item.props];
    }
    item.props.forEach(function(propName){
      props[propName]=value;
    });

    Tween.to(item.obj,dur,extend(
      props,
      options
    ));
  });
}