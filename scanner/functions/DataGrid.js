function DataGrid(patient) {
  const {
    notes,
    gender,
    ageEstimate,
    state,
    city,
    district,
    status,
    reportedOn,
    sources,
  } = patient

  const genderInitCap = gender.charAt(0).toUpperCase() + gender.slice(1)

  return (
    <Container>
      <DoubleCell>
        <Cell name="Gender">{gender ? genderInitCap : '-'}</Cell>
        <Cell name="Age">{ageEstimate ? ageEstimate : '-'}</Cell>
      </DoubleCell>
      <DoubleCell>
        <Cell name="State">{state ? state : '-'}</Cell>
        <Cell name="District/City">{city ? city : district}</Cell>
      </DoubleCell>
      <Cell name="Status">{status}</Cell>
      <Cell name="Reported On">{reportedOn}</Cell>
      <Cell name="Notes">{notes}</Cell>
      <Cell name="Sources">
        {sources
          ? sources.map((source, i) => (
              <div key={i}>
                <div style={{ display: 'inline-block' }}>{i + 1}.&nbsp;</div>
                <A
                  href={source}
                  target="_blank"
                  rel="noopener noreferer"
                  key={i}
                >
                  {_.truncate(source, {
                    length: 40,
                    separator: /,? +/,
                  })}
                </A>
              </div>
            ))
          : null}
      </Cell>
    </Container>
  )
}