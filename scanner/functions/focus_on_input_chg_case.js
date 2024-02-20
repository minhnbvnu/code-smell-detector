function focus_on_input_chg_case(){
    $('#goto_case_number_input').focus();
    $('#goto_case_number_input').keydown(function(event) {
        if (event.keyCode == 13) {
             goto_case_number();
             return false;
        }
  });
}