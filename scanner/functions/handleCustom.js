function handleCustom(ed,o){each(explode(s.custom_elements),function(v){var n;if(v.indexOf('~')===0){v=v.substring(1);n='span';}else n='div';o.content=o.content.replace(new RegExp('<('+v+')([^>]*)>','g'),'<'+n+' mce_name="$1"$2>');o.content=o.content.replace(new RegExp('</('+v+')>','g'),'</'+n+'>');});}