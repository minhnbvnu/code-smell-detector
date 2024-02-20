function LazyCompute(props) {
        const computed = useMemo(props.compute);
        return <Text text={computed} />;
      }