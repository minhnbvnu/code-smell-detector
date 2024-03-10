function build_timeline(data) {
    let compact = is_timeline_compact_view();
    let tree = is_timeline_tree_view();
    var is_i = false;
    current_timeline = data.data.tim;
    let tmb = [];

    let reid = 0;

    $('#time_timeline_select').empty();

    var standard_filters = [
                {value: 'asset:', score: 10, meta: 'Match assets name of events'},
                {value: 'asset_id:', score: 10, meta: 'Match assets ID of events'},
                {value: 'startDate:', score: 10, meta: 'Match end date of events'},
                {value: 'endDate:', score: 10, meta: 'Match end date of events'},
                {value: 'tag:', score: 10, meta: 'Match tag of events'},
                {value: 'description:', score: 10, meta: 'Match description of events'},
                {value: 'flag', score: 10, meta: 'Match flagged events'},
                {value: 'category:', score: 10, meta: 'Match category of events'},
                {value: 'title:', score: 10, meta: 'Match title of events'},
                {value: 'source:', score: 10, meta: 'Match source of events'},
                {value: 'raw:', score: 10, meta: 'Match raw data of events'},
                {value: 'ioc', score: 10, meta: "Match ioc value in events"},
                {value: 'ioc_id', score: 10, meta: "Match ioc ID in events"},
                {value: 'event_id', score: 10, meta: "Match event ID in events"},
                {value: 'AND ', score: 10, meta: 'AND operator'}
              ]

    for (rid in data.data.assets) {
        standard_filters.push(
             {value: data.data.assets[rid][0], score: 1, meta: data.data.assets[rid][1]}
        );
    }

    for (rid in data.data.categories) {
        standard_filters.push(
             {value: data.data.categories[rid], score: 1, meta: "Event category"}
        );
    }

    tm_filter.setOptions({
          enableBasicAutocompletion: [{
            getCompletions: (editor, session, pos, prefix, callback) => {
              callback(null, standard_filters);
            },
          }],
          enableLiveAutocompletion: true,
    });

    let tesk = false;
    let reap = [];
    let ioc_list = data.data.iocs;
    for (ioc in ioc_list) {
        let ioc_len = ioc_list[ioc]['ioc_value'].length;
        if (ioc_len === 0 || ioc_len > 64) {
            console.log('Ignoring IOC with length 0 or > 64')
            continue;
        }
        let capture_start = "(^|;|:|||>|<|[|]|(|)|\s|\>)(";
        let capture_end = ")(;|:|||>|<|[|]|(|)|\s|>|$|<br/>)";
        // When an IOC contains another IOC in its description, we want to avoid to replace that particular pattern
        var avoid_inception_start = "(?!<span[^>]*?>)" + capture_start;
        var avoid_inception_end = "(?![^<]*?<\/span>)" + capture_end;
        var re = new RegExp(avoid_inception_start
               + escapeRegExp(sanitizeHTML(ioc_list[ioc]['ioc_value']))
               + avoid_inception_end
               ,"g");
        let replacement = `$1<span class="text-warning-high ml-1 link_asset" data-toggle="popover" style="cursor: pointer;" data-trigger="hover" data-content="${sanitizeHTML(ioc_list[ioc]['ioc_description'])}" title="IOC">${sanitizeHTML(ioc_list[ioc]['ioc_value'])}</span>`;
        reap.push([re, replacement]);
    }
    let idx = 0;

    let converter = get_showdown_convert();
    let child_events = Object();

    for (let index in data.data.tim) {
        let evt = data.data.tim[index];
        let dta =  evt.event_date.split('T');
        let tags = '';
        let cats = '';
        let tmb_d = '';
        let style = '';
        let asset = '';

        if (evt.event_id in data.data.comments_map) {
            nb_comments = data.data.comments_map[evt.event_id].length;
        } else {
            nb_comments = '';
        }

        if(evt.category_name && evt.category_name != 'Unspecified') {
             if (!compact) {
                 tags += `<span class="badge badge-light float-right ml-1 mt-2">${sanitizeHTML(evt.category_name)}</span>`;
             } else {
                 if (evt.category_name != 'Unspecified') {
                     cats += `<span class="badge badge-light float-right ml-1 mt-1 mr-2 mb-1">${sanitizeHTML(evt.category_name)}</span>`;
                 }
             }
        }
        
        if (evt.iocs != null && evt.iocs.length > 0) {
            for (let ioc in evt.iocs) {
                let span_anchor = $('<span>');
                span_anchor.addClass('badge badge-warning-event float-right ml-1 mt-2');
                span_anchor.attr('data-toggle', 'popover');
                span_anchor.attr('data-trigger', 'hover');
                span_anchor.attr('style', 'cursor: pointer;');
                span_anchor.attr('data-content', 'IOC - ' + evt.iocs[ioc].description);
                span_anchor.attr('title', evt.iocs[ioc].name);
                span_anchor.text(evt.iocs[ioc].name)
                span_anchor.html('<i class="fa-solid fa-virus-covid mr-1"></i>' + span_anchor.html());
                tags += span_anchor[0].outerHTML;
            }
        }

        if (evt.event_tags != null && evt.event_tags.length > 0) {
            sp_tag = evt.event_tags.split(',');
            for (tag_i in sp_tag) {
                    tags += get_tag_from_data(sp_tag[tag_i], 'badge badge-light ml-1 float-right mt-2');
                }
        }

        let entry = '';
        let inverted = 'timeline';
        let timeline_style = tree ? '-t' : '';

        /* Do we have a border color to set ? */
        if (tesk) {
            style += "timeline-odd"+ timeline_style;
            tesk = false;
        } else {
            style += "timeline-even" + timeline_style;
            tesk = true;
        }

        let style_s = "";
        if (evt.event_color != null) {
                style_s = `style='border-left: 2px groove ${sanitizeHTML(evt.event_color)};'`;
        }

        if (!tree) {
            inverted += '-inverted';
        } else {
            if (tesk) {
                inverted += '-inverted';
            }
        }


        /* For every assets linked to the event, build a link tag */
        if (evt.assets != null) {
            for (ide in evt.assets) {
                let cpn =  evt.assets[ide]["ip"] + ' - ' + evt.assets[ide]["description"]
                cpn = sanitizeHTML(cpn)
                let span_anchor = $('<span>');
                span_anchor.attr('data-toggle', 'popover');
                span_anchor.attr('data-trigger', 'hover');
                span_anchor.attr('style', 'cursor: pointer;');
                span_anchor.attr('data-content', cpn);
                span_anchor.attr('title', evt.assets[ide]["name"]);
                span_anchor.text(evt.assets[ide]["name"]);

                if (evt.assets[ide]["compromised"]) {
                    span_anchor.addClass('badge badge-warning-event float-right ml-1 mt-2');
                } else {
                    span_anchor.addClass('badge badge-light float-right ml-1 mt-2');
                }

                asset += span_anchor[0].outerHTML;
            }
        }

        let ori_date = '<span class="ml-3"></span>';
        if (evt.event_date_wtz != evt.event_date) {
            ori_date += `<i class="fas fa-info-circle mr-1" title="Locale date time ${evt.event_date_wtz}${evt.event_tz}"></i>`
        }

        if(evt.event_in_summary) {
            ori_date += `<i class="fas fa-newspaper mr-1" title="Showed in summary"></i>`
        }

        if(evt.event_in_graph) {
            ori_date += `<i class="fas fa-share-alt mr-1" title="Showed in graph"></i>`
        }
        

        let day = dta[0];

        let hour = dta[1].split('.')[0];

        let mtop_day = '';
        if (!tmb.includes(day)) {
            tmb.push(day);
            tmb_d = `<li class="time-badge${timeline_style} badge badge-dark" id="time_${idx}"><small class="">${day}</small><br/></li>`;

            idx += 1;
            mtop_day = 'mt-4';
        }

        let title_parsed = match_replace_ioc(sanitizeHTML(evt.event_title), reap);
        let raw_content = do_md_filter_xss(evt.event_content); // Raw markdown content
        let formatted_content = converter.makeHtml(raw_content); // Convert markdown to HTML

        const wordLimit = 30; // Define your word limit

        if (!compact) {
            let paragraphs = raw_content.split('\n\n');
            let short_content, long_content;

            if (paragraphs.join(' ').split(' ').length > wordLimit || paragraphs.length > 2) {
                let temp_content = '';
                let i = 0;
                let wordCount = 0;

                // Loop until the content length is more than wordLimit or paragraph count is more than 2
                while(wordCount <= wordLimit && i < 2 && i < paragraphs.length){
                    let words = paragraphs[i].split(' ');
                    if (wordCount + words.length > wordLimit && wordCount != 0) {
                        break;
                    }
                    temp_content += paragraphs[i] + '\n\n';
                    wordCount += words.length;
                    i++;
                }

                short_content = converter.makeHtml(temp_content); // Convert markdown to HTML
                short_content = match_replace_ioc(filterXSS(short_content), reap);
                temp_content = paragraphs.slice(i).join('\n\n');
                long_content = converter.makeHtml(temp_content); // Convert markdown to HTML
                long_content = match_replace_ioc(filterXSS(long_content), reap);

                formatted_content = short_content + `<div class="collapse" id="collapseContent-${evt.event_id}">
                ${long_content}
                </div>
                <a class="btn btn-link btn-sm" data-toggle="collapse" href="#collapseContent-${evt.event_id}" role="button" aria-expanded="false" aria-controls="collapseContent" onclick="toggleSeeMore(this)">&gt; See more</a>`;
            } else {
                content_parsed = converter.makeHtml(raw_content); // Convert markdown to HTML
                content_parsed = filterXSS(content_parsed);
                formatted_content = match_replace_ioc(content_parsed, reap);
            }
        }



        let shared_link = buildShareLink(evt.event_id);

        let flag = '';
        if (evt.event_is_flagged) {
            flag = `<i class="fas fa-flag text-warning" title="Flagged"></i>`;
        } else {
            flag = `<i class="fa-regular fa-flag" title="Not flagged"></i>`;
        }

        if (compact) {
            entry = `<li class="${inverted} ${mtop_day}" title="Event ID #${evt.event_id}" >
                    <div class="timeline-panel${timeline_style} ${style}" ${style_s}  id="event_${evt.event_id}">
                        <div class="timeline-heading">
                            <div class="btn-group dropdown float-right">
                                ${cats}
                                <button type="button" class="btn btn-light btn-xs" onclick="edit_event(${evt.event_id})" title="Edit">
                                    <span class="btn-label">
                                        <i class="fa fa-pen"></i>
                                    </span>
                                </button>
                                <button type="button" class="btn btn-light btn-xs" onclick="flag_event(${evt.event_id})" title="Flag">
                                    <span class="btn-label">
                                        ${flag}
                                    </span>
                                </button>
                                <button type="button" class="btn btn-light btn-xs" onclick="comment_element(${evt.event_id}, 'timeline/events')" title="Comments">
                                    <span class="btn-label">
                                        <i class="fa-solid fa-comments"></i><span class="notification" id="object_comments_number_${evt.event_id}">${nb_comments}</span>
                                    </span>
                                </button>
                                <button type="button" class="btn btn-light btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <span class="btn-label">
                                        <i class="fa fa-cog"></i>
                                    </span>
                                </button>
                                <div class="dropdown-menu" role="menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 32px, 0px); top: 0px; left: 0px; will-change: transform;">
                                        <a href= "#" class="dropdown-item" onclick="copy_object_link(${evt.event_id});return false;"><small class="fa fa-share mr-2"></small>Share</a>
                                        <a href= "#" class="dropdown-item" onclick="copy_object_link_md('event', ${evt.event_id});return false;"><small class="fa-brands fa-markdown mr-2"></small>Markdown Link</a>
                                        <a href= "#" class="dropdown-item" onclick="duplicate_event(${evt.event_id});return false;"><small class="fa fa-clone mr-2"></small>Duplicate</a>
                                        <div class="dropdown-divider"></div>
                                        <a href= "#" class="dropdown-item text-danger" onclick="delete_event(${evt.event_id});"><small class="fa fa-trash mr-2"></small>Delete</a>
                                </div>
                            </div>
                            <div class="collapsed" id="dropa_${evt.event_id}" data-toggle="collapse" data-target="#drop_${evt.event_id}" aria-expanded="false" aria-controls="drop_${evt.event_id}" role="button" style="cursor: pointer;">
                                <span class="text-muted text-sm float-left mb--2"><small>${render_date(evt.event_date, true)}</small></span>
                                <a class="text-dark text-sm ml-3" href="${shared_link}" onclick="edit_event(${evt.event_id});return false;">${title_parsed}</a>
                            </div>
                        </div>
                        <div class="timeline-body text-faded" >
                            <div id="drop_${evt.event_id}" class="collapse" aria-labelledby="dropa_${evt.event_id}" style="">
                                <div class="card-body">
                                ${formatted_content}
                                </div>
                                <div class="bottom-hour mt-2">
                                    <span class="float-right">${tags}${asset} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`
        } else {
            entry = `<li class=${inverted} title="Event ID #${evt.event_id}" >
                    <div class="timeline-panel${timeline_style} ${style}" ${style_s} id="event_${evt.event_id}">
                        <div class="timeline-heading">
                            <div class="btn-group dropdown float-right">

                                <button type="button" class="btn btn-light btn-xs" onclick="edit_event(${evt.event_id})" title="Edit">
                                    <span class="btn-label">
                                        <i class="fa fa-pen"></i>
                                    </span>
                                </button>
                                <button type="button" class="btn btn-light btn-xs" onclick="add_event(${evt.event_id})" title="Add child event">
                                    <span class="btn-label">
                                       <i class="fa-brands fa-hive"></i>
                                    </span>
                                </button>
                                <button type="button" class="btn btn-light btn-xs" onclick="flag_event(${evt.event_id})" title="Flag">
                                    <span class="btn-label">
                                        ${flag}
                                    </span>
                                </button>
                                <button type="button" class="btn btn-light btn-xs" onclick="comment_element(${evt.event_id}, 'timeline/events')" title="Comments">
                                    <span class="btn-label">
                                        <i class="fa-solid fa-comments"></i><span class="notification" id="object_comments_number_${evt.event_id}">${nb_comments}</span>
                                    </span>
                                </button>
                                <button type="button" class="btn btn-light btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <span class="btn-label">
                                        <i class="fa fa-cog"></i>
                                    </span>
                                </button>
                                <div class="dropdown-menu" role="menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 32px, 0px); top: 0px; left: 0px; will-change: transform;">
                                        <a href= "#" class="dropdown-item" onclick="copy_object_link(${evt.event_id});return false;"><small class="fa fa-share mr-2"></small>Share</a>
                                        <a href= "#" class="dropdown-item" onclick="copy_object_link_md('event', ${evt.event_id});return false;"><small class="fa-brands fa-markdown mr-2"></small>Markdown Link</a>
                                        <a href= "#" class="dropdown-item" onclick="duplicate_event(${evt.event_id});return false;"><small class="fa fa-clone mr-2"></small>Duplicate</a>
                                        <div class="dropdown-divider"></div>
                                        <a href= "#" class="dropdown-item text-danger" onclick="delete_event(${evt.event_id});"><small class="fa fa-trash mr-2"></small>Delete</a>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <a class="timeline-title" href="${shared_link}" onclick="edit_event(${evt.event_id});return false;">[${hour}] ${title_parsed}</a>
                            </div>
                        </div>
                        <div class="timeline-body text-faded" >
                            <span>${formatted_content}</span>

                            <div class="bottom-hour mt-2">
                                <div class="row">
                                    <div class="col d-flex">
                                        <span class="text-muted text-sm align-self-end float-left mb--2"><small class="bottom-hour-i"><i class="flaticon-stopwatch mr-2"></i>${render_date(evt.event_date, true)}${ori_date}</small></span>
                                    </div>
                                    
                                    <div class="col">
                                        <span class="float-right">${tags}${asset} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`
        }
        is_i = false;

        //entry = match_replace_ioc(entry, reap);
        // display the time info as a small box

        if (evt.parent_event_id != null) {
            if (!(evt.parent_event_id in child_events)) {
                child_events[evt.parent_event_id] = [];
            }
            child_events[evt.parent_event_id].push(entry);
            tesk = !tesk;

        } else {
            $('#timeline_list').append(tmb_d);
            $('#timeline_list').append(entry);
        }

    }


    if (tree) {
        $('#timeline_list').addClass('timeline-t');
    } else {
        $('#timeline_list').removeClass('timeline-t');
    }

    for (let parent_id in child_events) {
        let parent_event = $('#event_' + parent_id);

        let parent_event_class = parent_event.parent().attr('class');
        let parent_class = parent_event.attr('class');

        // Reverse the order of the child events list
        child_events[parent_id] = child_events[parent_id].reverse();

        // Add button on parent to toggle child events
        let button = $('<button>');
        button.attr('type', 'button');
        button.attr('class', 'btn btn-light btn-xs mt-2');
        button.attr('onclick', `toggle_child_events_of_event(${parent_id});`);
        button.attr('title', 'Toggle child events');
        button.html('<span class="btn-label"><i class="fa fa-chevron-down"></i></span>');

        parent_event.find('.timeline-body').append(button);

        for (let child_html in child_events[parent_id]) {

            let child = $(child_events[parent_id][child_html]);

            child.attr('class', parent_event_class);
            child.addClass('timeline-child');
            child.addClass('timeline-child-' + parent_id);

            child.find('div:first').attr('class', parent_class);

            let child_date = child.find('.bottom-hour').find('small').text();
            let parent_date = parent_event.find('.bottom-hour').find('small').text();
            child_date = Date.parse(child_date);
            parent_date = Date.parse(parent_date);

            if (child_date < parent_date) {
                child.find('.bottom-hour-i').append('<span class="ml-2"><i class="fas fa-exclamation-triangle text-warning" title="Child event datetime is earlier than parent event"></i></span>')
            }

            child.insertAfter(parent_event.parent());
        }

    }

    //match_replace_ioc(data.data.iocs, "timeline_list");
    $('[data-toggle="popover"]').popover();

    if (data.data.tim.length === 0) {
       $('#card_main_load').append('<h3 class="ml-mr-auto text-center" id="no_events_msg">No events in current view</h3>');
       $('#timeline_list').hide();
    } else {
        $('#timeline_list').show();
        $('#no_events_msg').remove('h3');
    }

    set_last_state(data.data.state);
    hide_loader();

    if (location.href.indexOf("#") != -1) {
        var current_url = window.location.href;
        var id = current_url.substr(current_url.indexOf("#") + 1);
        if ($('#event_'+id).offset() != undefined) {
            $('.content').animate({ scrollTop: $('#event_'+id).offset().top - 180 });
            $('#event_'+id).addClass('fade-it');
        }
    }

    // re-enable onclick event on timeline if selector_active is true
    if(selector_active == true) {
        $(".timeline li .timeline-panel").on('click', function(){
            if($(this).hasClass("timeline-selected")) {
                $(this).removeClass("timeline-selected");
            } else {
                $(this).addClass("timeline-selected");
            }
        });
    }
}