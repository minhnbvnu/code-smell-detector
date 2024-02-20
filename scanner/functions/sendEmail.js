async function sendEmail(options) {
  let appName = options.appKey; //站点名称
  let appKey = new Mongoose.Types.ObjectId(options.appKey);
  let appInfo = await SiteModel.findOne({ appKey: appKey });
  if (appInfo) {
    appName = appInfo.appName;
  }
  let body = "";
  let subject = "";
  let result;
  switch (options.alarmType) {
    case "jsError":
      result = await checkjsErrorResult(options);
      body = `<p>${
        options.email
      }</p><p style="margin-left:24px;">你好，前端监控平台（<a href="hubing.online:8083" target="_blank">hubing.online:8083</a>）发现您在平台创建的【${appName}】系统触发JavaScript错误临界值，错误率为：<i style="color:red">${
        result * 100
      }%</i>，请前往系统及时处理。</p><p style="text-align:right;color:#40A9FF;">前端监控平台管理员</p>`;
      subject = "JavaScript错误报警提醒";
      break;
    case "apiError":
      result = await checkApiErrorResult(options);
      body = `<p>${
        options.email
      }</p><p style="margin-left:24px;">你好，前端监控平台（<a href="hubing.online:8083" target="_blank">hubing.online:8083</a>）发现您在平台创建的【${
        options.appName
      }】系统触发API请求错误临界值，错误率为：<i style="color:red">${
        result * 100
      }%</i>，请前往系统及时处理。</p><p style="text-align:right;color:#40A9FF;">前端监控平台管理员</p>`;
      subject = "API错误报警提醒";
      break;
    case "perfSpeed":
      result = await checkPerfSpeedResult(options);
      body = `<p>${options.email}</p><p style="margin-left:24px;">你好，前端监控平台（<a href="hubing.online:8083" target="_blank">hubing.online:8083</a>）发现您在平台创建的【${options.appName}】系统触发访问速度临界值，目前访问速度平均值为：<i style="color:red">${result}</i>，请前往系统及时处理。</p><p style="text-align:right;color:#40A9FF;">前端监控平台管理员</p>`;
      subject = "访问速度报警提醒";
      break;
    default:
      break;
  }
  var mailOptions = {
    from: "前端监控平台管理员<admin@hubing.online>", // sender address mailfrom must be same with the user
    to: options.email, // list of receivers
    subject: subject, // Subject line
    replyTo: "676022504@qq.com", //custom reply address
    html: body, // html body
  };

  if (result * 100 < options.limitValue) return;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Message sent: " + error);
    }
    console.log("Message sent: " + info.response);
  });
}