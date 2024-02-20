function testUnknownAttributeAssignment(givenValue, expectedDOMValue) {
    const el = document.createElement('div');
    ReactDOM.render(<div unknown="something" />, el);
    expect(el.firstChild.getAttribute('unknown')).toBe('something');
    ReactDOM.render(<div unknown={givenValue} />, el);
    expect(el.firstChild.getAttribute('unknown')).toBe(expectedDOMValue);
  }