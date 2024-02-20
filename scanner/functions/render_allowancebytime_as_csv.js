function render_allowancebytime_as_csv(args) {
  let
    res               = args.res,
    team_view_details = args.team_view_details,
    company           = args.company,
    start_date        = args.start_date,
    end_date          = args.end_date;

  // Compose file name
  res.attachment(
    company.name_for_machine()
      + '_employee_allowances_between'
      + start_date.format('YYYY_MM')
      + '_and_'
      + end_date.format('YYYY_MM')
      + '.csv'
  );

  // Compose result CSV header
  let content = [
    ['email', 'last name', 'name']
    // Add dynamic list of Leave Types
    .concat(
      team_view_details.users_and_leaves.length > 0
        ? team_view_details.users_and_leaves[0].statistics.leave_type_break_down.pretty_version.map(it => it.name)
        : []
    )
    .concat(['days deducted from allowance'])
  ];

  // ... and body
  team_view_details.users_and_leaves.forEach(ul => {
    content.push(
      [
        ul.user.email,
        ul.user.lastname,
        ul.user.name,
      ]
      // Dynamic part of the column list
      .concat( ul.statistics.leave_type_break_down.pretty_version.map(it => it.stat))
      .concat([ul.statistics.deducted_days])
    );
  });

  return csv.stringifyAsync( content )
    .then(csv_data_string => res.send(csv_data_string));
}