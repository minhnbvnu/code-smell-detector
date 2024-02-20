function reducerA(state, action) {
          switch (action) {
            case 'increment':
              return state + 1;
            case 'reset':
              return 0;
          }
        }