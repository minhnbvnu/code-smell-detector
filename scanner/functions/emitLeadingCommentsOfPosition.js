function emitLeadingCommentsOfPosition(pos) {
                if (commentsDisabled || pos === -1) {
                    return;
                }
                emitLeadingComments(pos, 
                /*isEmittedNode*/
                true);
            }