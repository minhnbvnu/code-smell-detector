function promise_user_list_data_for_rendering(args) {
  let
    company = args[0],
    users_info = args[1];

  const usersInfoForRendering = users_info.map(ui => ({
    user_id                               : ui.user_row.id,
    user_email                            : ui.user_row.email,
    user_name                             : ui.user_row.name,
    user_lastname                         : ui.user_row.lastname,
    user_full_name                        : ui.user_row.full_name(),
    department_id                         : ui.user_row.department.id,
    department_name                       : ui.user_row.department.name,
    is_admin                              : ui.user_row.admin,
    number_of_days_available_in_allowance : ui.number_of_days_available_in_allowance,
    number_of_days_taken_from_allowance   : ui.user_row.calculate_number_of_days_taken_from_allowance(),
    is_active                             : ui.user_row.is_active(),
  }));

  const sortedUsersInfoForRendering = usersInfoForRendering
    .sort((a, b) => sorter(a.user_lastname, b.user_lastname));

  return Promise.resolve([company, sortedUsersInfoForRendering]);
}