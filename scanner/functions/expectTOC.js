function expectTOC($, addFile) {

  var file1 = addFile ? "first-chapter.html" : "";
  var file2 = addFile ? "second-chapter.html" : "";

  var level1 = $('nav > ol > li');
  var level2 = $('nav > ol > li > ol > li');
  expect(level1.find('> a').eq(0).text()).toEqual("First Heading")
  expect(level1.find('> a').eq(0).attr('href')).toEqual(file1 + "#first-heading-4WbKTev")
    expect(level2.find('> a').eq(0).text()).toEqual("Sub Heading")
    expect(level2.find('> a').eq(0).attr('href')).toEqual(file1 + "#sub-heading-YlG0T2j")
    expect(level2.find('> a').eq(1).text()).toEqual("Links")
    expect(level2.find('> a').eq(1).attr('href')).toEqual(file1 + "#links-5vqdTZW")
  expect(level1.find('> a').eq(1).text()).toEqual("Second Heading")
  expect(level1.find('> a').eq(1).attr('href')).toEqual(file2 + "#second-heading-8vy0FZP")
    expect(level2.find('> a').eq(2).text()).toEqual("Second section 1")
    expect(level2.find('> a').eq(2).attr('href')).toEqual(file2 + "#second-section-1-NP3ZF5b")
}