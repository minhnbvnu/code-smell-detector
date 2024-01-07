function selectEnd( node ){
    $body.classList.add('has-end', 'calc');

    end = node;

    cy.startBatch();

    end.addClass('end');

    setTimeout(function(){
      var aStar = cy.elements().aStar({
        root: start,
        goal: end,
        weight: function( e ){
          if( e.data('is_walking') ){
            return 0.25; // assume very little time to walk inside stn
          }

          return e.data('is_bullet') ? 1 : 3; // assume bullet is ~3x faster
        }
      });

      if( !aStar.found ){
        $body.classList.remove('calc');
        clear();

        cy.endBatch();
        return;
      }

      cy.elements().not( aStar.path ).addClass('not-path');
      aStar.path.addClass('path');

      cy.endBatch();

      $body.classList.remove('calc');
    }, 300);
  }