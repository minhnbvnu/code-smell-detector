function updateBlockHtml(element, html, opts) {

    	if(element.innerHTML == html)
    	{
    		return;
    	}
    	
    	var options = Library.objUtils.extend({}, {
    		domdiff : false
    	}, opts);

    	Library.touch.trigger(element, 'block_before_render');
    	
    	if (options.domdiff) {
    		
    		element.innerHTML = element.innerHTML;
    		fw.domdiff.convert(html, element);
    		
    	} else {
    		
    		element.innerHTML = html;
    		
    	}
    	
    	Library.touch.trigger(element, 'block_after_render');
    }