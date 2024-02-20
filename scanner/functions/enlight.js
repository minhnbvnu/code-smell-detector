function enlight(elements, elementOptions={}){
    try {
        // single element or group to highlight ?
        if (!Array.isArray(elements)){
            // to array 
            elements = [elements];
        }

        // empty dataset ?
        if (elements.length === 0){
            return false;
        }

        // remove highlighted codeblock ?
        if (elementOptions === false){
            // try to remove highlighted codeblock referenced by origin element
            return _elementManager.remove(elements[0]);
        }

        // already highlighted ?
        if (_dom.hasClass(elements[0], 'enlighter-origin')){
            return false;
        }
        
        // prepare elements, extract code
        const dataset = elements.map(function(element){
            // extract + parse params
            const params = _optionReader.parse(element, elementOptions);

            // extract code
            const code = getRawCodeFromElement(element, params);

            // hide the element
            _dom.addClass(element, 'enlighter-origin');

            // render the 
            return {element, code, params}
        });

        // render code
        const wrapper = _engine.render(dataset);

        // add element before the original container
        _dom.insertBefore(elements[0], wrapper);

        // store element reference
        _elementManager.add(elements, wrapper);

        // ok
        return true;
        

    // Global Error Handling (FATAL ERRORS)
    }catch (err){
        _logger.error('EnlighterJS Internal Error:', err);
        return false;
    }
}