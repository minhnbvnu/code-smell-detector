function getRule(dt, zone, isUTC) {
      var date = typeof dt === 'number' ? new Date(dt) : dt;
      var ruleset = zone[1];
      var basicOffset = zone[0];

      //Convert a date to UTC. Depending on the 'type' parameter, the date
      // parameter may be:
      //
      // - `u`, `g`, `z`: already UTC (no adjustment).
      //
      // - `s`: standard time (adjust for time zone offset but not for DST)
      //
    // - `w`: wall clock time (adjust for both time zone and DST offset).
      //
      // DST adjustment is done using the rule given as third argument.
      var convertDateToUTC = function (date, type, rule) {
        var offset = 0;

        if (type === 'u' || type === 'g' || type === 'z') { // UTC
          offset = 0;
        } else if (type === 's') { // Standard Time
          offset = basicOffset;
        } else if (type === 'w' || !type) { // Wall Clock Time
          offset = getAdjustedOffset(basicOffset, rule);
        } else {
          throw("unknown type " + type);
        }
        offset *= 60 * 1000; // to millis

        return new Date(date.getTime() + offset);
      };

      //Step 1:  Find applicable rules for this year.
      //
      //Step 2:  Sort the rules by effective date.
      //
      //Step 3:  Check requested date to see if a rule has yet taken effect this year.  If not,
      //
      //Step 4:  Get the rules for the previous year.  If there isn't an applicable rule for last year, then
      // there probably is no current time offset since they seem to explicitly turn off the offset
      // when someone stops observing DST.
      //
      // FIXME if this is not the case and we'll walk all the way back (ugh).
      //
      //Step 5:  Sort the rules by effective date.
      //Step 6:  Apply the most recent rule before the current time.
      var convertRuleToExactDateAndTime = function (yearAndRule, prevRule) {
        var year = yearAndRule[0]
          , rule = yearAndRule[1];
          // Assume that the rule applies to the year of the given date.

        var hms = rule[5];
        var effectiveDate;

        if (!EXACT_DATE_TIME[year])
          EXACT_DATE_TIME[year] = {};

        // Result for given parameters is already stored
        if (EXACT_DATE_TIME[year][rule])
          effectiveDate = EXACT_DATE_TIME[year][rule];
        else {
          //If we have a specific date, use that!
          if (!isNaN(rule[4])) {
            effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]], rule[4], hms[1], hms[2], hms[3], 0));
          }
          //Let's hunt for the date.
          else {
            var targetDay
              , operator;
            //Example: `lastThu`
            if (rule[4].substr(0, 4) === "last") {
              // Start at the last day of the month and work backward.
              effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]] + 1, 1, hms[1] - 24, hms[2], hms[3], 0));
              targetDay = SHORT_DAYS[rule[4].substr(4, 3)];
              operator = "<=";
            }
            //Example: `Sun>=15`
            else {
              //Start at the specified date.
              effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]], rule[4].substr(5), hms[1], hms[2], hms[3], 0));
              targetDay = SHORT_DAYS[rule[4].substr(0, 3)];
              operator = rule[4].substr(3, 2);
            }
            var ourDay = effectiveDate.getUTCDay();
            //Go forwards.
            if (operator === ">=") {
              effectiveDate.setUTCDate(effectiveDate.getUTCDate() + (targetDay - ourDay + ((targetDay < ourDay) ? 7 : 0)));
            }
            //Go backwards.  Looking for the last of a certain day, or operator is "<=" (less likely).
            else {
              effectiveDate.setUTCDate(effectiveDate.getUTCDate() + (targetDay - ourDay - ((targetDay > ourDay) ? 7 : 0)));
            }
          }
          EXACT_DATE_TIME[year][rule] = effectiveDate;
        }


        //If previous rule is given, correct for the fact that the starting time of the current
        // rule may be specified in local time.
        if (prevRule) {
          effectiveDate = convertDateToUTC(effectiveDate, hms[4], prevRule);
        }
        return effectiveDate;
      };

      var findApplicableRules = function (year, ruleset) {
        var applicableRules = [];
        for (var i = 0; ruleset && i < ruleset.length; i++) {
          //Exclude future rules.
          if (ruleset[i][0] <= year &&
              (
                // Date is in a set range.
                ruleset[i][1] >= year ||
                // Date is in an "only" year.
                  (ruleset[i][0] === year && ruleset[i][1] === "only") ||
                //We're in a range from the start year to infinity.
                    ruleset[i][1] === "max"
          )
             ) {
               //It's completely okay to have any number of matches here.
               // Normally we should only see two, but that doesn't preclude other numbers of matches.
               // These matches are applicable to this year.
               applicableRules.push([year, ruleset[i]]);
             }
        }
        return applicableRules;
      };

      var compareDates = function (a, b, prev) {
        var year, rule;
        if (a.constructor !== Date) {
          year = a[0];
          rule = a[1];
          a = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule])
            ? EXACT_DATE_TIME[year][rule]
            : convertRuleToExactDateAndTime(a, prev);
        } else if (prev) {
          a = convertDateToUTC(a, isUTC ? 'u' : 'w', prev);
        }
        if (b.constructor !== Date) {
          year = b[0];
          rule = b[1];
          b = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule]) ? EXACT_DATE_TIME[year][rule]
            : convertRuleToExactDateAndTime(b, prev);
        } else if (prev) {
          b = convertDateToUTC(b, isUTC ? 'u' : 'w', prev);
        }
        a = Number(a);
        b = Number(b);
        return a - b;
      };

      var year = date.getUTCFullYear();
      var applicableRules;

      applicableRules = findApplicableRules(year, _this.rules[ruleset]);
      applicableRules.push(date);
      //While sorting, the time zone in which the rule starting time is specified
      // is ignored. This is ok as long as the timespan between two DST changes is
      // larger than the DST offset, which is probably always true.
      // As the given date may indeed be close to a DST change, it may get sorted
      // to a wrong position (off by one), which is corrected below.
      applicableRules.sort(compareDates);

      //If there are not enough past DST rules...
      if (applicableRules.indexOf(date) < 2) {
        applicableRules = applicableRules.concat(findApplicableRules(year-1, _this.rules[ruleset]));
        applicableRules.sort(compareDates);
      }
      var pinpoint = applicableRules.indexOf(date);
      if (pinpoint > 1 && compareDates(date, applicableRules[pinpoint-1], applicableRules[pinpoint-2][1]) < 0) {
        //The previous rule does not really apply, take the one before that.
        return applicableRules[pinpoint - 2][1];
      } else if (pinpoint > 0 && pinpoint < applicableRules.length - 1 && compareDates(date, applicableRules[pinpoint+1], applicableRules[pinpoint-1][1]) > 0) {

        //The next rule does already apply, take that one.
        return applicableRules[pinpoint + 1][1];
      } else if (pinpoint === 0) {
        //No applicable rule found in this and in previous year.
        return null;
      }
      return applicableRules[pinpoint - 1][1];
    }