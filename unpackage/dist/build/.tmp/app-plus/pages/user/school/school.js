(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/school/school"],{1969:function(e,t,r){"use strict";(function(e){r("5925"),r("921b");o(r("66fd"));var t=o(r("b438"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("6e42")["createPage"])},"23df":function(e,t,r){"use strict";var o,s=function(){var e=this,t=e.$createElement;e._self._c},n=[];r.d(t,"b",function(){return s}),r.d(t,"c",function(){return n}),r.d(t,"a",function(){return o})},"3be6":function(e,t,r){},7308:function(e,t,r){"use strict";r.r(t);var o=r("e5ff"),s=r.n(o);for(var n in o)"default"!==n&&function(e){r.d(t,e,function(){return o[e]})}(n);t["default"]=s.a},b438:function(e,t,r){"use strict";r.r(t);var o=r("23df"),s=r("7308");for(var n in s)"default"!==n&&function(e){r.d(t,e,function(){return s[e]})}(n);r("cfa0");var i,a=r("f0c5"),c=Object(a["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=c.exports},cfa0:function(e,t,r){"use strict";var o=r("3be6"),s=r.n(o);s.a},e5ff:function(e,t,r){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n(r("a34a"));function n(e){return e&&e.__esModule?e:{default:e}}function i(e,t,r,o,s,n,i){try{var a=e[n](i),c=a.value}catch(u){return void r(u)}a.done?t(c):Promise.resolve(c).then(o,s)}function a(e){return function(){var t=this,r=arguments;return new Promise(function(o,s){var n=e.apply(t,r);function a(e){i(n,o,s,a,c,"next",e)}function c(e){i(n,o,s,a,c,"throw",e)}a(void 0)})}}var c=function(){return r.e("components/mpvue-picker/mpvuePicker").then(r.bind(null,"64fe"))},u={components:{mpvuePicker:c},data:function(){return{show1:!1,show5:!1,newSchoolData:"",serachFlag:1,floorNumber:"几号楼",serviceName:"请选择服务类型",selectItem:["手机贴膜","代取快递","快递点"],select:!1,serviceType:"",name:"",age:"",doorNumber:"",des:"我是新人请多多指教",sex:"1",schoolIdArr:[],schoolId:"",buildingIdArr:[],buildingId:"",userId:"",pickerSingleArray:[],themeColor:"#007AFF",pickerText:"",mode:"",deepLength:1,pickerValueDefault:[0],pickerValueArray:[],img:"",imgUrl:"",schoolData:"",src:"",items:[{value:"1",name:"男",checked:"true",src:"/static/img/n.png"},{value:"0",name:"女",src:"/static/img/g.png"}],current:"",showPicker:!1,date:"2019/10/01",type:"rangetime",value:"",basicArr:[],upImgBasic:{basicConfig:{url:"http://39.99.137.77:8081/projects/image/userAvatarImage/upload?userId=1"},notli:!1,count:2,sourceType:"all",sizeType:!0,upBgColor:"#E8A400",upIconColor:"#fff",delBtnLocation:""}}},onLoad:function(){var t=this;e.getStorage({key:"userId",success:function(e){var r=e.data;t.userId=Number(e.data),t.upImgBasic.basicConfig.url="http://39.99.137.77:8081/projects/image/userAvatarImage/upload?userId="+e.data,t.Get("http://39.99.137.77:8081/projects/campus/findAll",{clientUserId:r},function(e){for(var r=e.list,o=0;o<r.length;o++)t.pickerSingleArray.push({label:r[o].campusName,value:r[o].status}),t.schoolIdArr.push(r[o].id)})}})},methods:{openSearch:function(){this.serachFlag=1,this.newSchoolData=this.schoolData,this.show1=!0},showBuilding:function(){var t=this;if(e.hideKeyboard(),this.show6=!1,""==this.newSchoolData)return this.schoolId="",void e.showModal({title:"提示",content:"请确保您已选择学校"});e.hideKeyboard(),this.pickerBuilding=[],this.buildingIdArr=[],this.Get("http://39.99.137.77:8081/projects/floor/findFloorByCampusId",{campusId:this.schoolId},function(r){console.log(o(r," at pages\\user\\school\\school.vue:234"));var s=r;if(s.length>0){for(var n=0;n<s.length;n++)t.pickerBuilding.push({label:s[n].floorNumber,value:s[n].campusId}),t.buildingIdArr.push(s[n].campusId);t.pickerValueArray=t.pickerBuilding,t.mode="selector",t.deepLength=1,t.pickerValueDefault=[0],t.$refs.mpbuilding.show()}else t.floorNumber="几号楼",console.log(o(t.floorNumber," at pages\\user\\school\\school.vue:252")),""==t.schoolId?e.showModal({title:"提示",content:"请确保您已选择学校，并且学校是由搜索得来"}):e.showModal({title:"提示",content:"当前所选学校暂无楼号可选，请选择其他学校"})})},myselect:function(){this.select=!0},mycheck:function(e){this.select=!this.select,this.serviceType=e,this.serviceName=this.selectItem[e]},radioChange:function(t){e.hideKeyboard();for(var r=0;r<this.items.length;r++)if(this.items[r].value===t.target.value){this.current=r;break}this.sex=Number(t.target.value)},uImageTap:function(){var t=this;t.$refs.uImage.uploadimage(t.upImgBasic),e.$once("update",function(e){t.imgUrl=e.imgUrl[0]}),setTimeout(function(){""==t.imgUrl?e.showModal({title:"提示",content:"亲爱的用户，申请校园代理头像是必填项哦，快去上传吧！",success:function(e){e.confirm||e.cancel}}):""!==t.schoolId&&""!==t.age&&""!==t.doorNumber&&""!==t.floorNumber&&""!==t.name&&""!==t.serviceType&&""!==t.sex?e.getStorage({key:"userId",success:function(r){r.data;t.userId=Number(r.data),t.Post("http://39.99.137.77:8081/projects/serviceUser",{campusId:t.schoolId,age:t.age,avatarUrl:t.imgUrl,clientUserId:t.userId,doorNumber:t.doorNumber,floorNumber:t.floorNumber,name:t.name,personalDesc:t.des,serviceType:t.serviceType,sex:t.sex},function(t){e.navigateTo({url:"/pages/user/school/checking"})})}}):e.showModal({title:"提示",content:"亲爱的用户，信息未填写完全，请继续填写",success:function(e){e.confirm||e.cancel}})},1500)},delImgInfo:function(){var e=a(s.default.mark(function e(t){return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),upBasicData:function(){var t=a(s.default.mark(function t(r){var o,n,i;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:o=[],n=0,i=r.length;case 2:if(!(n<i)){t.next=14;break}if(t.prev=3,""==r[n].path_server){t.next=7;break}return t.next=7,o.push(r[n].path_server.split(","));case 7:t.next=11;break;case 9:t.prev=9,t.t0=t["catch"](3);case 11:n++,t.next=2;break;case 14:this.basicArr=o,o.length==this.upImgBasic.count&&e.showToast({title:"上传成功",icon:"none"});case 16:case"end":return t.stop()}},t,this,[[3,9]])}));function r(e){return t.apply(this,arguments)}return r}(),getUpImgInfoBasic:function(){},toPass:function(){e.navigateTo({url:"../../user/setting/modifiedData"})},toUnPass:function(){e.navigateTo({url:"./unapproved"})},Post:function(t,r,o){e.request({method:"POST",url:t,data:r,header:{"Content-Type":"application/json"},success:function(e){o(e.data)},fail:function(e){alert(e.data)}})},Get:function(t,r,o){e.request({url:t,data:r,header:{"Content-Type":"application/json"},success:function(e){o(e.data)},fail:function(e){o(e)}})},showSinglePicker:function(){var t=this;e.hideKeyboard(),this.show6=!1,this.pickerSingleArray=[],this.schoolIdArr=[],this.Get("http://39.99.137.77:8081/projects/campus/keyWordsSeach",{campusName:this.schoolData},function(e){console.log(o(e," at pages\\user\\school\\school.vue:458"));for(var r=e,s=0;s<r.length;s++)t.pickerSingleArray.push({label:r[s].campusName,value:r[s].status}),t.schoolIdArr.push(r[s].id)}),this.pickerValueArray=this.pickerSingleArray,this.mode="selector",this.deepLength=1,this.pickerValueDefault=[0],this.$refs.mpvuePicker.show()},onConfirm:function(t){e.hideKeyboard(),this.pickerText=JSON.stringify(t),this.schoolData=t.label;var r=Number(t.index);this.schoolId=this.schoolIdArr[r],this.schoolData=t.label,this.newSchoolData=t.label,this.serachFlag=0,this.show1=!1},onBuilding:function(t){e.hideKeyboard(),this.show1=!1;var r=Number(t.index);this.buildingId=this.buildingIdArr[r],this.floorNumber=t.label,this.show5=!0}},onBackPress:function(){if(this.$refs.mpvuePicker.showPicker)return this.$refs.mpvuePicker.pickerCancel(),!0}};t.default=u}).call(this,r("6e42")["default"],r("0de9")["default"])}},[["1969","common/runtime","common/vendor"]]]);