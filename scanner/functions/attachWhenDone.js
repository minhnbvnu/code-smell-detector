function attachWhenDone(from){var loadsrc=options.useImg||from.src;var img=new Image();
img.onload=function(){$.Jcrop(from,options)};img.src=loadsrc}