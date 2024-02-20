function promise_to_group_leaves(leaves) {

  if ( ! leaves ) {
    throw new Error('Did not get "leaves" in promise_to_group_leaves');
  }

  let grouped_leaves = {};

  // Group leaves by years
  leaves.forEach(leave => {
    let year = moment.utc(leave.get_start_leave_day().date).format('YYYY');

    if ( ! grouped_leaves[year]) {
      grouped_leaves[ year ] = {
        year : year,
        leaves : [],
      };
    }

    grouped_leaves[ year ].leaves.push(leave);
  });

  // Sort year groups
  grouped_leaves = _
    .values( grouped_leaves )
    .sort((a,b) => a.year > b.year ? -1 : a.year < b.year ? 1 : 0);

  // Calculate total allowance deduction per group
  grouped_leaves.forEach(group => {
    group.total_deduction = _.reduce(
      group.leaves.map(leave => leave.get_deducted_days_number()),
      (memo, number) => memo + number,
      0
    );
  });

  return Promise.resolve(grouped_leaves);
}