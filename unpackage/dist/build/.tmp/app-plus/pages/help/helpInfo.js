(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/help/helpInfo"],{"1e17":function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{callWindow:!1,unpay:!1,serviceUserPhone:"",remindWindow:!1,overtime:!1,takeDeliveryOrderId:"",userId:"",typeArr:["等待快递员取包裹","包裹已取,正在派送中","包裹已签收","等待快递员二次配送","领取超时,异常处理","自取,请尽快取件"],info:{},OrderInfo:[],current:0}},onLoad:function(t){var r=this,n=Number(t.takeDeliveryOrderId);this.takeDeliveryOrderId=n,this.Get("http://39.99.137.77:8081/projects/takeDeliveryOrder/findById?id="+n,{},function(e){7==e.status&&(r.unpay=!0),r.info=e,r.serviceUserPhone=e.serviceUserPhone,r.takeDeliveryOrderId=e.takeDeliveryOrderId;for(var t=e.parcelBoList[0].list,n=0;n<t.length;n++)0==t[n].status&&r.OrderInfo.push({status:t[n].status,serviceCompany:t[n].logisticsName,address:t[n].pickupAddress,number:t[n].pickCode,show:999,type:r.typeArr[t[n].status],parcelId:t[n].parcelId,packageName:t[n].name,packagePhone:t[n].phone}),1==t[n].status&&r.OrderInfo.push({status:t[n].status,serviceCompany:t[n].logisticsName,address:t[n].pickupAddress,number:t[n].pickCode,show:1,type:r.typeArr[t[n].status],parcelId:t[n].parcelId,packageName:t[n].name,packagePhone:t[n].phone}),2==t[n].status&&r.OrderInfo.push({status:t[n].status,serviceCompany:t[n].logisticsName,address:t[n].pickupAddress,number:t[n].pickCode,show:2,type:r.typeArr[t[n].status],parcelId:t[n].parcelId,packageName:t[n].name,packagePhone:t[n].phone}),3==t[n].status&&r.OrderInfo.push({status:t[n].status,serviceCompany:t[n].logisticsName,address:t[n].pickupAddress,number:t[n].pickCode,show:1,type:r.typeArr[t[n].status],parcelId:t[n].parcelId,packageName:t[n].name,packagePhone:t[n].phone}),4==t[n].status&&(r.overtime=!0,r.OrderInfo.push({status:t[n].status,serviceCompany:t[n].logisticsName,address:t[n].pickupAddress,number:t[n].pickCode,show:4,type:r.typeArr[t[n].status],parcelId:t[n].parcelId,packageName:t[n].name,packagePhone:t[n].phone})),5==t[n].status&&(r.OrderInfo.push({status:t[n].status,serviceCompany:t[n].logisticsName,address:t[n].pickupAddress,number:t[n].pickCode,show:1,type:r.typeArr[t[n].status],parcelId:t[n].parcelId,packageName:t[n].name,packagePhone:t[n].phone}),r.callWindow=!0)});var a=e.getStorageSync("userId");a&&(this.userId=Number(a))},onShow:function(){},onReady:function(){},onPageScroll:function(e){},onReachBottom:function(){},mounted:function(){},methods:{deleteOrder:function(){var t=this,r=t.takeDeliveryOrderId;e.showModal({title:"提示",content:"是否确认取消订单？",success:function(n){n.confirm?t.Delete("http://39.99.137.77:8081/projects/takeDeliveryOrder?id="+r,{},function(t){e.navigateTo({url:"./myHelp"})}):n.cancel}})},toPay:function(){e.navigateTo({url:"./pay?orderId="+this.takeDeliveryOrderId})},goBack:function(){e.switchTab({url:"../tabBar/home/home"})},openWindow:function(){this.remindWindow=!0},mycall:function(){var t=this.serviceUserPhone;e.makePhoneCall({phoneNumber:t})},ziqu:function(){var t=this;this.Post("http://39.99.137.77:8081/projects/takeDeliveryOrder/clientUserAllSelfPick",{clientUserId:this.userId,status:5,takeDeliveryOrderId:this.takeDeliveryOrderId},function(r){t.remindWindow=!1,e.showLoading({title:"成功"}),setTimeout(function(){e.navigateTo({url:"./myHelp"})},1e3)})},closeWindows:function(){this.remindWindow=!1},repay:function(){var t=this;e.showModal({title:"提示",content:"是否确认重新下单？",success:function(r){r.confirm?t.Post("http://39.99.137.77:8081/projects/takeDeliveryOrder/clientUserAllSelfPick",{clientUserId:t.userId,status:6,takeDeliveryOrderId:t.takeDeliveryOrderId},function(r){t.remindWindow=!1,e.showLoading({title:"成功"}),setTimeout(function(){e.hideLoading()},1e3);var n=r;e.navigateTo({url:"../../../../help/pay?orderId="+n})}):r.cancel}})},ok:function(t,r){var n=this;e.showModal({title:"提示",content:"是否确定收件？",success:function(a){if(a.confirm){var s=n.OrderInfo[r].parcelId;e.getStorage({key:"userId",success:function(a){var o=Number(a.data);n.Post("http://39.99.137.77:8081/projects/takeDeliveryOrder/updateDeliveryOrderAndParcelByStatus",{clientUserId:o,parcelId:s,status:2,takeDeliveryOrderId:n.takeDeliveryOrderId},function(a){t=!t,n.OrderInfo[r].show=!n.OrderInfo[r].show,n.OrderInfo[r].type="包裹已取件",n.showUpImg=!n.showUpImg,e.showToast({title:"已取件",icon:"success"})})}})}else a.cancel}})},Post:function(t,r,n){e.request({method:"POST",url:t,data:r,header:{"Content-Type":"application/json"},success:function(e){n(e.data)},fail:function(e){alert(e.data)}})},Get:function(t,r,n){e.request({url:t,data:r,header:{"Content-Type":"application/json"},success:function(e){n(e.data)},fail:function(e){n(e)}})},Delete:function(t,r,n){e.request({method:"DELETE",url:t,data:r,header:{"Content-Type":"application/json"},success:function(e){n(e.data)},fail:function(e){alert(e.data)}})}}};t.default=r}).call(this,r("6e42")["default"])},"393d":function(e,t,r){"use strict";r.r(t);var n=r("1e17"),a=r.n(n);for(var s in n)"default"!==s&&function(e){r.d(t,e,function(){return n[e]})}(s);t["default"]=a.a},"401d":function(e,t,r){"use strict";r.r(t);var n=r("7452"),a=r("393d");for(var s in a)"default"!==s&&function(e){r.d(t,e,function(){return a[e]})}(s);r("eb22");var o,i=r("f0c5"),c=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);t["default"]=c.exports},"614f":function(e,t,r){"use strict";(function(e){r("5925"),r("921b");n(r("66fd"));var t=n(r("401d"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("6e42")["createPage"])},7452:function(e,t,r){"use strict";var n,a=function(){var e=this,t=e.$createElement;e._self._c},s=[];r.d(t,"b",function(){return a}),r.d(t,"c",function(){return s}),r.d(t,"a",function(){return n})},add9:function(e,t,r){},eb22:function(e,t,r){"use strict";var n=r("add9"),a=r.n(n);a.a}},[["614f","common/runtime","common/vendor"]]]);