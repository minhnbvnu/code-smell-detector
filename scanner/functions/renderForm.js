function renderForm(form) {
  if(typeof(form) == 'string') {
    form = $('form#'+form);
  }
  var action = form.attr("action");
  $.getJSON(action, function( data ) {
    //console.log(data);
    form.children('.element').each(function(index, element) {
      var key = $(element).attr('data-name');

      // add a counter label if we haven't already
      if( $(element).next('.count').length === 0 ) {
        $(element).after($('<h1>').addClass('count'));
      }

      $(element).find('ul > li > *').each(function() {
        $(this).parent().parent().before(this);
      });
      $(element).children('ul').each(function() {
        $(this).remove();
      });

      // replace all input widgets with divs for the bar chart
      $(element).children(':input').each(function(index, input) {
        switch( $(input).attr('type') ) {
          case 'text':
          case 'button':
          case 'submit':
          case 'textarea':
            // we don't render these
            $(input).parent().remove();
            break;

          case 'radio':
          case 'checkbox':
            // Just render these directly and migrate the label to inside the span
            var label   = $(input).next('label');
            var text    = label.text();
            var classes = $(input).attr('class');

            if(text.match(/^-+$/)) {
              $(input).remove();
            } else {
              var resultDiv = $('<div>')
                .addClass('item')
                .attr('data-value', $(input).attr('value'))
                .append($('<span>').addClass('answer').text(text))
                .append($('<div>').addClass('bar'));

              if (classes) {
                resultDiv.addClass(classes);
              }
              $(input).replaceWith(resultDiv);
            }
            label.remove();
            break;

          default:
            // select doesn't have a type attribute... yay html
            // poke inside to get options, then render each as a span and replace the select
            var parent = $(input).parent();

            $(input).children('option').each(function(index, option) {
              var text    = $(option).text();
              var classes = $(option).attr('class');

              if(! text.match(/^-+$/)) {
                var resultDiv = $('<div>')
                  .addClass('item')
                  .attr('data-value', $(option).val())
                  .append($('<span>').addClass('answer').text(text))
                  .append($('<div>').addClass('bar'));
                if (classes) {
                  resultDiv.addClass(classes);
                }
                parent.append(resultDiv);
              }
            });
            $(input).remove();
            break;
        }
      });

      // only start counting and sizing bars if we actually have usable data
      if(data) {
        // number of unique responses
        var total = 0;
        // double loop so we can handle re-renderings of the form
        $(element).find('.item').each(function(index, item) {
          var name = $(item).attr('data-value');

          if(key in data) {
            var count = data[key]['responses'][name];

            total = data[key]['count'];
          }
        });

        // insert the total into the counter label
        $(element).next('.count').each(function(index, icount) {
          $(icount).text(total);
        });

        var oldTotal = $(element).attr('data-total');
        $(element).find('.item').each(function() {
          var name     = $(this).attr('data-value');
          var oldCount = $(this).attr('data-count');

          if(key in data) {
            var count = data[key]['responses'][name] || 0;
          }
          else {
            var count = 0;
          }

          if(count != oldCount || total != oldTotal) {
            var percent = (total) ? ((count/total)*100) + '%' : '0%';

            $(this).attr('data-count', count);
            $(this).find('.bar').animate({width: percent});
          }
        });

        // record the old total value so we only animate when it changes
        $(element).attr('data-total', total);
      }

      $(element).addClass('rendered');
    });

  });
}