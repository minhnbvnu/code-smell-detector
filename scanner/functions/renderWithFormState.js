function renderWithFormState(renderFn, ...useFormStateArgs) {
  const formStateRef = { current: null };

  const Wrapper = ({ children }) => {
    const [state, inputs] = useFormState(...useFormStateArgs);
    formStateRef.current = state;
    return children([state, inputs]);
  };

  const { container } = render(<Wrapper>{renderFn}</Wrapper>);

  const fire = (type, target, node = container.firstChild) => {
    fireEvent[type](node, { target });
  };

  return {
    blur: (...args) => fire('blur', ...args),
    change: (...args) => fire('change', ...args),
    click: (...args) => fire('click', ...args),
    formState: formStateRef,
    root: container.firstChild,
  };
}