(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0857":function(n,e,o){"use strict";var t=o("c247"),u=o.n(t);u.a},2428:function(n,e,o){"use strict";o.r(e);var t=o("f02a");for(var u in t)"default"!==u&&function(n){o.d(e,n,function(){return t[n]})}(u);o("0857");var c,i,r,a,l=o("f0c5"),f=Object(l["a"])(t["default"],c,i,!1,null,null,null,!1,r,a);e["default"]=f.exports},9745:function(n,e,o){"use strict";(function(n){o("5925"),o("921b");var e=u(o("66fd")),t=u(o("2428"));function u(n){return n&&n.__esModule?n:{default:n}}function c(n){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},t=Object.keys(o);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(o).filter(function(n){return Object.getOwnPropertyDescriptor(o,n).enumerable}))),t.forEach(function(e){i(n,e,o[e])})}return n}function i(n,e,o){return e in n?Object.defineProperty(n,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[e]=o,n}var r=function(){return Promise.all([o.e("common/vendor"),o.e("components/sunui-upimg/sunui-upimg-basic")]).then(o.bind(null,"1c64"))},a=function(){return Promise.all([o.e("common/vendor"),o.e("components/sunui-upimg/sunui-upimg-alioos")]).then(o.bind(null,"bf92"))},l=function(){return Promise.all([o.e("common/vendor"),o.e("components/sunui-upimg/sunui-upimg-tencent")]).then(o.bind(null,"3a30"))};e.default.component("sunui-upbasic",r),e.default.component("sunui-upoos",a),e.default.component("sunui-upcos",l),e.default.config.productionTip=!1,t.default.mpType="app";var f=new e.default(c({},t.default));n(f).$mount()}).call(this,o("6e42")["createApp"])},c247:function(n,e,o){},cf1b:function(n,e,o){"use strict";(function(n,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={onLaunch:function(){console.log(n("App Launch"," at App.vue:4"));var e=o.getStorageSync("userId");e?o.switchTab({url:"/pages/tabBar/home/home"}):o.navigateTo({url:"/pages/login/verificationcode"})},onShow:function(){console.log(n("App Show"," at App.vue:18"))},onHide:function(){console.log(n("App Hide"," at App.vue:21"))}};e.default=t}).call(this,o("0de9")["default"],o("6e42")["default"])},f02a:function(n,e,o){"use strict";o.r(e);var t=o("cf1b"),u=o.n(t);for(var c in t)"default"!==c&&function(n){o.d(e,n,function(){return t[n]})}(c);e["default"]=u.a}},[["9745","common/runtime","common/vendor"]]]);