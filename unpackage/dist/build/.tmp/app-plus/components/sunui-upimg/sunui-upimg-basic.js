(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/sunui-upimg/sunui-upimg-basic"],{"1c64":function(t,e,n){"use strict";n.r(e);var u=n("ae6a"),r=n("f513");for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n("9378");var i,c=n("f0c5"),s=Object(c["a"])(r["default"],u["b"],u["c"],!1,null,"36f0a52d",null,!1,u["a"],i);e["default"]=s.exports},"5af5":function(t,e,n){},9378:function(t,e,n){"use strict";var u=n("5af5"),r=n.n(u);r.a},ae6a:function(t,e,n){"use strict";var u,r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",function(){return r}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return u})},f513:function(t,e,n){"use strict";n.r(e);var u=n("f651"),r=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);e["default"]=r.a},f651:function(t,e,n){"use strict";(function(t,u){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,u,r,a,i){try{var c=t[a](i),s=c.value}catch(o){return void n(o)}c.done?e(s):Promise.resolve(s).then(u,r)}function c(t){return function(){var e=this,n=arguments;return new Promise(function(u,r){var a=t.apply(e,n);function c(t){i(a,u,r,c,s,"next",t)}function s(t){i(a,u,r,c,s,"throw",t)}c(void 0)})}}var s={data:function(){return{upload_after_list:[],upload_picture_list:[]}},name:"sunui-upimg",props:{upImgConfig:{type:Object}},created:function(){},methods:{initServerImage:function(t){this.upload_picture_list=t},chooseImage:function(t){f(this,parseInt(t),this.upImgConfig)},uploadimage:function(t){l(this,t)},deleteImg:function(t){p(t,this)},previewImg:function(t){_(t,this)},previewImgs:function(t){h(t,this)}}};e.default=s;var o=function(){var e=c(r.default.mark(function e(n,a,i,s){var o,l;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return o={url:a.basicConfig.url||""},e.next=3,t.uploadFile({url:o.url,filePath:i[s]["path"],name:"file",formData:{},success:function(){var e=c(r.default.mark(function e(n){var a,i;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:200==n.statusCode&&(a=JSON.parse(n.data),console.log(u("%c 后端上传(成功返回地址):".concat(a.data),"color:#1AAD19"," at components\\sunui-upimg\\sunui-upimg-basic.vue:106")),i=a.data,t.$emit("update",{imgUrl:i}));case 1:case"end":return e.stop()}},e,this)}));function n(t){return e.apply(this,arguments)}return n}(),fail:function(){var e=c(r.default.mark(function e(a){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t.showLoading({title:"上传失败!"}),n.upload_picture_list=[],n.upload_after_list=[],setTimeout(function(){t.hideLoading()},2e3),console.warn(u(a,"请检查是否CORB/CORS错误!"," at components\\sunui-upimg\\sunui-upimg-basic.vue:127"));case 5:case"end":return e.stop()}},e,this)}));function a(t){return e.apply(this,arguments)}return a}()});case 3:l=e.sent,l.onProgressUpdate(function(){var t=c(r.default.mark(function t(e){var u,a;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:u=0,a=n.upload_picture_list.length;case 1:if(!(u<a)){t.next=8;break}return t.next=4,e.progress;case 4:i[u]["upload_percent"]=t.sent;case 5:u++,t.next=1;break;case 8:n.upload_picture_list=i;case 9:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}());case 5:case"end":return e.stop()}},e,this)}));return function(t,n,u,r){return e.apply(this,arguments)}}(),l=function(){var t=c(r.default.mark(function t(e,n){var u,a;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:u=0,a=e.upload_picture_list.length;case 1:if(!(u<a)){t.next=8;break}if(0!=e.upload_picture_list[u]["upload_percent"]){t.next=5;break}return t.next=5,o(e,n,e.upload_picture_list,u);case 5:u++,t.next=1;break;case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}(),p=function(){var t=c(r.default.mark(function t(e,n){return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,n.$emit("onImgDel",{url:e.currentTarget.dataset.url,index:e.currentTarget.dataset.index});case 2:n.upload_picture_list.splice(e.currentTarget.dataset.index,1),n.upload_after_list.splice(e.currentTarget.dataset.index,1),n.upload_picture_list=n.upload_picture_list;case 5:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}(),f=function(e,n,a){var i={basicConfig:{url:a.basicConfig.url},count:n,notli:a.notli,sourceType:a.sourceType,sizeType:a.sizeType,tips:a.tips||!1};t.chooseImage({count:i.notli?i.count=9:0==e.upload_after_list.length?i.count:i.count-e.upload_after_list.length,sizeType:""==i.sizeType||void 0==i.sizeType||1==i.sizeType?["compressed"]:["original"],sourceType:""==i.sourceType||void 0==i.sourceType?["album","camera"]:"camera"==i.sourceType?["camera"]:"album"==i.sourceType?["album"]:["album","camera"],success:function(){var t=c(r.default.mark(function t(n){var a,c;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:for(a=0,c=n.tempFiles.length;a<c;a++)n.tempFiles[a]["upload_percent"]=0,n.tempFiles[a]["path_server"]="",e.upload_picture_list.push(n.tempFiles[a]),e.upload_picture_list.length>i.count&&(e.upload_picture_list=e.upload_picture_list.slice(0,i.count));return console.log(u("成功"," at components\\sunui-upimg\\sunui-upimg-basic.vue:194")),t.next=4,d(e,n,i);case 4:case"end":return t.stop()}},t,this)}));function n(e){return t.apply(this,arguments)}return n}()})},d=function(t,e,n){!n.notli&&n.count==t.upload_picture_list.length&&l(t,n),n.notli&&9==n.count&&l(t,n),t.upload_after_list=t.upload_after_list.concat(e.tempFilePaths).slice(0,n.count),t.upload_picture_list=t.upload_picture_list.slice(0,n.count)},_=function(e,n){t.previewImage({current:n.upload_after_list[e.currentTarget.dataset.index],urls:n.upload_after_list})},h=function(){var e=c(r.default.mark(function e(n,u){var a,i,c;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:for(a=[],i=0,c=u.upload_picture_list.length;i<c;i++)a.push(u.upload_picture_list[i].path_server);t.previewImage({current:n.currentTarget.dataset.src,urls:a});case 3:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()}).call(this,n("6e42")["default"],n("0de9")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sunui-upimg/sunui-upimg-basic-create-component',
    {
        'components/sunui-upimg/sunui-upimg-basic-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("1c64"))
        })
    },
    [['components/sunui-upimg/sunui-upimg-basic-create-component']]
]);