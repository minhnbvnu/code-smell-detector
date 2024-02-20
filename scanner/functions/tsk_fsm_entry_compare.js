function tsk_fsm_entry_compare(o_entry1, o_entry2) {
    if (o_entry1 && o_entry2) {
        if (o_entry1.i_state_from == tsk_fsm.prototype.__i_state_any) {
            return +20;
        }
        else if (o_entry2.i_state_from == tsk_fsm.prototype.__i_state_any) {
            return -20;
        }

        // put "any" actions at the bottom (weak)
        if (o_entry1.i_action == tsk_fsm.prototype.__i_action_any) {
            return +10;
        }
        else if (o_entry2.i_action == tsk_fsm.prototype.__i_action_any) {
            return -10;
        }
        // put conditions first
        return o_entry1.fn_condition ? -1 : (o_entry2.fn_condition ? 1 : 0);
    }
   
    return 0
}