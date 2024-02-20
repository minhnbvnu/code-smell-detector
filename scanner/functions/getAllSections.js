function getAllSections()
{
  memo = []
  $("div.notes-section").each(function() {
    section = $(this).attr('class').split(' ').filter(function(x) { return x != 'notes-section'; })[0];
    if(! memo.includes(section)) { memo.push(section) }
  });
  return memo
}