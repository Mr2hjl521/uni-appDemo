(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/evaluate/evaluate"],{"1a9e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("a4a1"));function o(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{showCategoryIndex:0,headerPosition:"fixed",city:"北京",categoryList:["华为","vivo","小米","魅族","OPPO"],smallCategory:[{name:"机型1",img:"/static/img/goods/p1.jpg"},{name:"机型2",img:"/static/img/goods/p2.jpg"},{name:"机型3",img:"/static/img/goods/p3.jpg"},{name:"机型4",img:"/static/img/goods/p4.jpg"},{name:"机型5",img:"/static/img/goods/phone1.jpg"},{name:"机型6",img:"/static/img/goods/phone2.jpg"},{name:"机型7",img:"/static/img/goods/phone3.jpg"},{name:"机型8",img:"/static/img/goods/phone4.jpg"}]}},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onLoad:function(){var t=this;this.amapPlugin=new a.default.AMapWX({key:"7c235a9ac4e25e482614c6b8eac6fd8e"}),this.amapPlugin.getRegeo({success:function(e){t.city=e[0].regeocodeData.addressComponent.city.replace(/市/g,"")}})},methods:{toHome:function(){t.switchTab({url:"/pages/tabBar/home/home"})},toMsg:function(){t.navigateTo({url:"../../msg/msg"})},showCategory:function(t){this.showCategoryIndex=t},toWrite:function(e){t.setStorageSync("catName",e.name),t.navigateTo({url:"../evaluate/writeEvaluateInfo"})},toSearch:function(){t.showToast({title:"敬请期待"})},Post:function(e,n,a){t.request({method:"POST",url:e,data:n,header:{"Content-Type":"application/json"},success:function(t){a(t.data)},fail:function(t){alert(t.data)}})},Get:function(e,n,a){t.request({url:e,data:n,header:{"Content-Type":"application/json"},success:function(t){a(t.data)},fail:function(t){a(t)}})}}};e.default=i}).call(this,n("6e42")["default"])},"2fdd":function(t,e,n){"use strict";n.r(e);var a=n("1a9e"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},"5bd6":function(t,e,n){"use strict";n.r(e);var a=n("b071"),o=n("2fdd");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("6059");var c,u=n("f0c5"),s=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);e["default"]=s.exports},6059:function(t,e,n){"use strict";var a=n("768e"),o=n.n(a);o.a},"768e":function(t,e,n){},8734:function(t,e,n){"use strict";(function(t){n("5925"),n("921b");a(n("66fd"));var e=a(n("5bd6"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},b071:function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",function(){return o}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return a})}},[["8734","common/runtime","common/vendor"]]]);