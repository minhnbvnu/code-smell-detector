function parseDescriptors() {
      // 9. Descriptor parser: Let error be no.
      var pError = false,
        // 10. Let width be absent.
        // 11. Let density be absent.
        // 12. Let future-compat-h be absent. (We're implementing it now as h)
        w,
        d,
        h,
        i,
        candidate = {},
        desc,
        lastChar,
        value,
        intVal,
        floatVal;

      // 13. For each descriptor in descriptors, run the appropriate set of steps
      // from the following list:
      for (i = 0; i < descriptors.length; i++) {
        desc = descriptors[i];
        lastChar = desc[desc.length - 1];
        value = desc.substring(0, desc.length - 1);
        intVal = parseInt(value, 10);
        floatVal = parseFloat(value);

        // If the descriptor consists of a valid non-negative integer followed by
        // a U+0077 LATIN SMALL LETTER W character
        if (regexNonNegativeInteger.test(value) && lastChar === "w") {
          // If width and density are not both absent, then let error be yes.
          if (w || d) {
            pError = true;
          }

          // Apply the rules for parsing non-negative integers to the descriptor.
          // If the result is zero, let error be yes.
          // Otherwise, let width be the result.
          if (intVal === 0) {
            pError = true;
          } else {
            w = intVal;
          }

          // If the descriptor consists of a valid floating-point number followed by
          // a U+0078 LATIN SMALL LETTER X character
        } else if (regexFloatingPoint.test(value) && lastChar === "x") {
          // If width, density and future-compat-h are not all absent, then let error
          // be yes.
          if (w || d || h) {
            pError = true;
          }

          // Apply the rules for parsing floating-point number values to the descriptor.
          // If the result is less than zero, let error be yes. Otherwise, let density
          // be the result.
          if (floatVal < 0) {
            pError = true;
          } else {
            d = floatVal;
          }

          // If the descriptor consists of a valid non-negative integer followed by
          // a U+0068 LATIN SMALL LETTER H character
        } else if (regexNonNegativeInteger.test(value) && lastChar === "h") {
          // If height and density are not both absent, then let error be yes.
          if (h || d) {
            pError = true;
          }

          // Apply the rules for parsing non-negative integers to the descriptor.
          // If the result is zero, let error be yes. Otherwise, let future-compat-h
          // be the result.
          if (intVal === 0) {
            pError = true;
          } else {
            h = intVal;
          }

          // Anything else, Let error be yes.
        } else {
          pError = true;
        }
      } // (close step 13 for loop)

      // 15. If error is still no, then append a new image source to candidates whose
      // URL is url, associated with a width width if not absent and a pixel
      // density density if not absent. Otherwise, there is a parse error.
      if (!pError) {
        candidate.url = url;
        if (w) {
          candidate.w = w;
        }
        if (d) {
          candidate.d = d;
        }
        if (h) {
          candidate.h = h;
        }
        candidates.push(candidate);
      } else if (console && console.log) {
        console.log("Invalid srcset descriptor found in '" + input + "' at '" + desc + "'.");
      }
    }