function Form({action, children}) {
  const [isPending, setIsPending] = React.useState(false);
  return h(
    ErrorBoundary,
    null,
    h(
      'form',
      {
        action: action,
      },
      h(
        'label',
        {},
        'Name: ',
        h('input', {
          name: 'name',
        })
      ),
      h(
        'label',
        {},
        'File: ',
        h('input', {
          type: 'file',
          name: 'file',
        })
      ),
      h('button', {}, 'Say Hi'),
      h(Status, {})
    )
  );
}