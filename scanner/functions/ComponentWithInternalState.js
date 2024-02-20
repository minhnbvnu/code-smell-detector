function ComponentWithInternalState() {
      const [state, setState] = useState(1);
      const [, { text }] = useFormState(null, {
        onBlur: () => {
          onInputChange(state);
          setState(state + 1);
        },
        onChange: () => {
          onInputChange(state);
          setState(state + 1);
        },
      });
      return <input {...text('name')} />;
    }