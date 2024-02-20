function ReadInReducer(props) {
        let [count, dispatch] = React.useReducer(() => readContext(Context));
        if (count !== 42) {
          dispatch();
        }
        return <Text text={count} />;
      }