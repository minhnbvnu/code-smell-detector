function handleRefs(){for(var _len4=arguments.length,refs=new Array(_len4),_key4=0;_key4<_len4;_key4++)refs[_key4]=arguments[_key4];return function(node){refs.forEach((function(ref){"function"==typeof ref?ref(node):ref&&(ref.current=node)}))}}