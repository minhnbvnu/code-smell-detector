function addItemExample() {
  const { framework } = useDocsState()
  if (framework === 'react') {
    return 'react'
  }

  if (framework === 'html+js') {
    return <code>Some html+js code</code>
  }
}