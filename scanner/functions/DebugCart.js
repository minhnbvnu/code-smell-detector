function DebugCart(props) {
  const cart = useShoppingCart((state) => state)
  const cartPropertyRows = Object.entries(cart)
    .filter(([, value]) => typeof value !== 'function')
    .map(([key, value]) => (
      <tr key={key}>
        <td>{key}</td>
        <td>
          {typeof value === 'object' ? (
            <button onClick={() => console.log(value)}>Log value</button>
          ) : (
            JSON.stringify(value)
          )}
        </td>
      </tr>
    ))

  return (
    <div
      style={{
        position: 'fixed',
        top: 50,
        right: 50,
        backgroundColor: '#eee',
        textAlign: 'left',
        maxWidth: 300,
        padding: 20,
        borderSpacing: '25px 5px',
        overflow: 'auto'
      }}
      {...props}
    >
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{cartPropertyRows}</tbody>
      </table>
    </div>
  )
}