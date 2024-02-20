function testState () {
          cy
            .get('@firstTodo')
            .should('contain', TODO_ITEM_ONE)
            .and('have.class', 'completed')
          cy
            .get('@secondTodo')
            .should('contain', TODO_ITEM_TWO)
            .and('not.have.class', 'completed')
        }