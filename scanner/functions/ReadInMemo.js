function ReadInMemo(props) {
        let count = React.useMemo(() => readContext(Context), []);
        return <Text text={count} />;
      }