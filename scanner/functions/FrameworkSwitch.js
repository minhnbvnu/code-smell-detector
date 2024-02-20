function FrameworkSwitch({ children }) {
  const { updateDocsFramework, framework } = useDocsState()

  return (
    <>
      <section>
        <button onClick={() => updateDocsFramework('react')} aria-label="React">
          React
        </button>
        <button
          onClick={() => updateDocsFramework('html+js')}
          aria-label="Html+JS"
        >
          Html+JS
        </button>
      </section>
      {children}
    </>
  )
}