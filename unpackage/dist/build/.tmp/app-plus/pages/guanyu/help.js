(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/guanyu/help"],{"1b25":function(t,n,e){},"42a5":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{msg:""}},onLoad:function(){var t=this;this.Get("http://39.99.137.77:8081/projects/aboutMall/findAll",{status:2},function(n){t.msg=n[0].help})},methods:{Post:function(n,e,a){t.request({method:"POST",url:n,data:e,header:{"Content-Type":"application/json"},success:function(t){a(t.data)},fail:function(t){alert("信息错误")}})},Get:function(n,e,a){t.request({url:n,data:e,header:{"Content-Type":"application/json"},success:function(t){a(t.data)},fail:function(t){alert("信息错误")}})}}};n.default=e}).call(this,e("6e42")["default"])},"43a6":function(t,n,e){"use strict";e.r(n);var a=e("faa0"),u=e("7064");for(var o in u)"default"!==o&&function(t){e.d(n,t,function(){return u[t]})}(o);e("e4d9");var c,r=e("f0c5"),i=Object(r["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=i.exports},7064:function(t,n,e){"use strict";e.r(n);var a=e("42a5"),u=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=u.a},9554:function(t,n,e){"use strict";(function(t){e("5925"),e("921b");a(e("66fd"));var n=a(e("43a6"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},e4d9:function(t,n,e){"use strict";var a=e("1b25"),u=e.n(a);u.a},faa0:function(t,n,e){"use strict";var a,u=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",function(){return u}),e.d(n,"c",function(){return o}),e.d(n,"a",function(){return a})}},[["9554","common/runtime","common/vendor"]]]);