function renderAlert(alert, expanded=false, modulesOptionsAlertReq,
                     modulesOptionsIocReq) {
  const colorSeverity = alert_severity_to_color(alert.severity.severity_name);
  const alert_color = alertStatusToColor(alert.status.status_name);
  const alert_resolution = alertResolutionToARC(alert.resolution_status);

  if (alert.owner !== null) {
      alert.owner.user_name = filterXSS(alert.owner.user_name);
  }
  alert.alert_title = alert.alert_title ? filterXSS(alert.alert_title) : 'No title provided';
  alert.alert_description = alert.alert_description ? filterXSS(alert.alert_description) : 'No description provided';
  alert.alert_source = alert.alert_description ? filterXSS(alert.alert_source) : 'No source provided';
  alert.alert_source_link = filterXSS(alert.alert_source_link);
  alert.alert_source_ref = filterXSS(alert.alert_source_ref);
  alert.alert_note = filterXSS(alert.alert_note);

  let menuOptionsHtmlAlert = '';
  const menuOptions = modulesOptionsAlertReq;
  if (menuOptions.length !== 0) {

      menuOptionsHtmlAlert = '<div class="dropdown-divider"></div>';
      for (let index in menuOptions) {
        let opt = menuOptions[index];
        menuOptionsHtmlAlert += `<a class="dropdown-item" href="javascript:void(0);" onclick='init_module_processing_alert(${alert.alert_id}, "${opt.hook_name}",`+
                    `"${opt.manual_hook_ui_name}","${opt.module_name}");return false;'><i class="fa fa-arrow-alt-circle-right mr-2"></i> ${opt.manual_hook_ui_name}</a>`
      }
  }

  return `
<div class="card alert-card full-height alert-card-selectable ${alert_color}" id="alertCard-${alert.alert_id}">
  <div class="card-body">
    <div class="container-fluid">
      <div class="row">
        <div class=flex-column>
          <!-- Avatar group and tickbox -->
          
        </div>
        <div class="col">
          <!-- Alert details -->
          <div class="d-flex flex-column">
            <div class="flex-1 ml-md-4 mr-4 pt-1">
                <div class="row mb-4">
                    <div class="flex-column">
                        <div class="avatar-group ${alert.owner ? '' : 'ml-2 mr-2'}">
                            <div class="avatar-tickbox-wrapper">
                              <div class="avatar-wrapper">
                                <div class="avatar cursor-pointer">
                                  <span class="avatar-title alert-m-title alert-similarity-trigger rounded-circle bg-${colorSeverity}" data-toggle="collapse" data-target="#additionalDetails-${alert.alert_id}">
                                    <i class="fa-solid fa-fire"></i>
                                  </span>
                                </div>
                                ${alert.owner ? get_avatar_initials(alert.owner.user_name, true, `changeAlertOwner(${alert.alert_id})`) : `<div title="Assign to me" class="avatar avatar-sm" onclick="updateAlert(${alert.alert_id}, {alert_owner_id: userWhoami.user_id}, true);"><span class="avatar-title avatar-iris rounded-circle btn-alert-primary" style="cursor:pointer;"><i class="fa-solid fa-hand"></i></span></div>`}
                              </div>
                              <div class="tickbox" style="display:none;">
                                <input type="checkbox" class="alert-selection-checkbox" data-alert-id="${alert.alert_id}" />
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-9">
                        <h6 class="text-uppercase fw-bold mb-1 mt-1 ml-3 alert-m-title alert-m-title-${colorSeverity}" data-toggle="collapse" data-target="#additionalDetails-${alert.alert_id}">
                            ${alert.alert_title}
                            <span class="text-${colorSeverity} pl-3"></span>
                            <div class="d-flex mb-3">
                               
                                <span title="Alert IDs" class=""><small class="text-muted"><i>#${alert.alert_id} - ${alert.alert_uuid}</i></small></span>
                            </div>
                        </h6>
                    </div>
                    
                    <div class="col-xs-12 col">
                                        
                        <div class=" d-flex mt-3">
                            <div class="ml-auto">
                                <button type="button" class="btn bg-transparent btn-sm mt--4" onclick="comment_element(${alert.alert_id}, 'alerts', true)" title="Comments">
                                  <span class="btn-label">
                                    <i class="fa-solid fa-comments"></i><span class="notification" id="object_comments_number_${alert.alert_id}">${alert.comments.length || ''}</span>
                                  </span>
                                </button>
                                <button class="btn btn-sm bg-transparent mt--4" type="button" onclick="editAlert(${alert.alert_id})"><i class="fa fa-pencil"></i></button>
                                <button class="btn bg-transparent mt--4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <span aria-hidden="true"><i class="fas fa-ellipsis-v"></i></span>
                                </button>
                                <div class="dropdown-menu" role="menu">
                                  <a href="javascript:void(0)" class="dropdown-item" onclick="copyAlertLink(${alert.alert_id});return false;"><small class="fa fa-share mr-2"></small>Share</a>
                                  <a href="javascript:void(0)" class="dropdown-item" onclick="copyMDAlertLink(${alert.alert_id});return false;"><small class="fa-brands fa-markdown mr-2"></small>Markdown Link</a>
                                  ${menuOptionsHtmlAlert}
                                  <div class="dropdown-divider"></div>
                                  <a href="javascript:void(0)" class="dropdown-item" onclick="showAlertHistory(${alert.alert_id});return false;"><small class="fa fa-clock-rotate-left mr-2"></small>History</a>
                                  <div class="dropdown-divider"></div>
                                  <a href="javascript:void(0)" class="dropdown-item text-danger" onclick="delete_alert(${alert.alert_id});"><small class="fa fa-trash mr-2"></small>Delete alert</a>
                                </div>
                            </div>
                        </div>          
                                        
                    </div>

                </div>
                
                <div class="float-right alert-actions mt--4">
                      <button type="button" class="btn btn-alert-primary btn-sm ml-2" onclick="mergeAlertModal(${alert.alert_id}, false);">Merge</button>
                      
                      <div class="dropdown ml-2 d-inline-block">
                          <button type="button" class="btn btn-alert-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Assign
                          </button>
                          <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript:void(0)" onclick="updateAlert(${alert.alert_id}, {alert_owner_id: userWhoami.user_id}, true);">Assign to me</a>
                              <a class="dropdown-item" href="javascript:void(0)" onclick="changeAlertOwner(${alert.alert_id});">Assign</a>
                          </div>
                      </div>
                      <div class="dropdown ml-2 d-inline-block">
                          <button type="button" class="btn btn-alert-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Set status
                          </button>
                          <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript:void(0)" onclick="changeStatusAlert(${alert.alert_id}, 'New');">New</a>
                              <a class="dropdown-item" href="javascript:void(0)" onclick="changeStatusAlert(${alert.alert_id}, 'In progress');">In progress</a>
                              <a class="dropdown-item" href="javascript:void(0)" onclick="changeStatusAlert(${alert.alert_id}, 'Pending');">Pending</a>
                              <a class="dropdown-item" href="javascript:void(0)" onclick="changeStatusAlert(${alert.alert_id}, 'Closed');">Closed</a>
                              <a class="dropdown-item" href="javascript:void(0)" onclick="changeStatusAlert(${alert.alert_id}, 'Merged');">Merged</a>
                            </div>
                      </div>
                      ${alert.status.status_name === 'Closed' ? `
                          <button type="button" class="btn btn-alert-success btn-sm ml-2" onclick="changeStatusAlert(${alert.alert_id}, 'In progress');">Set in progress</button>
                      `: ` 
                      <button type="button" class="btn btn-alert-danger btn-sm ml-2" onclick="editAlert(${alert.alert_id}, true);">Close with note</button>
                      <button type="button" class="btn btn-alert-danger btn-sm ml-2" onclick="changeStatusAlert(${alert.alert_id}, 'Closed');">Close</button>
                      `}
                </div>
                <span class="mt-4">${alert.alert_description.replaceAll('\n', '<br/>').replaceAll('\t', '  ')}</span>

                

              <!-- Additional details and other content -->
              <div id="additionalDetails-${alert.alert_id}" class="collapse mt-4 ${expanded? 'show': ''} alert-collapsible">
                <div class="card-no-pd mt-2">
                    <div class="card-body">
                    <h3 class="title mb-3"><strong>General info</strong></h3>  
                        ${alert.alert_source ? `<div class="row"><div class="col-md-3"><b>Source:</b></div>
                        <div class="col-md-9">${alert.alert_source}</div>
                      </div>` : ''}
                      ${alert.alert_source_link ? `<div class="row mt-2">
                        <div class="col-md-3"><b>Source Link:</b></div>
                        <div class="col-md-9">${
                            alert.alert_source_link && alert.alert_source_link.startsWith('http') 
                            ? `<a href="${alert.alert_source_link}">${alert.alert_source_link}</a>` 
                            : 'No valid link provided'
                          }</div>
                      </div>` : ''}
                      ${alert.alert_source_ref ? `<div class="row mt-2">
                        <div class="col-md-3"><b>Source Reference:</b></div>
                        <div class="col-md-9">${alert.alert_source_ref}</div>
                      </div>` : ''}
                      ${alert.alert_source_event_time ? `<div class="row mt-2">
                        <div class="col-md-3"><b>Source Event Time:</b></div>
                        <div class="col-md-9">${alert.alert_source_event_time}</div>
                      </div>` : ''}
                      ${alert.alert_creation_time ? `<div class="row mt-2">
                        <div class="col-md-3"><b>IRIS Creation Time:</b></div>
                        <div class="col-md-9">${alert.alert_creation_time}</div>
                      </div>` : ''}
                    
                    <div class="separator-solid"></div>
                    <h3 class="title mb-3"><strong>Alert note</strong></h3>
                    <pre id=alertNote-${alert.alert_id}>${alert.alert_note}</pre>
                    
                    <!-- Alert Context section -->
                    ${
                        alert.alert_context && Object.keys(alert.alert_context).length > 0
                            ? `<div class="separator-solid"></div><h3 class="title mt-3 mb-3"><strong>Context</strong></h3>
                                <dl class="row">
                                ${renderNestedObject(alert.alert_context)}
                                </dl>`
                            : ''
                      }
                    
                    <div class="separator-solid"></div>
                    <h3 class="title mt-3 mb-3"><strong>Relationships</strong></h3>
                    <button class="btn btn-sm btn-outline-dark" type="button" data-toggle="collapse" data-target="#relationsAlert-${alert.alert_id}" 
                    aria-expanded="false" aria-controls="relationsAlert-${alert.alert_id}" onclick="fetchSmartRelations(${alert.alert_id});">Toggle Relations</button>
                    <div class="collapse mt-3" id="relationsAlert-${alert.alert_id}">
                        The following relationships are automatically generated by IRIS based on the alert's IOCs and assets 
                        in the system. They are an indication only and may not be accurate. 
                        <div class="row ml-1">
                            <div class="selectgroup selectgroup-pills mt-4">
                                <label class="selectgroup-item">
                                    <input type="checkbox" name="open_alerts_${alert.alert_id}" class="selectgroup-input filter-graph-alert-checkbox" onclick="refreshAlertRelationships(${alert.alert_id});">
                                    <span class="selectgroup-button">Show open alerts</span>
                                </label>
                                <label class="selectgroup-item">
                                    <input type="checkbox" name="closed_alerts_${alert.alert_id}" class="selectgroup-input filter-graph-alert-checkbox" onclick="refreshAlertRelationships(${alert.alert_id})">
                                    <span class="selectgroup-button">Show closed alerts</span>
                                </label>
                                <label class="selectgroup-item">
                                    <input type="checkbox" name="open_cases_${alert.alert_id}" class="selectgroup-input filter-graph-alert-checkbox" onclick="refreshAlertRelationships(${alert.alert_id})">
                                    <span class="selectgroup-button">Show open cases</span>
                                </label>
                                <label class="selectgroup-item">
                                    <input type="checkbox" name="closed_cases_${alert.alert_id}" class="selectgroup-input filter-graph-alert-checkbox" onclick="refreshAlertRelationships(${alert.alert_id})">
                                    <span class="selectgroup-button">Show closed cases</span>
                                </label>
                            </div>
                            <div class="mt-4">
                                <div class="input-group ">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Nodes limit</span>
                                    </div>
                                    <input type="number" name="value" value="100" class="form-control" id="nbResultsGraphFilter-${alert.alert_id}" onchange="refreshAlertRelationships(${alert.alert_id})">
                                </div>
                            </div>
                            <div class="ml-2 mt-4">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Lookback (days)</span>
                                    </div>
                                    <input type="number" name="value" value="30" class="form-control" id="daysBackGraphFilter-${alert.alert_id}" onchange="refreshAlertRelationships(${alert.alert_id})">
                                </div>
                            </div>  
                        </div>
                        <div class="row mt-4">
                                    
                        </div>
                        <div id="similarAlertsNotify-${alert.alert_id}" class="row mt-2 ml-2 text-danger"></div>
                        <div id="similarAlerts-${alert.alert_id}" class="mt-4 similar-alert-graph"></div>
                    </div>

                
                    <!-- Alert IOCs section -->
                    ${
                      alert.iocs && alert.iocs.length > 0
                          ? `<div class="separator-solid"></div><h3 class="title mb-3"><strong>IOCs</strong></h3>
                                       <div class="table-responsive">
                                         <table class="table table-sm table-striped">
                                           <thead>
                                             <tr>
                                               <th>Value</th>
                                               <th>Description</th>
                                               <th>Type</th>
                                               <th>TLP</th>
                                               <th>Tags</th>
                                               <th>Enrichment</th>
                                               <th></th>
                                             </tr>
                                           </thead>
                                           <tbody>
                                             ${alert.iocs
                              .map(
                                  (ioc) => `
                                                 <tr>
                                                   <td>${filterXSS(ioc.ioc_value)}</td>
                                                   <td>${filterXSS(ioc.ioc_description)}</td>
                                                   <td>${ioc.ioc_type ? filterXSS(ioc.ioc_type.type_name) : '-'}</td>
                                                   <td>${filterXSS(ioc.ioc_tlp) ? ioc.ioc_tlp : '-'}</td>
                                                   <td>${ioc.ioc_tags ? ioc.ioc_tags.split(',').map((tag) => `<span class="badge badge-pill badge-light ml-1"><i class="fa fa-tag mr-1"></i>${filterXSS(tag)}</span>`).join('') : ''}</td>
                                                   <td>${ioc.ioc_enrichment ? `<button type="button" class="btn btn-sm btn-outline-dark" data-toggle="modal" data-target="#enrichmentModal" onclick="showEnrichment(${JSON.stringify(ioc.ioc_enrichment).replace(/"/g, '&quot;')})">
                                                      View Enrichment
                                                    </button>` : ''}
                                                    </td>
                                                    <td>
                                                       <button class="btn bg-transparent" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                          <span aria-hidden="true"><i class="fas fa-ellipsis-v"></i></span>
                                                        </button>
                                                        <div class="dropdown-menu" role="menu">
                                                        ${ modulesOptionsIocReq.length === 0 ? `<a class="dropdown-item" href="javascript:void(0);"><i class="fas fa-rocket mr-2"></i> No module available</a>` :
                                                          modulesOptionsIocReq.map((opt) => `
                                                                <a class="dropdown-item" href="javascript:void(0);" onclick='init_module_processing([${ioc.ioc_id}], "${opt.hook_name}","${opt.manual_hook_ui_name}","${opt.module_name}", "ioc");return false;'><i class="fas fa-rocket mr-2"></i> ${opt.manual_hook_ui_name}</a>`
                                                            ).join('')
                                                        }
                                                        </div>
                                                    </td>
                                                 </tr>`
                              )
                              .join('')}
                                           </tbody>
                                         </table>
                                       </div>`
                          : ''
                  }
                    
                    <!-- Alert assets section -->
                    ${
                    alert.assets && alert.assets.length > 0
              ? `<div class="separator-solid"></div><h3 class="title mb-3"><strong>Assets</strong></h3>
                           <div class="table-responsive">
                             <table class="table table-sm table-striped">
                               <thead>
                                 <tr>
                                   <th>Name</th>
                                   <th>Description</th>
                                   <th>Type</th>
                                   <th>Domain</th>
                                   <th>IP</th>
                                   <th>Tags</th>
                                   <th>Enrichment</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 ${alert.assets
                  .map(
                      (asset) => `
                                     <tr>
                                       <td>${asset.asset_name ? filterXSS(asset.asset_name) : '-'}</td>
                                       <td>${asset.asset_description ? filterXSS(asset.asset_description) : '-'}</td>
                                       <td>${asset.asset_type ? filterXSS(asset.asset_type.asset_name) : '-'}</td>
                                       <td>${asset.asset_domain ? filterXSS(asset.asset_domain) : '-'}</td>
                                       <td>${asset.asset_ip ? filterXSS(asset.asset_ip) : '-'}</td>
                                       <td>${asset.asset_tags ? asset.asset_tags.split(',').map((tag) => `<span class="badge badge-pill badge-light ml-1"><i class="fa fa-tag mr-1"></i>${filterXSS(tag)}</span>`).join('') : ''}</td>
                                       <td>${asset.asset_enrichment ? `<button type="button" class="btn btn-sm btn-outline-dark" data-toggle="modal" data-target="#enrichmentModal" onclick="showEnrichment(${JSON.stringify(asset.asset_enrichment).replace(/"/g, '&quot;')})">
                                          View Enrichment
                                        </button>` : ''}
                                        </td>
                                     </tr>`
                  )
                  .join('')}
                               </tbody>
                             </table>
                           </div>`
              : ''
      }
                    
                    ${
          alert.alert_source_content
              ? `<div class="separator-solid"></div><h3 class="title mt-3 mb-3"><strong>Raw Alert</strong></h3>
                           <button class="btn btn-sm btn-outline-dark" type="button" data-toggle="collapse" data-target="#rawAlert-${alert.alert_id}" 
                           aria-expanded="false" aria-controls="rawAlert-${alert.alert_id}">Toggle Raw Alert</button>
                           <div class="collapse mt-3" id="rawAlert-${alert.alert_id}">
                             <pre class="pre-scrollable">${filterXSS(JSON.stringify(alert.alert_source_content, null, 2))}</pre>
                           </div>`
              : ""
      }
                    
                    </div>
                  </div>
              </div>
              ${alert.cases ? `<div class='row mt-4 mb-2'>` + alert.cases.map((case_) => `
                <div class="dropdown ml-2 d-inline-block">
                      <a class="bg-transparent ml-3" title="Merged in case #${case_}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="javascript:void(0)">
                          <span aria-hidden="true"><i class="fa-solid fa-link"></i>#${case_}</span>
                      </a>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="/case?cid=${case_}" target="_blank"><i class="fa-solid fa-eye mr-2"></i> View case #${case_}</a>    
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-danger" href="javascript:void(0)" onclick="unlinkAlertFromCase(${alert.alert_id}, ${case_})"><i class="fa-solid fa-unlink mr-2"></i>Unlink alert from case #${case_}</a>
                      </div>
                </div>
              `).join('') + '</div>' : '<div class="mb-4"></div>'}
            
              <div class="">  
                ${alert_resolution === undefined ? "": alert_resolution} 
                ${alert.status ? `<span class="badge alert-bade-status badge-pill badge-light mr-3">${alert.status.status_name}</span>` : ''}                    
                <span title="Alert source event time"><b><i class="fa-regular fa-calendar-check"></i></b>
                <small class="text-muted ml-1">${alert.alert_source_event_time}</small></span>
                <span title="Alert severity"><b class="ml-3"><i class="fa-solid fa-bolt"></i></b>
                  <small class="text-muted ml-1" id="alertSeverity-${alert.alert_id}" data-severity-id="${alert.severity.severity_id}">${alert.severity.severity_name}</small></span>
                <span title="Alert source"><b class="ml-3"><i class="fa-solid fa-cloud-arrow-down"></i></b>
                  <small class="text-muted ml-1">${filterXSS(alert.alert_source) || 'Unspecified'}</small></span>
                <span title="Alert client"><b class="ml-3"><i class="fa-regular fa-circle-user"></i></b>
                  <small class="text-muted ml-1 mr-2">${filterXSS(alert.customer.customer_name) || 'Unspecified'}</small></span>
                ${alert.classification && alert.classification.name_expanded ? `<span class="badge badge-pill badge-light" title="Classification" id="alertClassification-${alert.alert_id}" data-classification-id="${alert.classification.id}"><i class="fa-solid fa-shield-virus mr-1"></i>${filterXSS(alert.classification.name_expanded)}</span>`: ''}
                ${alert.alert_tags ? alert.alert_tags.split(',').map((tag) => `<span class="badge badge-pill badge-light ml-1" title="Add as filter" style="cursor: pointer;" data-tag="${filterXSS(tag)}" onclick="addTagFilter(this);"><i class="fa fa-tag mr-1"></i>${filterXSS(tag)}</span>`).join('') + `<div style="display:none;" id="alertTags-${alert.alert_id}">${filterXSS(alert.alert_tags)}</div>` : ''}
                
              </div>

            </div>
            
            <div class="mt-auto">
              <!-- Alert actions -->
            </div>
          </div>
        </div>
      </div>
    </div>
</div>    
</div>  `;

}