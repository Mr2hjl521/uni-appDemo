(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/deposit/deposit"],{"0c96":function(t,n,o){"use strict";o.r(n);var e=o("21cb"),u=o.n(e);for(var i in e)"default"!==i&&function(t){o.d(n,t,function(){return e[t]})}(i);n["default"]=u.a},"1a16":function(t,n,o){},"21cb":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{inputAmount:"",amountList:[10,50,100],paytype:"alipay"}},methods:{select:function(t){this.inputAmount=t},doDeposit:function(){var n=this;"NaN"!=parseFloat(this.inputAmount).toString()?this.inputAmount<=0?t.showToast({title:"请输入大于0的金额",icon:"none"}):parseFloat(this.inputAmount).toFixed(2)==parseFloat(this.inputAmount)?(t.showLoading({title:"支付中..."}),setTimeout(function(){t.hideLoading(),t.showToast({title:"支付成功"}),setTimeout(function(){t.redirectTo({url:"../../pay/success/success?amount="+n.inputAmount})},300)},700)):t.showToast({title:"最多只能输入两位小数哦~",icon:"none"}):t.showToast({title:"请输入正确金额",icon:"none"})}},onLoad:function(){}};n.default=o}).call(this,o("6e42")["default"])},6924:function(t,n,o){"use strict";(function(t){o("5925"),o("921b");e(o("66fd"));var n=e(o("7da7"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("6e42")["createPage"])},"7da7":function(t,n,o){"use strict";o.r(n);var e=o("f598"),u=o("0c96");for(var i in u)"default"!==i&&function(t){o.d(n,t,function(){return u[t]})}(i);o("a981");var a,c=o("f0c5"),s=Object(c["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],a);n["default"]=s.exports},a981:function(t,n,o){"use strict";var e=o("1a16"),u=o.n(e);u.a},f598:function(t,n,o){"use strict";var e,u=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.paytype="alipay"},t.e1=function(n){t.paytype="wxpay"})},i=[];o.d(n,"b",function(){return u}),o.d(n,"c",function(){return i}),o.d(n,"a",function(){return e})}},[["6924","common/runtime","common/vendor"]]]);