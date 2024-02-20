function onMidiMessage(evt)
        {
            var str = '';
            for (var i = 0; i < evt.data.length; i++)
            {
                str += "0x" + evt.data[i].toString(16) + " ";
            }
            console.log(str);

            // Send the device name and the data to callbacks
            this.trigger('midimessage', deviceId, evt.data);
        }