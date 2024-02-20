function morePlaneDetails(selectedPlanType, selectedPlanColor, id) {
  $.ajax({
    url: '/get-plan-details',
    type: 'get',
    data: {id: id},
    beforeSend: function () {
      $('#selected_plan_Details_id').empty();
    },
    success: function (response) {
      if (response.code === 200) {
        let value = response.data;
        let append = '';
        $('#selected_plan_Details_id').empty();
        append +=
          '<div class="col-md-6 col-sm-12 text-center">' +
          '<div class="d-flex flex-center position-relative m-20">' +
          '<span class="svg svg-fill-primary opacity-4 position-absolute">' +
          '<svg width="175" height="200">' +
          '<polyline points="87,0 174,50 174,150 87,200 0,150 0,50 87,0" />' +
          '</svg>' +
          '</span>' +
          '<span class="svg-icon svg-icon-5x svg-icon-' +
          selectedPlanColor +
          '">';
        if (value.plan_name === 'Basic')
          append +=
            '<i class="fas fa-paper-plane fa-5x ' + selectedPlanType + '"></i>';
        else
          append += '<i class="fas fa-gem fa-5x ' + selectedPlanType + '"></i>';
        append +=
          '</span>' +
          '</div>' +
          '<span class="font-size-h1 d-block font-weight-boldest py-2" id="plan_price_id">';
        if (value.plan_name === 'Basic')
          append +=
            'FREE <sup class="font-size-h3 font-weight-normal pl-1"></sup></span>';
        else
          append +=
            value.plan_price +
            '<sup class="font-size-h3 font-weight-normal pl-1">$</sup></span>';
        append +=
          '<h4 class="font-size-h6 d-block font-weight-bold mb-7 ' +
          selectedPlanType +
          '" id="plan_name_id"> ' +
          value.plan_name +
          '</h4>';
        if (value.plan_id == GET_USER_PLANS_DATA.plan_id)
          append +=
            '<button type="button" id="selected_plan_id' +
            value.plan_id +
            '" class="btn bg-red text-uppercase font-weight-bolder px-15 py-3"> Current </button>';
        else if (value.plan_id > GET_USER_PLANS_DATA.plan_id)
          append +=
            '<button type="button" id="selected_plan_id' +
            value.plan_id +
            '" title="Click to update the plan details" class="btn bg-blue text-uppercase font-weight-bolder px-15 py-3" onclick="openPackagesPage()"> Upgrade </button>';
        else if (value.plan_id < GET_USER_PLANS_DATA.plan_id)
          append +=
            '<button type="button" id="selected_plan_id' +
            value.plan_id +
            '" title="Click to update the plan details" class="btn bg-blue text-uppercase font-weight-bolder px-15 py-3" onclick="openPackagesPage()"> Downgrade </button>';
        append +=
          '</div>' +
          '<div class="col-md-6 col-sm-12">' +
          '<p class="mb-15 d-flex flex-column">';
        if (value.plan_name === 'Basic')
          append +=
            '<span id="team_members_id">Team Member - ' +
            value.member_count +
            '</span>';
        else
          append +=
            '<span id="team_members_id">Team Members - ' +
            value.member_count +
            '</span>';
        append +=
          '<span>Social Networks - ' +
          socialNetworksFunction(value.available_network) +
          '</span>' +
          '<span>Total Profiles - <b>' +
          value.account_count +
          '</b></span>' +
          '<span>Browser extension - ' +
          planBoolenFunction(value.browser_extension) +
          '</span>' +
          '<span>Scheduling & Posting - ' +
          planBoolenFunction(value.scheduling_posting) +
          '</span>' +
          '<span>World Class 24*7 Training & Support - ' +
          planBoolenFunction(value.support_24_7) +
          '</span>' +
          '<span>RSS Feed - ' +
          planBoolenFunction(value.rss_feeds) +
          '</span>' +
          '<span>Calendar - ' +
          planBoolenFunction(value.calendar) +
          '</span>' +
          '<span>Social Media based CRM - ' +
          planBoolenFunction(value.crm) +
          '</span>' +
          '<span>Social Report - ' +
          planBoolenFunction(value.social_report) +
          '</span>' +
          '<span>Discovery - ' +
          planBoolenFunction(value.discovery) +
          '</span>' +
          '<span>Content Studio - ' +
          planBoolenFunction(value.content_studio) +
          '</span>' +
          '<span>Board Me - ' +
          planBoolenFunction(value.board_me) +
          '</span>' +
          '<span>Share Libraray - ' +
          planBoolenFunction(value.share_library) +
          '</span>' +
          '<span>Sharathon - ' +
          planBoolenFunction(value.shareathon) +
          '</span>' +
          '<span>Team Report - ' +
          planBoolenFunction(value.team_report) +
          '</span>' +
          '<span>Custom Report -  ' +
          planBoolenFunction(value.custom_report) +
          '</span>' +
          '<span>Link Shortening -  ' +
          planBoolenFunction(value.link_shortening) +
          '</span>' +
          '<span>Twitter Engagement -  ' +
          planBoolenFunction(value.twitter_engagement) +
          '</span>' +
          '<span>Maximum Referral Count - <b>' +
          value.maximum_referal_count +
          '</b></span>' +
          '<span>Maximum Schedule count - <b>' +
          value.maximum_schedule +
          '</b></span>' +
          '</p>' +
          '</div>';

        $('#selected_plan_Details_id').append(append);
        $('#selected_plan_id' + value.plan_id + '').tooltip();
      } else if (response.code === 400) {
        toastr.error(response.error);
      } else {
        toastr.error('Some error occured can not get plan details');
      }
    },
  });
}