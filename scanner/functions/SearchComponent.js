function SearchComponent({ indices, collapse, hitsAsGrid }) {
  const ref = createRef();

  const [query, setQuery] = useState(``);

  const [focus, setFocus] = useState(false);

  useClickOutside(ref, () => setFocus(false));
  const displayResult = query.length > 0 && focus ? 'showResults' : 'hideResults';
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      <HitsWrapper
        className={'hitWrapper ' + displayResult}
        show={query.length > 0 && focus}
        asGrid={hitsAsGrid}
      >
        {indices.map(({ name, title, hitComp, type }) => {
          return (
            <Index key={name} indexName={name}>
              <Results />
              <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
            </Index>
          );
        })}
        <PoweredBy />
      </HitsWrapper>
      <Configure hitsPerPage={5} />
    </InstantSearch>
  );
}