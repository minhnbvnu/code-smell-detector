function secondary_demod_listbox_changed()
{
    if(secondary_demod_listbox_updating) return;
    switch ($("#openwebrx-secondary-demod-listbox")[0].value)
    {
        case "none":
            demodulator_analog_replace_last();
            break;
        case "bpsk31":
            demodulator_digital_replace('bpsk31');
            break;
        case "rtty":
            demodulator_digital_replace('rtty');
            break;
    }
}