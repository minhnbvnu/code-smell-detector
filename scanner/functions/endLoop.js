function endLoop () {
                col.el.removeClass('drag');
                col.inMomentum = false;
                col.topDummy.hide();
                if (col.bottomSwitch) col.bottomSwitch.hide();
            }