function domString(type) {
    let appendDOMString = ``;
    switch (type) {
        case "theme-color":
            appendDOMString = `
            <div id="color-box" class="row w-100"></div>
            <br/>`;
            break;
        case "open-notification-settings":
            appendDOMString = `
        <div class="row w-100">
            <div class="col-9 text-left">
                <label>${ i18n.__("open-notification-settings") }</label>
                <br />
            </div>
            <div class="col-3 text-right">
                <a class="btn btn-sm btn-outline-primary" href="javascript:call('open-notification-settings')">
                    ${ i18n.__("go") }
                </a>
            </div>
        </div>
        <br />
            `;
            break;
        case "autocheck":
            appendDOMString = `
            <div class="row w-100 align-items-center">
            <div class="col-9 text-left">
                <label>${ i18n.__("autocheck") }</label><br/>
                <p class="settings-msg">
                    <a class="rest underlined" href="javascript:updateChecker(2)">
                        <span id="manually">
                        ${ i18n.__('manually-check-for-update') }
                        </span>
                    </a>&nbsp;
                    ${ i18n.__('manually-check-for-update-tip-1') + i18n.__('v') + require("./package.json").version + i18n.__('manually-check-for-update-tip-2') }
                </p>
            </div>
            <div class="col-3 text-right">
                <label class="switch-slide">
                    <input type="checkbox" id="selection-autocheck" hidden
                    onclick="store.set('autocheck', $('#selection-autocheck').prop('checked'))">
                    <label for="selection-autocheck" class="switch-slide-label"></label>
                </label>
            </div>
        </div>
        <br/>`;
            break;
        case "predefined":
            appendDOMString = `
            <div class="w-100 row">
            <div class="should-lock col-12" id="predefined-tasks">
                <div class="align-content-center form-text">
                    <div class="d-flex text-left">
                        <div id="itemlist">
                            <ul id="itemlist-ul"></ul>
                        </div>
                        <br /><br />
                    </div>
                    <div class="align-self-start text-left small">
                        <a class="text-info underlined" href="javascript:planAdd()">
                            ${ i18n.__('add') }
                        </a><br/>
                        <span class="text-muted small">
                            ${ i18n.__('task-reservation-settings-tip-part1') }
                        </span>
                    </div>
                </div>
            </div>
            </div>
            <br/>
            `;
            break;
        case "task-reservation":
            appendDOMString = `
            <div class="w-100 row">
            <div class="col-12 small text-muted">
                <ul class="text-muted${ (store.has("reserved") && store.get("reserved").toString() !== "") ? '' : ' d-none' }" id="reservation-list"></ul>
                <div class="align-self-start text-left">
                    <a class="text-info underlined" href="javascript:reservedAdd()">
                        ${ i18n.__('add') }
                    </a>
                </div>
                <div class="text-muted small">
                    ${ i18n.__('task-reservation-settings-tip-part1') }<br/>
                    ${ (store.has("reserved") && store.get("reserved").toString() !== "") ?
                ('<br />' + i18n.__('task-reservation-settings-tip-part2') + '<br />' + i18n.__('task-reservation-settings-tip-part3'))
                : "" }
                </>
            </div></div></div>
            <br/>`;
            break;
        case "personalization-notification":
            appendDOMString = `
            <div class="w-100 row">
            <div class="col-5">
            <label class="personalization-notification-label settings-msg settings-msg text-muted" id="work-time-end"></label>
            </div>
            <div class="col-7 text-right">
            <input class="personalization-notification" maxlength="64" name="work-time-end"
                   onchange="personalizedNotification()"
                   type="text" />
            </div>
            <div class="col-5">
            <label class="personalization-notification-label settings-msg settings-msg text-muted"
                         id="work-time-end-msg"></label>
            </div>
            <div class="col-7 text-right">             
            <input class="personalization-notification" maxlength="64" name="work-time-end-msg"
                   onchange="personalizedNotification()"
                   type="text" />
            </div>
            <div class="col-5">
            <label class="personalization-notification-label settings-msg text-muted" id="rest-time-end"></label>
            </div>
            <div class="col-7 text-right">  
            <input class="personalization-notification" maxlength="64" name="rest-time-end"
                   onchange="personalizedNotification()"
                   type="text" />
            </div>
            <div class="col-5">
            <label class="personalization-notification-label settings-msg text-muted" id="rest-time-end-msg"></label>
            </div>
            <div class="col-7 text-right">  
            <input class="personalization-notification" maxlength="64" name="rest-time-end-msg"
                   onchange="personalizedNotification()"
                   type="text" />
            </div>
            <div class="col-5">  
            <label class="personalization-notification-label settings-msg text-muted" id="all-task-end"></label>
            </div>
            <div class="col-7 text-right">  
            <input class="personalization-notification" maxlength="64" name="all-task-end"
                   onchange="personalizedNotification()"
                   type="text" />
            </div>
            <div class="col-5"> 
            <label class="personalization-notification-label settings-msg text-muted" id="all-task-end-msg"></label> 
            </div>
            <div class="col-7 text-right"> 
            <input class="personalization-notification" maxlength="64" name="all-task-end-msg"
                   onchange="personalizedNotification()"
                   type="text" />
            </div>
            <script>
                $(".personalization-notification").each(function () {
                    $(this).attr("placeholder", i18n.__($(this).attr("name")));
                    if (store.has("personalization-notification." + $(this).attr("name")))
                        $(this).val(store.get("personalization-notification." + $(this).attr("name")));
                });
                $(".personalization-notification-label").each(function () {
                    $(this).text(i18n.__('personalization-notification-label-begin') +
                            i18n.__($(this).attr("id")) + i18n.__('personalization-notification-label-end'));
                });
            </script>
            </div><br/>`;
            break;
        case "personalization-notify-sound":
            appendDOMString = `
            <div class="w-100 row align-items-center">
            <div class="col-7">
            <label>
                ${ i18n.__("personalization-notify-sound-msg-time-end") }
            </label>
            </div>
            <div class="col-5 text-right">
            <div class="dropdown">
                <a aria-expanded="false"
                   aria-haspopup="true" class="btn btn-outline-secondary dropdown-toggle"
                   data-toggle="dropdown"
                   id="work-time-end-sound-dropdown-button">
                </a>
                <div aria-labelledby="work-time-end-sound-dropdown-button" class="dropdown-menu"
                     id="work-time-end-sound-select">
                </div>
            </div><br/>
            </div>
            <div class="col-5 custom-notify-sound-work-time-end">
            <label>
                ${ i18n.__("custom-notify-sound") }
            </label>
            </div>
            <div class="col-7 text-right custom-notify-sound-work-time-end">
            <input id="custom-notify-sound-work-time-end" name="custom-notify-sound-work-time-end"
                       type="text" class="hotkey-set-input extreme-small text-right" 
                       placeholder="${ i18n.__('input-url') }"
                       onkeyup="store.set('custom-work-time-end-sound',$('#custom-notify-sound-work-time-end').val());" />
            </div><br/>
            <div class="col-7">
            <label>
                ${ i18n.__("personalization-notify-sound-msg-all-end") }
            </label>
            </div>
            <div class="col-5 text-right">
            <div class="dropdown">
                <a aria-expanded="false" aria-haspopup="true"
                   class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown"
                   id="all-time-end-sound-dropdown-button">
                </a>
                <div aria-labelledby="all-time-end-sound-dropdown-button" class="dropdown-menu"
                     id="all-time-end-sound-select">
                </div>
            </div><br/>
            </div>
            <div class="col-5 custom-notify-sound-all-time-end">
            <label>
                ${ i18n.__("custom-notify-sound") }
            </label>
            </div>
            <div class="col-7 text-right custom-notify-sound-all-time-end">
            <input id="custom-notify-sound-all-time-end" name="custom-notify-sound-all-time-end" type="text" 
                       class="hotkey-set-input extreme-small text-right" 
                       placeholder="${ i18n.__('input-url') }"
                        onkeyup="store.set('custom-all-time-end-sound',$('#custom-notify-sound-all-time-end').val());"/>
            </div><br/>
            </div><br/>`;
            break;
        case "i18n":
            appendDOMString = `
            <div class="row w-100 align-items-center">
            <div class="col-8 text-left">
                <label>
                    ${ i18n.__('languages') }
                </label>
                <br/>
                <p class="settings-msg">
                    ${ i18n.__('language-contribute-tip-part-1') }
                        <a href=\"javascript:require('electron').shell.openExternal('https://github.com/RoderickQiu/wnr/blob/master/locales/README.md')\">${ i18n.__('language-contribute-tip-part-2') }</a>
                        ${ i18n.__('feedback-tip-part-4') }
                </p>
            </div>
            <div class="col-4 text-right">
                <div class="dropdown d-inline">
                    <a aria-expanded="false" aria-haspopup="true"
                       class="btn btn-outline-secondary dropdown-toggle w-100 small" data-toggle="dropdown"
                       id="language-dropdown-button">
                    </a>
                    <div aria-labelledby="language-dropdown-button" class="dropdown-menu" id="i18n">
                    </div>
                </div>
            </div></div>
            <br/>`;
            break;
        case "hotkey":
            appendDOMString = `
            <div id="hotkey-box" class="row w-100"></div>
            <br/>`;
            break;
        case "data-management":
            appendDOMString = `
            <ul>
            <li>
                ${ i18n.__('delete-all-data-msg') }
                <p class="small text-muted">
                    <a class="rest underlined" href="javascript:call('delete-all-data')">
                        ${ i18n.__('delete-all-data') + i18n.__('period-symbol') }
                    </a>&nbsp;
                </p>
            </li>
            <!-- settings backup -->
            <li>
                ${ i18n.__('settings-backup-msg') }
                <p class="small text-muted">
                    <a class="rest underlined" href="javascript:settingsBackup('settings')">
                        ${ i18n.__('copy') + i18n.__('period-symbol') }
                    </a>&nbsp;
                    ${ i18n.__('settings-backup-tip') }
                </p>
            </li>
            <!-- settings import -->
            <li>
                ${ i18n.__('settings-import-msg') }
                <br />
                <input id="settings-import-input" name="settings-import-input"
                       onkeydown="if(event.keyCode === 13) settingsImport($('#settings-import-input').val(),'settings');"
                       type="password" />
                <script> $('#settings-import-input').attr('placeholder', i18n.__('settings-import'));</script>
                <p class="small text-muted">
                    ${ i18n.__('settings-import-tip') }
                </p>
            </li>
            <!-- statistics backup -->
            <li>
                ${ i18n.__('statistics-backup-msg') }
                <p class="small text-muted">
                    <a class="rest underlined" href="javascript:settingsBackup('statistics')">
                        ${ i18n.__('copy') + i18n.__('period-symbol') }
                    </a>&nbsp;
                    ${ i18n.__('statistics-backup-tip') }
                </p>
            </li>
            <!-- statistics import -->
            <li>
                ${ i18n.__('statistics-import-msg') }
                <br />
                <input id="statistics-import-input" name="statistics-import-input"
                       onkeydown="if(event.keyCode === 13) settingsImport($('#statistics-import-input').val(),'statistics');"
                       type="password" />
                <script> $('#statistics-import-input').attr('placeholder', i18n.__('statistics-import'));</script>
                <p class="small text-muted">
                    ${ i18n.__('statistics-import-tip') }
                </p>
            </li>
            </ul><br/>`;
            break;
        case "locker":
            appendDOMString = `
            <div class="w-100 row align-items-center">
            <div class="col-12">
            <small class="text-grey">
                ${ i18n.__('locker-now-status') }<span class="font-weight-bold rest">
                ${ store.get('islocked') ? i18n.__('on') : i18n.__('off') } </span> ${ i18n.__('period-symbol') }
            </small><br /><br/>
            <input id="passcode-locker" maxlength="11" name="passcode-locker"
            onkeydown="if(event.keyCode === 13) lock($('#passcode-locker').val(), $('#passcode-locker-again').val());"
            type="password" />
            <br />
            <input id="passcode-locker-again" maxlength="11" name="passcode-locker-again"
            onkeydown="if(event.keyCode === 13) lock($('#passcode-locker').val(), $('#passcode-locker-again').val());"
            type="password" />
            <br /><br/>
            <div class="text-muted small">
            ${ store.get('islocked') ? i18n.__('locker-settings-input-tip-lock-mode-on') : i18n.__('locker-settings-input-tip-lock-mode-off') }
            </div></div></div>
            <br/>`
            ;
            break;
    }//pre-append
    return appendDOMString;
}