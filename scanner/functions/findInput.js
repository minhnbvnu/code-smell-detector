function findInput(element, containerID){
            //element is the current property item's container
            //containerID is the new review container to right
            $(element).find(':input').each(function(){
                switch($(this).context.type){
                    case "text":
                        $('#'+containerID).append($(this).context.value ? ('<div><span class="label">' + $(this).context.dataset.displayName  + ':</span> <span class="value">' + $(this).context.value) + '</span></div>' : ('<div><span class="label">'+ $(this).context.dataset.displayName + ':</span><span class="value">' + "NULL </span></div>"))
                        break
                    case "textarea":
                        $('#'+containerID).append($(this).context.value ? ('<div><span class="label">' + $(this).context.dataset.displayName  + ':</span> <span class="value">' + $(this).context.value) + '</span></div>' : ('<div><span class="label">'+ $(this).context.dataset.displayName + ':</span><span class="value">' + "NULL </span></div>"))
                        break
                    case "radio":
                        if($(this).context.checked)
                            $('#'+containerID).append(('<div><span class="label">' + $(this).context.dataset.displayName + ': ' + $(this).context.offsetParent.textContent) + ':</span> <span class="value">' + $(this).context.checked + '</span></div>')
                        break
                    case "checkbox":
                        $('#'+containerID).append(('<div><span class="label">' + $(this).context.dataset.displayName + ':</span> <span class="value">' + $(this).context.checked) + '</span></div>')
                        break
                    case "select-one":
                        $('#'+containerID).append(('<div><span class="label">' + $(this).context.dataset.displayName + ':</span> <span class="value">' + $(this).context.value)  + '</span></div>')
                    default:
                        break
                }
            })
        }