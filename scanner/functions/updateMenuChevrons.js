function updateMenuChevrons() {
  $(".navSection + ul:not(:visible)")
      .siblings('a')
      .children('i')
      .attr('class', 'fa fa-angle-down');

  $(".navSection + ul:visible")
      .siblings('a')
      .children('i')
      .attr('class', 'fa fa-angle-up');
}