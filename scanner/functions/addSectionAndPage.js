function addSectionAndPage() {
  let description = path.basename(this.file, '.js');
  let property = this.block.property;
  let fn = this.block.function;
  let clas = this.block.class;

  let sectionName = property ? property.name : fn ? fn : clas ? clas : description;

  // TODO: temporary fix for `length` name (zero-width space added to end)
  if (sectionName === 'length') {
    sectionName = 'length​';
  }

  // don't add multiple section tags
  let section = this.comment.tags.find(tag => tag.tag === 'section');
  if (!section) {
    this.comment.tags.push({
      tag: 'section',
      description: sectionName,
      type: '',
      name: '',
      source: `@section ${sectionName}`
    });
  }

  // don't add multiple page tags
  let page = this.comment.tags.find(tag => tag.tag === 'page');
  if (!page) {
    this.comment.tags.push({
      tag: 'page',
      description: getPageName(description),
      type: '',
      name: '',
      source: `@page ${description}`
    });
  }

  this.comment.description = this.comment.description;
}