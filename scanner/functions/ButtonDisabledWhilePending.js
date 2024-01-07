function ButtonDisabledWhilePending({action, children}) {
  const {pending} = useFormStatus();
  return h(
    'button',
    {
      disabled: pending,
      formAction: action,
    },
    children
  );
}