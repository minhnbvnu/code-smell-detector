function runSearchTests(br) {
  //building mock response  for successful and unsuccessful search
  const mockFound = RequestMock()
    .onRequestTo(SEARCH_INSIDE_URL_RE )
    .respond(mockResponseFound, 202);

  const mockNotFound = RequestMock()
    .onRequestTo(SEARCH_INSIDE_URL_RE )
    .respond(mockResponseNotFound, 202);


  test
    .requestHooks(mockFound)('Search - successful search', async t => {
      const nav = br.nav;

      //assuring that the search bar is enabled
      await t.expect(nav.searchIcon.visible).ok();
      await t.click(nav.searchIcon);

      //testing search for a word found in the book
      await t.selectText(nav.searchBox).pressKey('delete');
      // FIXME: Why is it only typing every other letter?!?!
      await t.typeText(nav.searchBox, TEST_TEXT_FOUND.split('').join('_'));
      await t.pressKey('enter');

      await t.expect(nav.searchPin.exists).ok();
      await t.expect(nav.searchPin.child('.BRquery').child('main').exists).ok();
      await t.expect(nav.searchPin.child('.BRquery').child('main').innerText).contains(TEST_TEXT_FOUND);
      await t.expect(nav.searchNavigation.exists).ok();
      await t.expect(nav.searchNavigation.find('[data-id="resultsCount"]').exists).ok();
      await t.expect(nav.searchNavigation.find('[data-id="resultsCount"]').innerText).contains(SEARCH_MATCHES_LENGTH);

      //checking url
      const getPageUrl = ClientFunction(() => window.location.href.toString());
      await t.expect(getPageUrl()).contains(TEST_TEXT_FOUND);

      //checks clicking on first search pin opens correct page
      await t.click(nav.searchPin);
      await t.expect(getPageUrl()).contains(PAGE_FIRST_RESULT);

      //checks highlight on result page is visible
      const highlight = br.shell.find(".searchHiliteLayer rect");
      await t.expect(highlight.visible).ok();

    });


  test
    .requestHooks(mockNotFound)('Search - unsuccessful search', async t => {
      const nav = br.nav;

      //assuring that the search bar is enabled
      await t.expect(nav.searchIcon.visible).ok();
      await t.click(nav.searchIcon);

      //testing search for a word not found in the book
      await t.selectText(nav.searchBox).pressKey('delete');
      // FIXME: Why is it only typing every other letter?!?!
      await t.typeText(nav.searchBox, TEST_TEXT_NOT_FOUND.split('').join('_'));
      await t.pressKey('enter');
      await t.expect(nav.searchPin.child('.BRquery').child('main').withText(TEST_TEXT_NOT_FOUND).exists).notOk();

      const getPageUrl = ClientFunction(() => window.location.href.toString());
      await t.expect(getPageUrl()).contains(TEST_TEXT_NOT_FOUND);
    });


}