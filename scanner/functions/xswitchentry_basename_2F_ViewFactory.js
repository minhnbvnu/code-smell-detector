function xswitchentry_basename_2F_ViewFactory(V) {
  var A = {
    a1: {
      key: 'a1',
      views: [{
        key: 'v1',
        name: 'div',
        props: [{
          key: 'class',
          value: "xswitch-wrapper"
        }]
      }, {
        key: 'v2',
        name: 'div',
        props: [{
          key: 'class',
          value: "xswitch-left-area"
        }]
      }, {
        key: 'v3',
        name: 'ul',
        props: [{
          key: 'class',
          value: "xswitch-tabs"
        }, {
          key: 'ref',
          value: "tabs"
        }]
      }, {
        key: 'v9',
        name: 'div',
        props: [{
          key: 'class',
          value: "xswitch-new-item-container"
        }]
      }, {
        key: 'va',
        name: 'Input',
        props: [{
          key: 'size',
          value: "small"
        }, {
          key: 'autoComplete',
          value: "off"
        }, {
          key: 'placeholder',
          value: "Add a rule"
        }, {
          key: 'class',
          value: "new-item"
        }, {
          key: 'onKeyUp',
          expr: function expr($scope, $area) {
            return $scope.$action([Object(external_window_Recore_["xModifiers"])(["enter"]), function () {
              return $scope.$("add").apply(void 0, arguments);
            }], $area);
          }
        }, {
          key: 'x-model',
          expr: function expr($scope, $area) {
            return $scope.$("newItem");
          }
        }, {
          key: 'onChange',
          expr: function expr($scope, $area) {
            return function () {
              for (var _len = arguments.length, x = new Array(_len), _key = 0; _key < _len; _key++) {
                x[_key] = arguments[_key];
              }
              return external_window_Recore_["xAssign"].apply(void 0, [function (v) {
                return $scope.$set("newItem", v);
              }, function () {
                return $scope.$("newItem");
              }].concat(x));
            };
          }
        }]
      }, {
        key: 'vb',
        name: 'Icon',
        props: [{
          key: 'class',
          value: "confirm-button"
        }, {
          key: 'type',
          value: "edit"
        }, {
          key: 'theme',
          value: "twoTone"
        }, {
          key: 'onClick',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("add").apply(void 0, arguments);
            }, $area);
          }
        }]
      }, {
        key: 'vc',
        name: 'div',
        props: [{
          key: 'class',
          value: "xswitch-container"
        }, {
          key: 'ref',
          value: "shell"
        }]
      }, {
        key: 'vd',
        name: 'div',
        props: [{
          key: 'class',
          value: "toolbar-area"
        }]
      }, {
        key: 'vg',
        name: 'Switch',
        props: [{
          key: 'checkedChildren',
          expr: function expr($scope, $area) {
            return area_a4($area);
          }
        }, {
          key: 'unCheckedChildren',
          expr: function expr($scope, $area) {
            return area_a5($area);
          }
        }, {
          key: 'checked',
          expr: function expr($scope, $area) {
            return $scope.$("checked");
          }
        }, {
          key: 'onChange',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("toggleButton").apply(void 0, arguments);
            }, $area);
          }
        }]
      }, {
        key: 'vh',
        name: 'a',
        props: [{
          key: 'class',
          value: "open-readme"
        }, {
          key: 'title',
          value: "Open help page"
        }, {
          key: 'href',
          value: "javascript:;"
        }, {
          key: 'onClick',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("openReadme").apply(void 0, arguments);
            }, $area);
          }
        }]
      }, {
        key: 'vi',
        name: 'Icon',
        props: [{
          key: 'type',
          value: "question-circle"
        }, {
          key: 'theme',
          value: "twoTone"
        }, {
          key: 'style',
          value: {
            fontSize: '22px'
          }
        }]
      }, {
        key: 'vj',
        name: 'a',
        props: [{
          key: 'class',
          value: "new-tab-control"
        }, {
          key: 'title',
          value: "Open in new tab"
        }, {
          key: 'href',
          value: "javascript:;"
        }, {
          key: 'onClick',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("openNewTab").apply(void 0, arguments);
            }, $area);
          }
        }]
      }, {
        key: 'vk',
        name: 'Icon',
        props: [{
          key: 'type',
          value: "code"
        }, {
          key: 'theme',
          value: "twoTone"
        }, {
          key: 'style',
          value: {
            fontSize: '22px'
          }
        }]
      }]
    },
    a2: {
      key: 'a2',
      priority: 4,
      virtual: true,
      exprs: [{
        key: 'for1',
        expr: function expr($scope, $area) {
          return $scope.$("items");
        }
      }]
    },
    a3: {
      key: 'a3',
      priority: 5,
      virtual: true,
      views: [{
        key: 'v4',
        name: 'li',
        props: [{
          key: 'id',
          expr: function expr($scope, $area) {
            return $scope.$("item").id;
          }
        }, {
          key: 'onClick',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("setEditingKey").apply(void 0, arguments);
            }, $area);
          }
        }, {
          key: 'class.editing',
          expr: function expr($scope, $area) {
            return $scope.$("item").id === $scope.$("editingKey");
          }
        }, {
          key: 'class.dragovering',
          expr: function expr($scope, $area) {
            return $scope.$("item").id === $scope.$("dragoverKey");
          }
        }, {
          key: 'draggable',
          value: true
        }, {
          key: 'onDragStart',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("dragStart").apply(void 0, arguments);
            }, $area);
          }
        }, {
          key: 'onDragOver',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("dragOver").apply(void 0, arguments);
            }, $area);
          }
        }, {
          key: 'onDrop',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("drop").apply(void 0, arguments);
            }, $area);
          }
        }]
      }, {
        key: 'v5',
        name: 'Checkbox',
        props: [{
          key: 'checked',
          expr: function expr($scope, $area) {
            return $scope.$("item").active;
          }
        }, {
          key: 'onChange',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("setActive").apply(void 0, arguments);
            }, $area);
          }
        }, {
          key: 'disabled',
          expr: function expr($scope, $area) {
            return $scope.$("item").id === '0';
          }
        }]
      }, {
        key: 'v6',
        name: 'span',
        props: [{
          key: 'class',
          value: "label"
        }]
      }, {
        key: 'v7',
        name: 'Popconfirm',
        props: [{
          key: 'title',
          value: "Are you sure to delete?"
        }, {
          key: 'onConfirm',
          expr: function expr($scope, $area) {
            return $scope.$action(function () {
              return $scope.$("remove").apply(void 0, arguments);
            }, $area);
          }
        }]
      }, {
        key: 'v8',
        name: 'Icon',
        props: [{
          key: 'class',
          value: "delete-icon"
        }, {
          key: 'type',
          value: "delete"
        }, {
          key: 'theme',
          value: "outlined"
        }, {
          key: 'style.color',
          value: "#f5222d"
        }]
      }],
      exprs: [{
        key: 'frag1',
        expr: function expr($scope, $area) {
          return $scope.$("item").name;
        }
      }]
    },
    a4: {
      key: 'a4',
      priority: 3,
      views: [{
        key: 've',
        name: 'Icon',
        props: [{
          key: 'type',
          value: "check"
        }]
      }]
    },
    a5: {
      key: 'a5',
      priority: 3,
      views: [{
        key: 'vf',
        name: 'Icon',
        props: [{
          key: 'type',
          value: "close"
        }]
      }]
    }
  };
  function render1(area) {
    return V('Checkbox', area.p('v5'), null);
  }
  function render2(area) {
    return V('span', area.p('v6'), [" ", area.e('frag1')]);
  }
  function render3(area) {
    return V('Icon', area.p('v8'), null);
  }
  function render4(area) {
    return V('Popconfirm', area.p('v7'), [render3(area)]);
  }
  function render5(area) {
    return V('li', area.p('v4'), [render1(area), render2(area), render4(area)]);
  }
  function delegate_a3(area, key, $each, $id) {
    if ($id == null) {
      $id = Object(external_window_Recore_["xId"])($each, key);
    }
    var iter = area.c(A.a3, true).w({
      $id: $id,
      $each: $each,
      'item': $each,
      'index': key
    });
    return Object(external_window_Recore_["X"])(iter, render5);
  }
  function render6(area) {
    return Object(external_window_Recore_["XFor"])(area.e('for1'), delegate_a3.bind(null, area));
  }
  function area_a2(area) {
    return Object(external_window_Recore_["X"])(area.c(A.a2), render6);
  }
  function render7(area) {
    return V('ul', area.p('v3'), [area_a2(area)]);
  }
  function render8(area) {
    return V('Input', area.p('va'), null);
  }
  function render9(area) {
    return V('Icon', area.p('vb'), null);
  }
  function rendera(area) {
    return V('div', area.p('v9'), [render8(area), render9(area)]);
  }
  function renderb(area) {
    return V('div', area.p('v2'), [render7(area), rendera(area)]);
  }
  function renderc(area) {
    return V('div', area.p('vc'), null);
  }
  function renderd(area) {
    return V('div', area.p('v1'), [renderb(area), renderc(area)]);
  }
  function rendere(area) {
    return V('Icon', area.p('ve'), null);
  }
  function area_a4(area) {
    return Object(external_window_Recore_["X"])(area.c(A.a4), rendere);
  }
  function renderf(area) {
    return V('Icon', area.p('vf'), null);
  }
  function area_a5(area) {
    return Object(external_window_Recore_["X"])(area.c(A.a5), renderf);
  }
  function renderg(area) {
    return V('Switch', area.p('vg'), null);
  }
  function renderh(area) {
    return V('Icon', area.p('vi'), null);
  }
  function renderi(area) {
    return V('a', area.p('vh'), [renderh(area)]);
  }
  function renderj(area) {
    return V('Icon', area.p('vk'), null);
  }
  function renderk(area) {
    return V('a', area.p('vj'), [renderj(area)]);
  }
  function renderl(area) {
    return V('div', area.p('vd'), [renderg(area), renderi(area), renderk(area)]);
  }
  function renderm(area) {
    return V('Fragment', null, [renderd(area), renderl(area)]);
  }
  return function (controller) {
    return Object(external_window_Recore_["X"])(controller.__m(A.a1), renderm);
  };
}