(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods"],{"3e9e":function(t,e,i){"use strict";i.r(e);var n=i("9576"),o=i("9620");for(var s in o)"default"!==s&&function(t){i.d(e,t,function(){return o[t]})}(s);i("f8ba");var c,a=i("f0c5"),r=Object(a["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=r.exports},"67fe":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{beforeHeaderzIndex:11,afterHeaderzIndex:10,beforeHeaderOpacity:1,afterHeaderOpacity:0,showBack:!0,swiperList:[{id:1,img:"http://img0.imgtn.bdimg.com/it/u=2750647803,1855444243&fm=11&gp=0.jpg"},{id:2,img:"http://img0.imgtn.bdimg.com/it/u=268675669,370417397&fm=26&gp=0.jpg"},{id:3,img:"http://img5.imgtn.bdimg.com/it/u=3705535377,63162554&fm=26&gp=0.jpg"},{id:4,img:"http://img3.imgtn.bdimg.com/it/u=3336237833,1050223670&fm=15&gp=0.jpg"}],currentSwiper:0,anchorlist:[],selectAnchor:0,serviceClass:"",specClass:"",shareClass:"",goodsData:{id:1,name:"VivoX20",price:"127.00",number:1,service:[{name:"正品保证",description:"此商品官方保证为正品"},{name:"极速退款",description:"此商品享受退货极速退款服务"},{name:"7天退换",description:"此商品享受7天无理由退换服务"}],spec:["64G","128G","256G"],comment:{number:102,userface:"../../static/img/face.jpg",username:"叮当猫",content:"很不错，之前买的，很好看，和图片色差不大，值得购买！"}},selectSpec:null,isKeep:!1,descriptionStr:'<div style="text-align:center;"><img width="100%" src="http://img0.imgtn.bdimg.com/it/u=2750647803,1855444243&fm=11&gp=0.jpg"/><img width="100%" src="http://img0.imgtn.bdimg.com/it/u=268675669,370417397&fm=26&gp=0.jpg"/><img width="100%" src="http://img5.imgtn.bdimg.com/it/u=3705535377,63162554&fm=26&gp=0.jpg"/></div>'}},onLoad:function(t){},onReady:function(){this.calcAnchor()},onPageScroll:function(t){this.selectAnchor=t.scrollTop>=this.anchorlist[2].top?2:t.scrollTop>=this.anchorlist[1].top?1:0;var e=375;t.scrollTop=t.scrollTop>e?375:t.scrollTop,this.afterHeaderOpacity=t.scrollTop*(1/e),this.beforeHeaderOpacity=1-this.afterHeaderOpacity,this.beforeHeaderzIndex=t.scrollTop>0?10:11,this.afterHeaderzIndex=t.scrollTop>0?11:10},onReachBottom:function(){t.showToast({title:"触发上拉加载"})},mounted:function(){},methods:{swiperChange:function(t){this.currentSwiper=t.detail.current},toMsg:function(){t.navigateTo({url:"../msg/msg"})},toChat:function(){t.navigateTo({url:"../msg/chat/chat?name=客服008"})},share:function(){this.shareClass="show"},hideShare:function(){var t=this;this.shareClass="hide",setTimeout(function(){t.shareClass="none"},150)},keep:function(){this.isKeep=!this.isKeep},joinCart:function(){if(null==this.selectSpec)return this.showSpec(function(){t.showToast({title:"已加入购物车"})});t.showToast({title:"已加入购物车"})},buy:function(){var t=this;if(null==this.selectSpec)return this.showSpec(function(){t.toConfirmation()});this.toConfirmation()},toRatings:function(){t.navigateTo({url:"ratings/ratings"})},toConfirmation:function(){var e=[],i={id:this.goodsData.id,img:"../../static/img/goods/p1.jpg",name:this.goodsData.name,spec:"规格:"+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};e.push(i),t.setStorage({key:"buylist",data:e,success:function(){t.navigateTo({url:"../order/confirmation"})}})},showComments:function(t){},setSelectSpec:function(t){this.selectSpec=t},sub:function(){this.goodsData.number<=1||this.goodsData.number--},add:function(){this.goodsData.number++},toAnchor:function(e){this.selectAnchor=e,t.pageScrollTo({scrollTop:this.anchorlist[e].top,duration:200})},calcAnchor:function(){var e=this;this.anchorlist=[{name:"主图",top:0},{name:"评价",top:0},{name:"详情",top:0}];var i=t.createSelectorQuery().select("#comments");i.boundingClientRect(function(i){var n=0;n=plus.navigator.getStatusbarHeight();var o=t.upx2px(100);e.anchorlist[1].top=i.top-o-n,e.anchorlist[2].top=i.bottom-o-n}).exec()},back:function(){t.switchTab({url:"/pages/tabBar/home/home"})},showService:function(){this.serviceClass="show"},hideService:function(){var t=this;this.serviceClass="hide",setTimeout(function(){t.serviceClass="none"},200)},showSpec:function(t){this.specClass="show",this.specCallback=t},specCallback:function(){},hideSpec:function(){var t=this;this.specClass="hide",this.selectSpec&&this.specCallback&&this.specCallback(),this.specCallback=!1,setTimeout(function(){t.specClass="none"},200)},discard:function(){}}};e.default=i}).call(this,i("6e42")["default"])},9576:function(t,e,i){"use strict";var n,o=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"b",function(){return o}),i.d(e,"c",function(){return s}),i.d(e,"a",function(){return n})},9620:function(t,e,i){"use strict";i.r(e);var n=i("67fe"),o=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=o.a},"97f8":function(t,e,i){},ecde:function(t,e,i){"use strict";(function(t){i("5925"),i("921b");n(i("66fd"));var e=n(i("3e9e"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("6e42")["createPage"])},f8ba:function(t,e,i){"use strict";var n=i("97f8"),o=i.n(n);o.a}},[["ecde","common/runtime","common/vendor"]]]);