function keyDownHandler(e) {
    if (!modal_opened && game_mode_switch) {
        e.preventDefault();
        if(e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
        if(e.key == "Up" || e.key == "ArrowUp") {
            upPressed = true;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") {
            downPressed = true;
        }
        else if(e.keyCode == 83) {
            if (shuffle) {
                shuffle = false;
                $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Disable shuffle</div>');
            }
            else {
                shuffle = true
                $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Enable shuffle</div>');
            }
        }
        else if(e.keyCode == 32) {
            shot = true
        }
        else if(e.keyCode == 78) {
            switchNamespace();
        }
        else if(e.keyCode == 72) {
            if (help) {
                help = false;
            }
            else {
                help = true
            }
        }
        else if(e.keyCode == 67) {
            if (chaos_nodes) {
                chaos_nodes = false;
                $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Hide nodes</div>');

            }
            else {
                chaos_nodes = true
                $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Show nodes</div>');
            }
        }
        else if(e.keyCode == 80) {
            if (chaos_pods) {
                chaos_pods = false;
                $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Hide pods</div>');
            }
            else {
                chaos_pods = true
                $('#alert_placeholder').replaceWith(alert_div + 'Latest action: Show pods</div>');
            }
        }
    }
}