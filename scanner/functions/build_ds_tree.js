function build_ds_tree(data, tree_node) {

    var standard_files_filters = [
                {value: 'name: ', score: 10, meta: 'Match filename'},
                {value: 'storage_name: ', score: 10, meta: 'Match local storage filename'},
                {value: 'tag: ', score: 10, meta: 'Match tag of file'},
                {value: 'description: ', score: 10, meta: 'Match description of file'},
                {value: 'is_ioc: ', score: 10, meta: "Match file is IOC"},
                {value: 'is_evidence: ', score: 10, meta: "Match file is evidence"},
                {value: 'has_password: ', score: 10, meta: "Match file is password protected"},
                {value: 'id: ', score: 10, meta: "Match ID of the file"},
                {value: 'uuid: ', score: 10, meta: "Match UUID of the file"},
                {value: 'sha256: ', score: 10, meta: "Match sha256 of the file"},
                {value: 'AND ', score: 10, meta: 'AND operator'}
              ]

    for (node in data) {

        if (data[node] === null) {
            break;
        }

        if (data[node].type == 'directory') {
            data[node].name = sanitizeHTML(data[node].name);
            can_delete = '';
            if (!data[node].is_root) {
                can_delete = `<div class="dropdown-divider"></div><a href="#" class="dropdown-item text-danger" onclick="delete_ds_folder('${node}');"><small class="fa fa-trash mr-2"></small>Delete</a>`;
            }
            jnode = `<li>
                    <span id='${node}' title='Folder ID ${node}' data-node-id="${node}"><i class="fa-regular fa-folder"></i> ${sanitizeHTML(data[node].name)}</span> <i class="fas fa-plus ds-folder-menu" role="menu" style="cursor:pointer;" data-toggle="dropdown" aria-expanded="false"></i>
                        <div class="dropdown-menu" role="menu">
                                <a href="#" class="dropdown-item" onclick="add_ds_folder('${node}');return false;"><small class="fa-solid fa-folder mr-2"></small>Add subfolder</a>
                                <a href="#" class="dropdown-item" onclick="add_ds_file('${node}');return false;"><small class="fa-solid fa-file mr-2"></small>Add file</a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item" onclick="move_ds_folder('${node}');return false;"><small class="fa fa-arrow-right-arrow-left mr-2"></small>Move</a>
                                <a href="#" class="dropdown-item" onclick="rename_ds_folder('${node}', '${sanitizeHTML(data[node].name)}');return false;"><small class="fa-solid fa-pencil mr-2"></small>Rename</a>
                                ${can_delete}
                        </div>
                    <ul id='tree-${node}'></ul>
                </li>`;
            $('#'+ tree_node).append(jnode);
            build_ds_tree(data[node].children, 'tree-' + node);
        } else {
            data[node].file_original_name = sanitizeHTML(data[node].file_original_name);
            data[node].file_password = sanitizeHTML(data[node].file_password);
            data[node].file_description = sanitizeHTML(data[node].file_description);
            standard_files_filters.push({
                value: data[node].file_original_name,
                score: 1,
                meta: data[node].file_description
            });
            icon = '';
            if (data[node].file_is_ioc) {
                icon += '<i class="fa-solid fa-virus-covid text-danger mr-1" title="File is an IOC"></i>';
            }
            if (data[node].file_is_evidence) {
                icon += '<i class="fa-solid fa-file-shield text-success mr-1" title="File is an evidence"></i>';
            }
            if (icon.length === 0) {
                icon = '<i class="fa-regular fa-file mr-1" title="Regular file"></i>';
            }
            icon_lock = '';
            has_password = data[node].file_password !== null && data[node].file_password.length > 0;
            if (has_password) {
                icon_lock = '<i title="Password protected" class="fa-solid fa-lock text-success mr-1"></i>'
            }
            icn_content = btoa(icon + icon_lock);
            jnode = `<li>
                <span id='${node}' data-file-id="${node}" title="ID : ${data[node].file_id}\nUUID : ${data[node].file_uuid}" class='tree-leaf'>
                      <span role="menu" style="cursor:pointer;" data-toggle="dropdown" aria-expanded="false">${icon}${icon_lock} ${sanitizeHTML(data[node].file_original_name)}</span>
                      <i class="fa-regular fa-circle ds-file-selector" style="cursor:pointer;display:none;" onclick="ds_file_select('${node}');"></i>
                        <div class="dropdown-menu" role="menu">
                                <a href="#" class="dropdown-item" onclick="get_link_ds_file('${node}');return false;"><small class="fa fa-link mr-2"></small>Link</a>
                                <a href="#" class="dropdown-item" onclick="get_mk_link_ds_file('${node}', '${toBinary64(data[node].file_original_name)}', '${icn_content}', '${has_password}');return false;"><small class="fa-brands fa-markdown mr-2"></small>Markdown link</a>
                                <a href="#" class="dropdown-item" onclick="download_ds_file('${node}');return false;"><small class="fa-solid fa-download mr-2"></small>Download</a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item" onclick="info_ds_file('${node}');return false;"><small class="fa fa-eye mr-2"></small>Info</a>
                                <a href="#" class="dropdown-item" onclick="edit_ds_file('${node}');return false;"><small class="fa fa-pencil mr-2"></small>Edit</a>
                                <a href="#" class="dropdown-item" onclick="move_ds_file('${node}');return false;"><small class="fa fa-arrow-right-arrow-left mr-2"></small>Move</a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item text-danger" onclick="delete_ds_file('${node}');"><small class="fa fa-trash mr-2"></small>Delete</a>
                        </div>
                    </span>
                </li>`;
            $('#'+ tree_node).append(jnode);
        }
    }
    ds_filter.setOptions({
          enableBasicAutocompletion: [{
            getCompletions: (editor, session, pos, prefix, callback) => {
              callback(null, standard_files_filters);
            },
          }],
          enableLiveAutocompletion: true,
    });
}