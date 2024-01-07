function bindRouters(){

    var $clear = $('#clear');

    cy.on('tap pan zoom', function(e){
      if(e.target === cy){
        removeTippy();
      }
    });

    cy.on('tap', 'node', function(e){
      var node = e.target;

      var start = h('button', { id: 'start' }, 'START');

      start.addEventListener('click', function(){
        var n = cy.$('node:selected');

        selectStart( n );

        removeTippy();
      });

      var end = h('button', { id: 'end', }, 'END');

      end.addEventListener('click', function(){
        var n = cy.$('node:selected');

        selectEnd( n );

        removeTippy();
      });

      var html = h('div', { className: 'select-buttons' }, [ start, end]);

      makeTippy(node, html);
    });

    /*
    cy.nodes().qtip({
      content: {
        text: function(){
          var $ctr = $('<div class="select-buttons"></div>');
          var $start = $('<button id="start">START</button>');
          var $end = $('<button id="end">END</button>');

          $start.on('click', function(){
            var n = cy.$('node:selected');

            selectStart( n );

            n.qtip('api').hide();
          });

          $end.on('click', function(){
            var n = cy.$('node:selected');

            selectEnd( n );

            n.qtip('api').hide();
          });

          $ctr.append( $start ).append( $end );

          return $ctr;
        }
      },
      show: {
        solo: true
      },
      position: {
        my: 'top center',
        at: 'bottom center',
        adjust: {
          method: 'flip'
        }
      },
      style: {
        classes: 'qtip-bootstrap',
        tip: {
          width: 16,
          height: 8
        }
      }
    });
    */

    $clear.addEventListener('click', clear);
  }