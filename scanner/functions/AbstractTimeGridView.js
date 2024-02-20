function AbstractTimeGridView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.splitter = new AllDaySplitter();
            _this.renderSkeleton = core.memoizeRendering(_this._renderSkeleton, _this._unrenderSkeleton);
            /* Header Render Methods
            ------------------------------------------------------------------------------------------------------------------*/
            // Generates the HTML that will go before the day-of week header cells
            _this.renderHeadIntroHtml = function () {
                var _a = _this.context, theme = _a.theme, dateEnv = _a.dateEnv, options = _a.options;
                var range = _this.props.dateProfile.renderRange;
                var dayCnt = core.diffDays(range.start, range.end);
                var weekText;
                if (options.weekNumbers) {
                    weekText = dateEnv.format(range.start, WEEK_HEADER_FORMAT);
                    return '' +
                        '<th class="fc-axis fc-week-number ' + theme.getClass('widgetHeader') + '" ' + _this.axisStyleAttr() + '>' +
                        core.buildGotoAnchorHtml(// aside from link, important for matchCellWidths
                        options, dateEnv, { date: range.start, type: 'week', forceOff: dayCnt > 1 }, core.htmlEscape(weekText) // inner HTML
                        ) +
                        '</th>';
                }
                else {
                    return '<th class="fc-axis ' + theme.getClass('widgetHeader') + '" ' + _this.axisStyleAttr() + '></th>';
                }
            };
            /* Time Grid Render Methods
            ------------------------------------------------------------------------------------------------------------------*/
            // Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
            _this.renderTimeGridBgIntroHtml = function () {
                var theme = _this.context.theme;
                return '<td class="fc-axis ' + theme.getClass('widgetContent') + '" ' + _this.axisStyleAttr() + '></td>';
            };
            // Generates the HTML that goes before all other types of cells.
            // Affects content-skeleton, mirror-skeleton, highlight-skeleton for both the time-grid and day-grid.
            _this.renderTimeGridIntroHtml = function () {
                return '<td class="fc-axis" ' + _this.axisStyleAttr() + '></td>';
            };
            /* Day Grid Render Methods
            ------------------------------------------------------------------------------------------------------------------*/
            // Generates the HTML that goes before the all-day cells
            _this.renderDayGridBgIntroHtml = function () {
                var _a = _this.context, theme = _a.theme, options = _a.options;
                return '' +
                    '<td class="fc-axis ' + theme.getClass('widgetContent') + '" ' + _this.axisStyleAttr() + '>' +
                    '<span>' + // needed for matchCellWidths
                    core.getAllDayHtml(options) +
                    '</span>' +
                    '</td>';
            };
            // Generates the HTML that goes before all other types of cells.
            // Affects content-skeleton, mirror-skeleton, highlight-skeleton for both the time-grid and day-grid.
            _this.renderDayGridIntroHtml = function () {
                return '<td class="fc-axis" ' + _this.axisStyleAttr() + '></td>';
            };
            return _this;
        }