function generateShtml ($, fileName, config, appConf, resType, dom, tag, uriType,opts) {
  var content = '';
  var failoverContent = ''
  var inlineStr = '';
  var hrefs = []
  var failoverDomain = config.failoverDomain
  if (config.needCombo) {
    var combofile = config.fdPath + config.app + '/' + config.module + '/' + fileName + '.shtml';
    var href = '\/\/' + config.domain + config.comboPrefix;
    var failoverHref
    if (failoverDomain) {
      failoverHref = '\/\/<!--#echo var=\'http_wq_failover_domain\' -->' + config.comboPrefix
    }
    var inlineDomLength = $(tag + '[inline]').length;
    var lenCount = dom.length - inlineDomLength;
    if (lenCount === 1) {
      href = '\/\/' + config.domain;
      if (failoverDomain) {
        failoverHref = '\/\/<!--#echo var=\'http_wq_failover_domain\' -->'
      }
    }
    dom.each(function (i, item) {
      var inline = item['attribs']['inline'];
      var uriText = item['attribs'][uriType];
      if (_.isUndefined(inline)) {
        if (uriText) {
          uriText = uriText.replace('\/\/' + config.domain, '');
          href += uriText;
          if (failoverHref) {
            uriText = path.dirname(uriText) + '/failover_' + path.basename(uriText)
            failoverHref += uriText
          }
          if (i === dom.length - 1) {
            href += '';
            if (failoverHref) {
              failoverHref += ''
            }
          } else {
            href += ',';
            if (failoverHref) {
              failoverHref += ','
            }
          }
        }
      } else {
        inlineStr += getInlineStr(config, appConf, uriText, resType);
      }
    });

    if (config.needTimestamp) {
      href += '?t=' + new Date().getTime();
      if (failoverHref) {
        failoverHref += '?t=' + new Date().getTime();
      }
    }
    var template = '';
    hrefs.push(href)
    if (tag === 'link') {
      template = '<link combofile="<%= combofile %>" rel="stylesheet" href="<%= href %>" onerror="__reloadResource(this)" />';
    } else {
      template = '<script combofile="<%= combofile %>" src="<%= href %>" onerror="__reloadResource(this)"></script>';
    }
    content += inlineStr;
    if (lenCount > 0) {
      content += _.template(template)({
        combofile: combofile,
        href: href
      });
      if (failoverHref) {
        failoverContent = _.template(template)({
          combofile: combofile,
          href: failoverHref
        })
      }
    }
  } else {
    var resList = '';
    var failoverResList = ''
    dom.each(function (i, item) {
      var inline = item['attribs']['inline'];
      var uriText = item['attribs'][uriType];
      if (_.isUndefined(inline)) {
        var failoverHref
        var failoverUriText
        if (failoverDomain) {
          failoverHref = '\/\/<!--#echo var=\'http_wq_failover_domain\' -->'
          failoverUriText = uriText.replace('\/\/' + config.domain, '')
          failoverUriText = failoverHref + failoverUriText
          failoverUriText = path.dirname(failoverUriText) + '/failover_' + path.basename(failoverUriText)
        }
        if (config.needTimestamp) {
          uriText += '?t=' + new Date().getTime();
          if (failoverUriText) {
            failoverUriText += '?t=' + new Date().getTime()
          }
        }
        hrefs.push(uriText)
        var template = '';
        if (tag === 'link') {
          template = '<link rel="stylesheet" href="<%= href %>" onerror="__reloadResource(this)" />';
        } else {
          template = '<script src="<%= href %>" onerror="__reloadResource(this)"></script>';
        }
        var resItem = _.template(template)({
          href: uriText
        });
        var failoverResItem
        if (failoverUriText) {
          failoverResItem = _.template(template)({
            href: failoverUriText
          });
        }

        resList += resItem;
        if (failoverResItem) {
          failoverResList += failoverResItem
        }
        if (i === dom.length - 1) {
          resList += '';
          if (failoverResList) {
            failoverResList += ''
          }
        } else {
          resList += '\n';
          if (failoverResList) {
            failoverResList += '\n'
          }
        }
      } else {
        inlineStr += getInlineStr(config, appConf, uriText, resType);
      }
    });
    content += inlineStr;
    content += resList;
    if (failoverResList) {
      failoverContent += failoverResList
    }
  }
  if(tag=="link"&&opts.mapJson&&opts.modulePath){
    let tpl = '<!-- #include virtual="' + Util.urlJoin(config.shtmlCommentPrefix, config.module, "allinone_"+fileName + '.shtml') + '" -->\n';
    tpl += '<link combofile="<%= combofile %>" rel="stylesheet" href="<%= href %>" onerror="__reloadResource(this)" />';
    let newName= "css/allinone_"+fileName+".css",rev = opts.mapJson[config.revName];
    if(rev&&rev.css&&rev.css[newName]){
      let file = _.template(tpl)({
        combofile: newName,
        href: '//' + config.domain+config.fdPath+appConf.app+"/"+config.module+"/"+rev.css[newName]
      });
      
      let p = path.join(opts.modulePath, 'dist', 'output', 'combofile');
      if(!fs.existsSync(p)){
        fs.mkdirSync(p);
      }
      fs.writeFile(path.join(p,'allinone_'+fileName+".shtml"), file,function(){});
    }
    
  }
  return {
    content: content,
    failoverContent, failoverContent,
    hrefs: hrefs
  }
}