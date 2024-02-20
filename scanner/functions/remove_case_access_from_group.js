function remove_case_access_from_group(group_id, case_id, on_finish) {
     remove_cases_access_group(group_id, [case_id], on_finish);
}