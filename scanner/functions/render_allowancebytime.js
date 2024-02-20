function render_allowancebytime(args) {
  let
    req               = args.req,
    res               = args.res,
    team_view_details = args.team_view_details,
    company           = args.company,
    start_date        = args.start_date,
    end_date          = args.end_date;

    return Promise
      .try(() => req.query['as-csv']
        ? render_allowancebytime_as_csv(args)
        : res.render('report/allowancebytime', {
          users_and_leaves    : team_view_details.users_and_leaves,
          related_departments : team_view_details.related_departments,
          current_department  : team_view_details.current_department,
          company             : company,
          start_date_str      : start_date.format('YYYY-MM'),
          end_date_str        : end_date.format('YYYY-MM'),
          start_date_obj      : start_date,
          end_date_obj        : end_date,
          same_month          : (start_date.format('YYYYMM') === end_date.format('YYYYMM')),
        })
      );
}