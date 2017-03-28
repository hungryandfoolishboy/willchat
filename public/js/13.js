webpackJsonp([13],{

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(279)

var Component = __webpack_require__(47)(
  /* script */
  __webpack_require__(224),
  /* template */
  __webpack_require__(261),
  /* scopeId */
  "data-v-2c866034",
  /* cssModules */
  null
)
Component.options.__file = "D:\\UPUPW\\vhosts\\willchat\\resources\\assets\\js\\user\\components\\fans\\lists.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] lists.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c866034", Component.options)
  } else {
    hotAPI.reload("data-v-2c866034", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      fans: [],
      searchForm: {
        name: '',
        sex: 'all'
      }
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData(page = 1) {
      this.axios.get('fans/lists', {
        params: {
          keyword: this.searchForm.keyword,
          sex: this.searchForm.sex,
          page: page
        }
      }).then(response => {
        this.fans = response.data.fans;
      });
    },

    syncWechatFans() {
      this.axios.post('fans/sync', null, { timeout: 60000 }).then(response => {
        this.loadData(1);
      });
    },

    search() {
      this.loadData(1);
    },

    handleCurrentChange(page) {
      this.loadData(page);
    }
  }
});

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)();
exports.push([module.i, "\n.avatar[data-v-2c866034] {\n  display: block;\n  overflow: hidden;\n  margin: 10px 0;\n  width: 80px;\n  height: 80px;\n}\n", ""]);

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "right-main"
  }, [_c('div', {
    staticClass: "table-tools"
  }, [_c('el-form', {
    staticClass: "demo-form-inline",
    attrs: {
      "inline": true,
      "model": _vm.searchForm
    }
  }, [_c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "按昵称搜索"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.loadData($event)
      }
    },
    model: {
      value: (_vm.searchForm.keyword),
      callback: function($$v) {
        _vm.searchForm.keyword = $$v
      },
      expression: "searchForm.keyword"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-select', {
    attrs: {
      "placeholder": "性别筛选"
    },
    on: {
      "change": _vm.loadData
    },
    model: {
      value: (_vm.searchForm.sex),
      callback: function($$v) {
        _vm.searchForm.sex = $$v
      },
      expression: "searchForm.sex"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "全部",
      "value": "all"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "男",
      "value": "0"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "女",
      "value": "1"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "其它",
      "value": "2"
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary",
      "icon": "search"
    },
    on: {
      "click": _vm.search
    }
  }, [_vm._v("搜索")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "icon": "upload"
    },
    on: {
      "click": _vm.syncWechatFans
    }
  }, [_vm._v("从服务器粉丝数据")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.fans.data,
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "label": "头像"
    },
    inlineTemplate: {
      render: function() {
        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
          return _c('img', {
            staticClass: "avatar",
            attrs: {
              "src": _vm.row.headimgurl,
              "alt": ""
            }
          })
        
      },
      staticRenderFns: []
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "nickname",
      "label": "昵称"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "sex",
      "label": "性别"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "location",
      "label": "地区"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "tagid_list",
      "label": "标签"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "subscribe_time",
      "label": "关注时间"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "remark",
      "label": "备注"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作"
    },
    inlineTemplate: {
      render: function() {
        var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
          return _c('div', [_c('el-button', {
            attrs: {
              "size": "small",
              "type": "primary"
            },
            nativeOn: {
              "click": function($event) {
                _vm.charge(_vm.row.id)
              }
            }
          }, [_vm._v("test")])], 1)
        
      },
      staticRenderFns: []
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "paginator"
  }, [_c('el-pagination', {
    attrs: {
      "current-page": _vm.fans.current_page,
      "page-size": _vm.fans.per_page,
      "layout": "total, prev, pager, next, jumper",
      "total": _vm.fans.tatal
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c866034", module.exports)
  }
}

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(240);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(48)("471c0423", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2c866034\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./lists.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2c866034\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./lists.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});