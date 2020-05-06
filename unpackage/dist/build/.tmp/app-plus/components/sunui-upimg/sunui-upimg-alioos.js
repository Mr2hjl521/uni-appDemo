(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/sunui-upimg/sunui-upimg-alioos"],{"703d":function(e,t,n){"use strict";n.r(t);var i=n("85d5"),r=n.n(i);for(var u in i)"default"!==u&&function(e){n.d(t,e,function(){return i[e]})}(u);t["default"]=r.a},"85d5":function(e,t,n){"use strict";(function(e,i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n("a34a"));function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,i,r,u,a){try{var c=e[u](a),s=c.value}catch(o){return void n(o)}c.done?t(s):Promise.resolve(s).then(i,r)}function c(e){return function(){var t=this,n=arguments;return new Promise(function(i,r){var u=e.apply(t,n);function c(e){a(u,i,r,c,s,"next",e)}function s(e){a(u,i,r,c,s,"throw",e)}c(void 0)})}}var s=n("a714"),o=n("c999");n("96de"),n("23a2");var l=n("811f"),p={data:function(){return{upload_after_list:[],upload_picture_list:[]}},name:"sunui-upimg",props:{upImgConfig:{type:Object}},created:function(){},methods:{initServerImage:function(e){this.upload_picture_list=e},chooseImage:function(e){m(this,parseInt(e),this.upImgConfig)},uploadimage:function(e){h(this,e)},deleteImg:function(e){g(e,this)},previewImg:function(e){y(e,this)},previewImgs:function(e){w(e,this)}}};t.default=p;var f=function(){var e=new Date;e.setHours(e.getHours()+s.timeout);var t=e.toISOString(),n={expiration:t,conditions:[["content-length-range",0,5242880]]},i=o.encode(JSON.stringify(n));return i},d=function(e,t){var n=e.upImgConfig.aliConfig.AccessKeySecret||s.AccessKeySecret,i=l.HMAC(l.SHA1,t,n,{asBytes:!0}),r=l.util.bytesToBase64(i);return r},_=function(){var t=c(r.default.mark(function t(n,u,a,s){var o,l,p,_,h,g,m;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return o={aliyunFileKey:"".concat(u.aliConfig.oosDirectory,"/")+(new Date).getTime()+Math.floor(150*Math.random())+".png",aliyunServerURL:u.aliConfig.url,accessid:u.aliConfig.OSSAccessKeyId,url:u.aliConfig.url||"",oos:u.aliConfig.oos||!1},l=o.aliyunFileKey?o.aliyunFileKey:"",p=o.aliyunServerURL?o.aliyunServerURL:"",_=o.accessid?o.accessid:"",h=f(),g=d(n,h),t.next=8,e.uploadFile({url:o.url,filePath:a[s]["path"],name:"file",formData:{key:l,policy:h,OSSAccessKeyId:_,signature:g,success_action_status:"200"},success:function(){var t=c(r.default.mark(function t(u){var c;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(200!=u.statusCode){t.next=10;break}return c=p+l,console.log(i("%c 阿里云上传(成功返回地址):".concat(c),"color:#1AAD19"," at components\\sunui-upimg\\sunui-upimg-alioos.vue:139")),a[s]["path_server"]=c,n.upload_picture_list=a,t.next=7,n.$emit("onUpImg",n.upload_picture_list);case 7:e.hideLoading(),t.next=15;break;case 10:e.showLoading({title:"上传失败!"}),setTimeout(function(){e.hideLoading()},2e3),n.upload_picture_list=[],n.upload_after_list=[],console.warn(i("阿里云上传图片失败,返回状态码:",u.statusCode," at components\\sunui-upimg\\sunui-upimg-alioos.vue:153"));case 15:case"end":return t.stop()}},t,this)}));function u(e){return t.apply(this,arguments)}return u}(),fail:function(){var t=c(r.default.mark(function t(n){return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e.showLoading({title:"上传失败!"}),setTimeout(function(){e.hideLoading()},2e3),console.log(i(n," at components\\sunui-upimg\\sunui-upimg-alioos.vue:163"));case 3:case"end":return t.stop()}},t,this)}));function n(e){return t.apply(this,arguments)}return n}()});case 8:m=t.sent,m.onProgressUpdate(function(){var e=c(r.default.mark(function e(t){var i,u;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:i=0,u=n.upload_picture_list.length;case 1:if(!(i<u)){e.next=8;break}return e.next=4,t.progress;case 4:a[i]["upload_percent"]=e.sent;case 5:i++,e.next=1;break;case 8:n.upload_picture_list=a;case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 10:case"end":return t.stop()}},t,this)}));return function(e,n,i,r){return t.apply(this,arguments)}}(),h=function(){var e=c(r.default.mark(function e(t,n){var i,u;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:i=0,u=t.upload_picture_list.length;case 1:if(!(i<u)){e.next=8;break}if(0!=t.upload_picture_list[i]["upload_percent"]){e.next=5;break}return e.next=5,_(t,n,t.upload_picture_list,i);case 5:i++,e.next=1;break;case 8:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),g=function(){var e=c(r.default.mark(function e(t,n){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$emit("onImgDel",{url:t.currentTarget.dataset.url,index:t.currentTarget.dataset.index});case 2:n.upload_picture_list.splice(t.currentTarget.dataset.index,1),n.upload_after_list.splice(t.currentTarget.dataset.index,1),n.upload_picture_list=n.upload_picture_list;case 5:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),m=function(t,n,i){var u={aliConfig:{AccessKeySecret:i.aliConfig.AccessKeySecret,OSSAccessKeyId:i.aliConfig.OSSAccessKeyId,oosDirectory:i.aliConfig.oosDirectory,url:i.aliConfig.url},count:n,tips:i.tips||!1,notli:i.notli,sourceType:i.sourceType,sizeType:i.sizeType};e.chooseImage({count:u.notli?u.count=9:0==t.upload_after_list.length?u.count:u.count-t.upload_after_list.length,sizeType:""==u.sizeType||void 0==u.sizeType||1==u.sizeType?["compressed"]:["original"],sourceType:""==u.sourceType||void 0==u.sourceType?["album","camera"]:"camera"==u.sourceType?["camera"]:"album"==u.sourceType?["album"]:["album","camera"],success:function(){var e=c(r.default.mark(function e(n){var i,a;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:for(i=0,a=n.tempFiles.length;i<a;i++)n.tempFiles[i]["upload_percent"]=0,n.tempFiles[i]["path_server"]="",t.upload_picture_list.push(n.tempFiles[i]),t.upload_picture_list.length>u.count&&(t.upload_picture_list=t.upload_picture_list.slice(0,u.count));return e.next=3,v(t,n,u);case 3:case"end":return e.stop()}},e,this)}));function n(t){return e.apply(this,arguments)}return n}()})},v=function(e,t,n){!n.notli&&n.count==e.upload_picture_list.length&&h(e,n),n.notli&&9==n.count&&h(e,n),e.upload_after_list=e.upload_after_list.concat(t.tempFilePaths).slice(0,n.count),e.upload_picture_list=e.upload_picture_list.slice(0,n.count)},y=function(t,n){e.previewImage({current:n.upload_after_list[t.currentTarget.dataset.index],urls:n.upload_after_list})},w=function(){var t=c(r.default.mark(function t(n,i){var u,a,c;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:for(u=[],a=0,c=i.upload_picture_list.length;a<c;a++)u.push(i.upload_picture_list[a].path_server);e.previewImage({current:n.currentTarget.dataset.src,urls:u});case 3:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()}).call(this,n("6e42")["default"],n("0de9")["default"])},"9aaf":function(e,t,n){"use strict";var i=n("c900"),r=n.n(i);r.a},bf92:function(e,t,n){"use strict";n.r(t);var i=n("e7ce"),r=n("703d");for(var u in r)"default"!==u&&function(e){n.d(t,e,function(){return r[e]})}(u);n("9aaf");var a,c=n("f0c5"),s=Object(c["a"])(r["default"],i["b"],i["c"],!1,null,"5e5c9cc7",null,!1,i["a"],a);t["default"]=s.exports},c900:function(e,t,n){},e7ce:function(e,t,n){"use strict";var i,r=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",function(){return r}),n.d(t,"c",function(){return u}),n.d(t,"a",function(){return i})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sunui-upimg/sunui-upimg-alioos-create-component',
    {
        'components/sunui-upimg/sunui-upimg-alioos-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("bf92"))
        })
    },
    [['components/sunui-upimg/sunui-upimg-alioos-create-component']]
]);
