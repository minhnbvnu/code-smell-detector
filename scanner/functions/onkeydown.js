function onkeydown(e){
            var shiftPressed = e.shiftKey;
            switch (e.which) {
                //up
                case 38:
                case 33:
                    FP.moveSectionUp();
                    break;

                //down
                case 32: //spacebar
                    if(shiftPressed){
                        FP.moveSectionUp();
                        break;
                    }
                case 40:
                case 34:
                    FP.moveSectionDown();
                    break;

                //Home
                case 36:
                    FP.moveTo(1);
                    break;

                //End
                case 35:
                    FP.moveTo( $(SECTION_SEL).length );
                    break;

                //left
                case 37:
                    FP.moveSlideLeft();
                    break;

                //right
                case 39:
                    FP.moveSlideRight();
                    break;

                default:
                    return; // exit this handler for other keys
            }
        }