function users_list_as_csv(args) {
  let users_info = args.users_info,
      company = args.company,
      res = args.res;

  // Compose file name
  res.attachment(
    company.name_for_machine()
      + '_employees_on_'
      + company.get_today().format('YYYY_MMM_DD')
      + '.csv'
  );

  // Compose result CSV header
  let content = [['email', 'lastname', 'name', 'department', 'remaining allowance', 'days used']];

  // ... and body
  users_info.forEach(ui => {
    content.push([
      ui.user_email,
      ui.user_lastname,
      ui.user_name,
      ui.department_name,
      ui.number_of_days_available_in_allowance,
      ui.number_of_days_taken_from_allowance
    ]);
  });

  return csv.stringifyAsync( content )
    .then(csv_data_string => res.send(csv_data_string));
}