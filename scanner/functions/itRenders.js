function itRenders(desc, testFn) {
    it(`renders ${desc} with server string render`, () => testFn(serverRender));
    it(`renders ${desc} with server stream render`, () => testFn(streamRender));
    itClientRenders(desc, testFn);
  }