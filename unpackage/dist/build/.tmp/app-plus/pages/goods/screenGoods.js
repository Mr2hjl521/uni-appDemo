(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/screenGoods"],{"11d5":function(e,t,o){"use strict";var s,n=function(){var e=this,t=e.$createElement;e._self._c},a=[];o.d(t,"b",function(){return n}),o.d(t,"c",function(){return a}),o.d(t,"a",function(){return s})},"175d":function(e,t,o){"use strict";var s=o("1fad"),n=o.n(s);n.a},"1fad":function(e,t,o){},"24ac":function(e,t,o){"use strict";o.r(t);var s=o("11d5"),n=o("2696");for(var a in n)"default"!==a&&function(e){o.d(t,e,function(){return n[e]})}(a);o("175d");var i,c=o("f0c5"),r=Object(c["a"])(n["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],i);t["default"]=r.exports},2696:function(e,t,o){"use strict";o.r(t);var s=o("9bce"),n=o.n(s);for(var a in s)"default"!==a&&function(e){o.d(t,e,function(){return s[e]})}(a);t["default"]=n.a},"431e":function(e,t,o){"use strict";(function(e){o("5925"),o("921b");s(o("66fd"));var t=s(o("24ac"));function s(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])},"9bce":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{commentsNum:"",ppcId:"",ppcIds:[],num:1,userId:"",screenGoodsId:"",beforeHeaderzIndex:11,afterHeaderzIndex:10,beforeHeaderOpacity:1,afterHeaderOpacity:0,showBack:!0,swiperList:[],currentSwiper:0,anchorlist:[],selectAnchor:0,serviceClass:"",specClass:"",shareClass:"",goodsData:{id:"",name:"",price:"",number:"",service:[{name:"正品保证",description:"此商品官方保证为正品"},{name:"极速退款",description:"此商品享受退货极速退款服务"},{name:"7天退换",description:"此商品享受7天无理由退换服务"}],spec:[],comment:{number:"",avatarUrl:"",userName:"",desc:""},productDetailsImages:[]},selectSpec:null,isKeep:!1}},onLoad:function(e){var t=this;this.screenGoodsId=Number(e.id),this.Get("http://39.99.137.77:8081/projects/phoneFilm/findById",{id:e.id},function(e){var o=t;o.commentsNum=e.number,o.goodsData.productDetailsImages=e.phoneFilmDetailsImages;for(var s=e.phoneFilmImages,n=0;n<s.length;n++)o.swiperList.push({img:s[n],id:n});o.goodsData.price=e.filmPrice,o.goodsData.name=e.filmName;var a=e.phoneFilmColorBos;for(n=0;n<a.length;n++)o.goodsData.spec.push({name:a[n].colorName,ppcId:a[n].ppcId});for(var i=0;i<a.length;i++)o.ppcIds.push(a[i].ppcId);""==e.appraisalBo||null==e.appraisalBo||(o.goodsData.comment=e.appraisalBo)})},onReady:function(){this.calcAnchor()},onPageScroll:function(e){this.selectAnchor=e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;var t=375;e.scrollTop=e.scrollTop>t?375:e.scrollTop,this.afterHeaderOpacity=e.scrollTop*(1/t),this.beforeHeaderOpacity=1-this.afterHeaderOpacity,this.beforeHeaderzIndex=e.scrollTop>0?10:11,this.afterHeaderzIndex=e.scrollTop>0?11:10},onReachBottom:function(){},mounted:function(){},methods:{swiperChange:function(e){this.currentSwiper=e.detail.current},toBook:function(){if(""==this.ppcId)this.specClass="show";else{var t=this;e.getStorage({key:"userId",success:function(o){var s=o.data;e.setStorage({key:"ppcId",data:t.ppcId,success:function(){t.Get("http://39.99.137.77:8081/projects/clientUserAddress/selectBooleanAddress",{clientUserId:s},function(t){1==t.flag&&e.navigateTo({url:"../evaluate/bookingServiceStaff"}),0==t.flag&&e.showModal({title:"提示",content:"完善信息后才能预约服务人员，是否去完善？",success:function(t){t.confirm?e.navigateTo({url:"/pages/help/wanshanTwo"}):t.cancel}})})}})}})}},toMsg:function(){e.showToast({title:"敬请期待",icon:"none"})},toChat:function(){e.showToast({title:"敬请期待",icon:"none"})},share:function(){this.shareClass="show"},hideShare:function(){var e=this;this.shareClass="hide",setTimeout(function(){e.shareClass="none"},150)},keep:function(){this.isKeep=!this.isKeep},joinCart:function(){e.showToast({title:"敬请期待",icon:"none"})},buy:function(){var e=this;if(null==this.selectSpec)return this.showSpec(function(){e.toConfirmation()});this.toConfirmation()},toRatings:function(){var t=this.screenGoodsId;e.navigateTo({url:"ratings/ratings?id="+t})},toConfirmation:function(){var t=[],o={id:this.goodsData.id,img:"../../static/img/goods/p1.jpg",name:this.goodsData.name,spec:"规格:"+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};t.push(o),e.setStorage({key:"buylist",data:t,success:function(){e.navigateTo({url:"../order/confirmation"})}})},showComments:function(e){},setSelectSpec:function(e){this.selectSpec=e,this.ppcId=this.ppcIds[this.selectSpec]},sub:function(){this.goodsData.number<=1||this.goodsData.number--},add:function(){this.goodsData.number++},toAnchor:function(t){this.selectAnchor=t,e.pageScrollTo({scrollTop:this.anchorlist[t].top,duration:200})},calcAnchor:function(){var t=this;this.anchorlist=[{name:"主图",top:0},{name:"评价",top:0},{name:"详情",top:0}];var o=e.createSelectorQuery().select("#comments");o.boundingClientRect(function(o){var s=0;s=plus.navigator.getStatusbarHeight();var n=e.upx2px(100);t.anchorlist[1].top=o.top-n-s,t.anchorlist[2].top=o.bottom-n-s}).exec()},back:function(){e.navigateBack({delta:1})},showService:function(){this.serviceClass="show"},hideService:function(){var e=this;this.serviceClass="hide",setTimeout(function(){e.serviceClass="none"},200)},showSpec:function(e){this.specClass="show",this.specCallback=e},specCallback:function(){},hideSpec:function(){var e=this;this.specClass="hide",this.selectSpec&&this.specCallback&&this.specCallback(),this.specCallback=!1,setTimeout(function(){e.specClass="none"},200)},discard:function(){},Post:function(t,o,s){e.request({method:"POST",url:t,data:o,header:{"Content-Type":"application/json"},success:function(e){s(e.data)},fail:function(e){alert("信息错误")}})},Get:function(t,o,s){e.request({url:t,data:o,header:{"Content-Type":"application/json"},success:function(e){s(e.data)},fail:function(e){alert("信息错误")}})}}};t.default=o}).call(this,o("6e42")["default"])}},[["431e","common/runtime","common/vendor"]]]);