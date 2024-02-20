function reducerB(state, action) {
          switch (action) {
            case 'increment':
              return state + 10;
            case 'reset':
              return 0;
          }
        }