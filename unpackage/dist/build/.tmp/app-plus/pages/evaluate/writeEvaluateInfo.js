(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/evaluate/writeEvaluateInfo"],{"0f40":function(t,i,o){"use strict";o.r(i);var e=o("116a"),a=o("3b02");for(var n in a)"default"!==n&&function(t){o.d(i,t,function(){return a[t]})}(n);o("d8e0");var s,h=o("f0c5"),r=Object(h["a"])(a["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],s);i["default"]=r.exports},"116a":function(t,i,o){"use strict";var e,a=function(){var t=this,i=t.$createElement;t._self._c},n=[];o.d(i,"b",function(){return a}),o.d(i,"c",function(){return n}),o.d(i,"a",function(){return e})},"3b02":function(t,i,o){"use strict";o.r(i);var e=o("ed16"),a=o.n(e);for(var n in e)"default"!==n&&function(t){o.d(i,t,function(){return e[t]})}(n);i["default"]=a.a},"45fc":function(t,i,o){"use strict";(function(t){o("5925"),o("921b");e(o("66fd"));var i=e(o("0f40"));function e(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,o("6e42")["createPage"])},a673:function(t,i,o){},d8e0:function(t,i,o){"use strict";var e=o("a673"),a=o.n(e);a.a},ed16:function(t,i,o){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=a(o("a4a1"));function a(t){return t&&t.__esModule?t:{default:t}}var n={data:function(){return{showCategoryIndex:0,headerPosition:"fixed",city:"北京",categoryList:["华为","vivo","小米","魅族","OPPO"],smallCategory:[{name:"机型1",img:"/static/img/goods/p1.jpg"},{name:"机型2",img:"/static/img/goods/p2.jpg"},{name:"机型3",img:"/static/img/goods/p3.jpg"},{name:"机型4",img:"/static/img/goods/p4.jpg"},{name:"机型5",img:"/static/img/goods/phone1.jpg"},{name:"机型6",img:"/static/img/goods/phone2.jpg"},{name:"机型7",img:"/static/img/goods/phone3.jpg"},{name:"机型8",img:"/static/img/goods/phone4.jpg"}],title:"radio",items1:[{value:"1",name:"正常进入桌面"},{value:"4",name:"全新包装未拆封"},{value:"0",name:"无法开机/无法进入桌面"}],items2:[{value:"4",name:"完美无任何瑕疵"},{value:"3",name:"明显划痕/磕碰/掉漆"},{value:"2",name:"外壳裂痕/变形/刻字"},{value:"1",name:"全新包装未拆封"}],items3:[{value:"4",name:"屏幕无任何划痕"},{value:"3",name:"屏幕少量细微划痕"},{value:"1",name:"明显划痕/缺角/裂碎"}],items4:[{value:"4",name:"显示完美几乎全新"},{value:"3",name:"显示细微色素/泛黄"},{value:"2",name:"明显色斑/漏液/老化"},{value:"1",name:"屏幕无法正常显示"}],items5:[{value:"2",name:"A1864-全网通"},{value:"1",name:"其他"}],items6:[{value:"2",name:"256G"},{value:"1",name:"64G"}],items7:[{value:"1",name:"大陆国行"},{value:"3",name:"国航官换机"},{value:"2",name:"香港行货"},{value:"4",name:"国航显示机"},{value:"5",name:"非国航港行-无锁"},{value:"6",name:"非国航港行-有锁"}],items8:[{value:"1",name:"金色"},{value:"2",name:"黑色"},{value:"3",name:"白色"},{value:"4",name:"红色"}],items9:[{value:"2",name:"保修期剩余一个月以上"},{value:"1",name:"过保/保修期不足一个月"}],items10:[{value:"2",name:"账户可退出"},{value:"1",name:"账户无法退出"}],items11:[{value:"3.3",name:"无维修情况"},{value:"2",name:"屏幕维修"},{value:"1",name:"屏幕和主板均有维修"}],all:"",choices:"",current:0,option1:"",option2:"",option3:"",option4:"",option5:"",option6:"",option7:"",option8:"",option9:"",option10:"",option11:"",items:[{value:"触摸失灵/延迟",name:"触摸失灵/延迟"},{value:"机身进水或受潮",name:"机身进水或受潮"},{value:"机身弯曲",name:"机身弯曲"},{value:"更换过电池/摄像头/外壳/尾插",name:"更换过电池/摄像头/外壳/尾插"},{value:"通话功能不正常",name:"通话功能不正常"},{value:"指纹无法完成录入和解锁",name:"指纹无法完成录入和解锁"},{value:"拍照模糊/有斑/功能异常",name:"拍照模糊/有斑/功能异常"},{value:"无线无法打开/无法连接",name:"无线无法打开/无法连接"},{value:"光线/距离感应不正常",name:"光线/距离感应不正常"},{value:"充电无反应/充电接触不良",name:"充电无反应/充电接触不良"},{value:"震动不正常",name:"震动不正常"}]}},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onLoad:function(){var t=this;this.amapPlugin=new e.default.AMapWX({key:"7c235a9ac4e25e482614c6b8eac6fd8e"}),this.amapPlugin.getRegeo({success:function(i){t.city=i[0].regeocodeData.addressComponent.city.replace(/市/g,"")}})},methods:{toEvaluate:function(){t.navigateTo({url:"./evaluate"})},toMsg:function(){t.navigateTo({url:"../../msg/msg"})},radioChange:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=parseFloat(t.target.value);this.option1=o;var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange2:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=parseFloat(t.target.value);this.option2=o;var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange3:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=parseFloat(t.target.value);this.option3=o;var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange4:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=parseFloat(t.target.value);this.option4=o;var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange5:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=t.target.value;this.option5=parseFloat(o);var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange6:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=t.target.value;this.option6=parseFloat(o);var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange7:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=parseFloat(t.target.value);this.option7=o;var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange8:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=parseFloat(t.target.value);this.option8=o;var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange9:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=parseFloat(t.target.value);this.option9=o;var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange10:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=parseFloat(t.target.value);this.option10=o;var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},radioChange11:function(t){for(var i=0;i<this.items.length;i++)if(this.items[i].value===t.target.value){this.current=i;break}var o=parseFloat(t.target.value);this.option11=o;var e=this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;this.all=e},checkboxChange:function(t){for(var i=this.items,o=t.detail.value,e=0,a=i.length;e<a;++e){var n=i[e];o.includes(n.value)?this.$set(n,"checked",!0):this.$set(n,"checked",!1)}var s=o.length;this.choices=-1*s},ok:function(){t.navigateTo({url:"../evaluate/evaluateResult"})},Post:function(i,o,e){t.request({method:"POST",url:i,data:o,header:{"Content-Type":"application/json"},success:function(t){e(t.data)},fail:function(t){alert(t.data)}})},Get:function(i,o,e){t.request({url:i,data:o,header:{"Content-Type":"application/json"},success:function(t){e(t.data)},fail:function(t){e(t)}})}}};i.default=n}).call(this,o("6e42")["default"])}},[["45fc","common/runtime","common/vendor"]]]);