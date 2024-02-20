function secondary_demod_listbox_update()
{
    secondary_demod_listbox_updating = true;
    $("#openwebrx-secondary-demod-listbox").val((secondary_demod)?secondary_demod:"none");
    console.log("update");
    secondary_demod_listbox_updating = false;
}