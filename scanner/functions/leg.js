function leg(n) {
        c.save();               // Save the current transformation
        if (n === 0) {          // Nonrecursive case:
            c.lineTo(len, 0);   //   Just draw a horizontal line
        }                       //                                       _  _
        else {                  // Recursive case: draw 4 sub-legs like:  \/
            c.scale(1/3,1/3);   // Sub-legs are 1/3 the size of this leg
            leg(n-1);           // Recurse for the first sub-leg
            c.rotate(60*deg);   // Turn 60 degrees clockwise
            leg(n-1);           // Second sub-leg
            c.rotate(-120*deg); // Rotate 120 degrees back
            leg(n-1);           // Third sub-leg
            c.rotate(60*deg);   // Rotate back to our original heading
            leg(n-1);           // Final sub-leg
        }
        c.restore();            // Restore the transformation
        c.translate(len, 0);    // But translate to make end of leg (0,0)
    }