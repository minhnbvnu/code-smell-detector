function chart_title(args){'use strict';var currentTitle=$(args.target).find('h2.chart_title');if(args.title&&args.title!==currentTitle.text())
currentTitle.remove();else
return;if(args.target&&args.title){var newTitle;var optional_question_mark=(args.description)?'<i class="fa fa-question-circle fa-inverse"></i>':'';$(args.target).prepend('<h2 class="chart_title">'
+args.title+optional_question_mark+'</h2>');if(args.description){newTitle=$(args.target).find('h2.chart_title');newTitle.popover({html:true,animation:false,content:args.description,trigger:'hover',placement:'top',container:newTitle});}}
if(args.error){error(args);}}