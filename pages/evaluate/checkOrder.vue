<template>
	<view class="container">
		<view class="userInfo">
			<!-- 商品信息 -->
			<view class="goodsInfoBox">
				<view class="goods_left">
					<img :src="testPhoneOrderBo.pImageUrl" class="pic">
				</view>
				<view class="goods_right">
					<view class="title">
						{{ testPhoneOrderBo.pName }}
					</view>
					<view class="type">{{ testPhoneOrderBo.pcColorName }}</view>
					<img src="/static/img/zhengpin.png" class="zhengpin">
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="orderInfo">
				<view class="info">
					<view>购买人姓名：</view>
					<view>{{ testPhoneOrderBo.cuaName }}</view>
				</view>
			</view>
			<view class="orderInfo">
				<view class="info">
					<view>手机号：</view>
					<view>{{ testPhoneOrderBo.cuPhone }}</view>
				</view>
			</view>
			<view class="orderInfo adress">
				<view class="info">
					<view class="adressName">地址：</view>
					<view class="adressInfo">{{ testPhoneOrderBo.cuaFloorNumber }}号楼{{ testPhoneOrderBo.cuaDoorNumber }}宿舍</view>
				</view>
			</view>
			<view class="orderInfo" @tap="chosecoupon()" v-if="coupclientUserCouponsListon==1">
				<view class="info info2">
					<view>选择优惠券</view>
					<view class="jiao">></view>
				</view>
			</view>
		</view>
		<view class="userInfo staffInfo">
			<!-- 服务人员信息 -->
			<view class="service">服务人员信息</view>
			<view class="goodsInfoBox">
				<view class="goods_left">
					<img :src="serviceTimePeriodBo.suAvatarUrl" class="person">
				</view>
				<view class="goods_right">
					<view class="title">{{ serviceTimePeriodBo.suName }}</view>
					<view class="type">{{ serviceTimePeriodBo.campusName }}</view>
					<view class="type">{{ serviceTimePeriodBo.suPersonalDesc }}</view>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="orderInfo">
				<view class="info info2">
					<view>预计上门服务时间：</view>
				</view>
				<view class="info info2">
					<text>{{ serviceTimePeriodBo.sutTimes }}</text>
					<text>{{ serviceTimePeriodBo.sutOpenTime }}-{{ serviceTimePeriodBo.sutCloseTime }}</text>
				</view>

			</view>
		</view>
		<view class="payBox">  
			<view class="price">合计：&yen;{{ myPrice}} </view>
			<view class="payBtn" @tap="closePayMethod()">提交订单</view>
		</view>
		<!-- 选择优惠券的弹窗 -->
		<view class="windows" :class="['windows', coupon == true ? 'show' : 'unshow']">
			<view class="title">
				<view>选择优惠券</view>
				<img src="/static/img/close9.png" class="close" @tap="closeWindows()">
			</view>
			<view class="option-list">
				<checkbox-group @change="checkboxChange" class="groups" >
					<label v-for="item in items" :key="item.value" class="gg">
						<view>{{ item.name }}</view>
						<view class="jj">
							<checkbox :value="item.value" :checked="item.checked" class="kuang" :color="'#FFD845'"/></view>
					</label>
				</checkbox-group>
			</view>
			<view class="ok" @tap="closeWindows()">完成</view>
		</view>
		<!-- 选择支付方式弹窗 -->
		<!-- 选择多个导入地址的弹窗 -->
		<view class="payWindows" :class="['payWindows', payWindows == true ? 'show' : 'unshow']">
			<view class="title">
				<view>选择支付方式</view>
				<img src="/static/img/close9.png" class="close" @tap="closePayWindows()">
			</view>
			<view class="money"><text class="biao">&yen;</text>{{myPrice}}</view>
			<view class="chosePayBox">
				<radio-group @change="radioChange">
					<label class="addressBox" v-for="(item, index) in payitems" :key="item.value">
						<view class="boxLeft">
							<view>{{ item.methods }}</view>
						</view>
						<view class="boxRight">
							<text v-if="item.value==1" class="assets">剩余：&yen;({{ assets }})</text>
							<radio :value="item.value" :checked="index === current" :color="'#FFD845'"/>
						</view>
					</label>
					
				</radio-group>
				<view class="guanggao" v-show="cuIsRecharge==0">
					<view class="qipao">
						<img src="/static/img/qipao2.png" class="jiao">
					</view>
					<view class="content">
						<view>首次充值满20元，可得1张贴膜券或5张代取快递券</view>
						<view class="chongzhi" @tap="toRecharge()">充值</view>
					</view>
				</view>
			</view>
			<view class="ok" @tap="pay()">支付</view>
		</view>
		<view class="dark" :class="['dark', coupon == true ? 'show' : 'unshow']"></view>
		<view class="dark" :class="['dark', payWindows == true ? 'show' : 'unshow']"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			serviceFree :'10', //服务费
			tpoOrderNumber: '', //订单号码
			myPrice: '',
			money: '', //原始价钱【后端返回】
			clientUserCouponsIds: [], //最终存放用户选的优惠券id
			assets: '', //用户账户余额
			testPhoneOrderId: '', //订单id
			// clientUserCouponsList
			coupclientUserCouponsListon: '', //控制是否显示优惠券这一行
			cuIsRecharge: '', //是否首充过
			testPhoneOrderBo: { //商品信息
				pName: '', //商品名称
				cuaName: '', //用户姓名
				pImageUrl: '', //商品图片
				pcColorName: '', //商品颜色
				ppcPrice: '', //价钱
				cuaPhone: '', //用户手机号
				cuaDoorNumber: '',
				cuaFloorNumber: ''
			},
			serviceTimePeriodBo: { //服务人员信息
				campusName: '', //学校
				suName: '', //姓名
				suPersonalDesc: '', 
				suAvatarUrl: '', 
				sutOpenTime: '', 
				sutCloseTime: '', 
				sutTimes: '' //预约日期
			},
			coupon: false,
			payWindows: false,
			items: [ //放优惠券的地方

			],
			payitems: [ 
				{
					value: '0',
					methods: '微信支付',
				},
				{
					value: '1',
					methods: '余额支付',
				}
			],
			current: '',
			type: 9, //支付方式 什么都不选默认是9
		};
	},
	onLoad(option) {
		
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		var testPhoneOrderId= option.testPhoneOrderId;
		this.testPhoneOrderId=testPhoneOrderId
		var times= option.times;
		
	},
	onReady(){
		// this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onPageScroll(e) {
		
	},
	onShow(){
		var that=this;
		// 从缓存拿userid
		const serviceUserId = uni.getStorageSync('serviceUserId');  
		if(serviceUserId) {
			 //("可以")
			that.serviceUserId = Number(serviceUserId);
			 //("this.serviceUserId",that.serviceUserId)
			//有serviceUserId
			that.Get(
			'http://39.99.137.77:8081/projects/serviceUserTime/findToBePayByTestPhoneOrderId?id='+that.testPhoneOrderId, 
			{
					
			}, 
			data => { 
				 //(data);
				that.tpoOrderNumber =data.testPhoneOrderBo.tpoOrderNumber; //订单号
				 //(that.tpoOrderNumber)
				that.money=data.testPhoneOrderBo.ppcPrice; //后端返回的原始价钱
				// var p1=Number(that.money)+10;
				that.myPrice=that.money; //用于显示最初的价钱 
				that.testPhoneOrderBo=data.testPhoneOrderBo; //订单信息
				that.assets= data.testPhoneOrderBo.assets
				that.serviceTimePeriodBo=data.serviceTimePeriodBo; //服务人员信息
				if(data.clientUserCouponsList.length<=0) { //判断优惠券的数量
					 //("没有优惠券")
					that.coupclientUserCouponsListon=0;
				}else {
					var tt=data.clientUserCouponsList
					for(var i=0;i<tt.length;i++) {
						if(tt[i].coId==1) {
							
							// 有可用优惠券
							 //("有可用贴膜券")
							that.items.push({
								value: (tt[i].cucId).toString(),
								name: tt[i].coFullReduction,
							})
							
							 //(that.items)
							that.coupclientUserCouponsListon=1;
							 //(that.coupclientUserCouponsListon)
						}
					}
					
					
				}
				that.cuIsRecharge=data.testPhoneOrderBo.cuIsRecharge; //是否首充过
				 //("是否首充过",that.cuIsRecharge)
				 //(that.coupclientUserCouponsListon)
				that.paycallback()
			});
		}
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		// uni.showToast({ title: '触发上拉加载' });
	},
	mounted () {
		
	},
	// 监听页面返回
	onBackPress(event) {
		// #ifdef APP-PLUS
		uni.showModal({
		    title: '提示',
		    content: '当前订单还未支付,是否确定退出？',
		    success: function (res) {
		        if (res.confirm) {
		            console.log('用户点击确定');
					uni.reLaunch({
						url: '/pages/tabBar/home/home'
					})
		        } else if (res.cancel) {
		            console.log('用户点击取消');
		        }
		    }
		});
		// #endif
	},
	methods: {
		// 选择优惠券
		chosecoupon() {
			this.coupon=true;
		},
		// 关闭选择优惠券弹窗
		closeWindows() {
			this.coupon=false;
		},
		// 多选优惠券，实时更新付款价钱
		checkboxChange: function(e) {
			var items = this.items,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i];
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
					 //("已选")
				} else {
					this.$set(item, 'checked', false);
				}
			}
			this.clientUserCouponsIds = values; //用户所选的所有优惠券的id们
			 //(values.length); //所选优惠券数量
			var num =Number(this.clientUserCouponsIds.length);//所选优惠券数量
			if(this.clientUserCouponsIds.length!=0) {
				// 说明选了优惠券
				// this.serviceFree=0;
				 //('serviceFree======', this.serviceFree);
				// var all = this.money; //后端返回的最初的价钱
				this.myPrice=0;
				 //('myPrice======', this.myPrice);
			}else {
				// this.clientUserCouponsIds.length==0 说明没选优惠券
				// this.serviceFree=10;
				// var all = this.money; //后端返回的最初的价钱
				// this.myPrice=all+this.serviceFree
				 //('myPrice======', this.myPrice);
			}
			
		},
		// 【提交订单】 判断最终的金额是不是0 
		closePayMethod() {
			if(this.myPrice==0) {
				// ****走优惠券接口
				console.log("走优惠券接口")
				this.Post(
					//支付传 价钱和订单号
					'http://39.99.137.77:8081/projects/couponsPay/filmPay',
					{
						// 优惠券Id
						clientUserCouponsIds: this.clientUserCouponsIds,
						orderNumber: this.tpoOrderNumber,
						price: 0
					},
					data => {
						 //(data); //
						if(data.code==200) {
							// 使用优惠券0元支付成功    
							// 带着订单id跳转
							// 支付成功，关闭弹窗
							// this.payWindows = false;
							var orderId =this.testPhoneOrderId; //后端返回的orderid
							setTimeout(function() {
								uni.hideLoading();
								// 带着订单id跳转
								uni.navigateTo({
									url: '../pay/success/success?num=2&orderId='+orderId
								});
							}, 1000);
						}else {
							uni.showToast({
								title: '支付异常',
								duration: 1000
							});
							setTimeout(function() {
								uni.hideLoading();
							}, 2000);
						}
					}
				);
			}
			// 最终价钱大于0元 打开选择支付方式的弹窗
			if(this.myPrice > 0) {
				this.payWindows=true; 
			}
			if (this.myPrice < 0) {
				// 最终金额小于0 提示用户
				uni.showModal({
				    title: '提示',
				    content: '当前金额小于0元,无法支付。',
				    success: function (res) {
				    }
				});
			}
			
		},
		// 关闭选择支付方式弹窗
		closePayWindows() {
			this.payWindows=false;
		},
         //防止后台进入之后函数
		 paycallback(){
			 var money = this.myPrice;
			 var outTradeNo = this.tpoOrderNumber;
			 var takeDeliveryOrder = this.testPhoneOrderId;
			 var couponsId = this.clientUserCouponsIds;
			 var number = couponsId.length; //使用优惠券的数量
			 uni.request({
			 	method: 'POST',
			 	url: 'http://39.99.137.77:8081/projects/appPay/notifyUrl', 
			 	data: {
			 		outTradeNo: outTradeNo,
			 		type: 0,
			 		clientUserCouponsId: couponsId
			 	},  
			 	header: {
			 		'Content-Type': 'application/json' //设置请求头请求格式为JSON
			 	},
			 	success: res => {
			 		if( res.data.code==200 ) {
			 			uni.navigateTo({
			 				url: '../pay/success/success?num=2&orderId=' + takeDeliveryOrder
			 			});
			 		}else {
			 			
			 		}
			 		
			 	},
			 	fail: res => {
			 	}
			 });
		 },
		// 【支付】 调用支付 并关闭选择支付方式弹窗
		pay() {
			// 支付
			if (this.type == 0) {
				var money = this.myPrice;
				var outTradeNo = this.tpoOrderNumber;
				var takeDeliveryOrder = this.testPhoneOrderId;
				var couponsId = this.clientUserCouponsIds;
				var number = couponsId.length; //使用优惠券的数量
				 //(money);
				 //(outTradeNo);
				 //(couponsId)
				this.Get(
					//支付传 价钱和订单号
					'http://39.99.137.77:8081/projects/appPay/pay?price=' + money + '&outTradeNo=' +outTradeNo,
					{},
					data => {
						 //(data); 
						// 安卓调用微信支付
						var res = data.data;
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: {  //微信、支付宝订单数据
								appid: res.appid,
								noncestr: res.noncestr,
								package: 'Sign=WXPay', // 固定值，以微信支付文档为主
								partnerid: res.partnerid,
								prepayid: res.prepayid,
								timestamp: res.timestamp,
								sign: res.sign // 根据签名算法生成签名
							}, 
							success: function(res) {
								
							},
							fail: function(err) {
								
							},
							complete: function(res) {
								// 支付成功回调
								uni.request({
									method: 'POST',
									url: 'http://39.99.137.77:8081/projects/appPay/notifyUrl', 
									data: {
										outTradeNo: outTradeNo,
										type: 0,
										clientUserCouponsId: couponsId
									},  
									header: {
										'Content-Type': 'application/json' //设置请求头请求格式为JSON
									},
									success: res => {
										if( res.data.code==200 ) {
											uni.navigateTo({
												url: '../pay/success/success?num=2&orderId=' + takeDeliveryOrder
											});
										}else {
											uni.showModal({
												content: '支付异常',
												showCancel: false
											});
											uni.navigateTo({
												url: '/pages/evaluate/checkOrder?testPhoneOrderId='+takeDeliveryOrder,
											})
										}
										
									},
									fail: res => {
									}
								});
							}
						});
					}
				);
			}
			if(this.type==1) {
				//余额支付,判断余额的钱够不够支付
				if(this.myPrice>this.assets) {
					// 钱不够
					uni.showModal({                                                                                                                                                                                                                                                                         
					    title: '提示',
					    content: '余额不足，是否去充值？',
					    success: function (res) {
					        if (res.confirm) {
					             //('用户点击确定');
								uni.navigateTo({
									url: '../recharge/recharge'
								});
					        } else if (res.cancel) {
					             //('用户点击取消');
					        }
					    }
					});
				}
				
				
				if(this.myPrice<=this.assets) {
					// 钱够了
					 //("钱够了")
					this.Post(
						//支付传 价钱和订单号
						'http://39.99.137.77:8081/projects/couponsPay/filmPay',
						{
							// 优惠券Id
							clientUserCouponsIds: this.clientUserCouponsIds,
							orderNumber: this.tpoOrderNumber,
							price: this.myPrice
						},
						data => {
							 //(data); //
							if(data.code==200) {
								// 使用优惠券0元支付成功    
								// 带着订单id跳转
								// 支付成功，关闭弹窗
								this.payWindows = false;
								var orderId =this.testPhoneOrderId; //后端返回的orderid
								setTimeout(function() {
									uni.hideLoading();
									// 带着订单id跳转
									uni.navigateTo({
										url: '../pay/success/success?num=2&orderId='+orderId
									});
								}, 1000);
							}else {
								uni.showToast({
									title: '支付异常',
									duration: 1000
								});
								setTimeout(function() {
									uni.hideLoading();
								}, 2000);
							}
						}
					);
				}
				
				
			}
			//啥也没选不让支付
			if(this.type==9)  {
				uni.showModal({
				    title: '提示',
				    content: '亲爱的用户,您忘记选择支付方式了哦',
				    success: function (res) {
				        if (res.confirm) {
				             //('用户点击确定');
				        } else if (res.cancel) {
				             //('用户点击取消');
				        }
				    }
				});
			}
		},
		// 单选支付方式
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			 //(evt.target.value);
			this.type=evt.target.value
		},
		// 跳转至【充值】
		toRecharge() {
			uni.navigateTo({
				url: '../recharge/recharge'
			})
		},
		// 封装好的post+get请求
		Post(url, message, callback) {
			uni.request({
				method: 'POST',
				url: url, //仅为示例，并非真实接口地址。
				data: message,
				header: {
					'Content-Type': 'application/json' //设置请求头请求格式为JSON
				},
				success: res => {
					callback(res.data);
				},
				fail: res => {
					// callback(res.data);
					alert(res.data);
				}
			});
		},
		Get(url, message, callback) {
			uni.request({
				url: url, //仅为示例，并非真实接口地址。
				data: message,
				header: {
					'Content-Type': 'application/json' //设置请求头请求格式为JSON
				},
				success: res => {
					callback(res.data);
				},
				fail: res => {
					callback(res);
				}
			});
		}
 	}
};
</script>


<style lang="scss">
page {
	background-color: #F3F3F3;
}
.userInfo {
	width: 90%;
	// height: 250px;
	margin: 0 auto;
	background-color: #fff;
	border-radius: 6px;
	padding: 10px 0;
	.goodsInfoBox {
		height: 120px;
		padding: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.goods_left {
			.pic {
				width: 110px;
				height: 110px;
				border-radius: 5px;
			}
		}
		.goods_right {
			margin-left: 10px;
			.title {  
				padding-right: 10px;
				width: 210px;
				// height: 50px;
				white-space: normal;
				overflow: hidden;
				text-overflow: ellipsis;
				// margin-bottom: 5px;
				box-sizing: border-box;
			}
			.type {
				color: #9C9C9C;
				font-size: 15.5px;
			}
			.zhengpin {
				margin-top: 5px;
				width: 70px;
				height: 20px;
			}
		}
	}
	.orderInfo {
		.info {
			width: 91%;
			// height: 30px;
			line-height: 30px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 0 auto;
			margin-top: 5px;
			border-bottom: solid 1upx #eee;
			.adressName {
				width: 28%;
			}
			.adressInfo {
				width: 72%;
				text-align: right;
			}
			.jiao {
				color: #666;
			}
		}
		.info2 {
			border-bottom: 1px solid #fff;
		}
	}
	.adress {
		height: 100%;
	}
}
// 服务人员模块
.staffInfo {
	margin-top: 15px;
	margin-bottom: 30px;
	.service {
		padding: 5px 10px;
		border-bottom: 1px solid #E5E5E5;
	}
	.goodsInfoBox {
		border-bottom: 1px solid #E5E5E5;
		height: 80px;
		.goods_right {
			.title {
				height: 30px;
			}
		}
	}
}

.person {
	width: 80px;
	height: 80px;
	border-radius: 50%;
}

.payBox {
	width: 100%;
	height: 60px;
	line-height: 60px;
	background-color: #fff;
	display: flex;
	flex-direction: row;
	bottom: 0;
	left: 0;
	padding-left: 30px;
	box-sizing: border-box;
	// position: relative;
	position: fixed;
	.price {
	}
	.payBtn {
		width: 110px;
		height: 35px;
		line-height: 35px;
		background-color: #FFD845;
		color: #000;
		border-radius: 8px;
		text-align: center;
		position: absolute;
		right: 10px;
		top: 15px;
	}
}
// 优惠券弹窗
.windows {
	width: 100%;
	height: 360px;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 15px;
	box-sizing: border-box;
	z-index: 999;
	border-radius: 5px;
	.title {
		font-size: 22px;
		margin-bottom: 15px;
		text-align: center;
		position: relative;
		margin-bottom: 20px;
		.close {
			width: 30px;
			height: 30px;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	.option-list {
		padding: 10px;
		// background-color: pink;
		margin-bottom: 15px;
		.gg {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 10px 0;
		}
	}
	
	.ok {
		height: 35px;
		line-height: 35px;
		width: 90%;
		background-color: #FFD845;
		color: #fff;
		text-align: center;
		border-radius: 5px;
		margin: 0 auto;
	}
}
.show {
	display: block;
}
.unshow {
	display: none;
}
.dark {
	height: 100%;
	width: 100%;
	z-index: 99;
	background-color: #000;
	opacity: 0.5;
	position: fixed;
	top: 0;
	left: 0;
}


// 选择支付方式弹框
.payWindows {
	width: 100%;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	padding: 15px;
	box-sizing: border-box;
	z-index: 999;
	border-radius: 5px;
	.title {
		font-size: 22px;
		text-align: center;
		position: relative;
		.close {
			width: 30px;
			height: 30px;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	.money {
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 32px;
		// background: pink;
		.biao {
			font-size: 20px;
			font-weight: 600;
		}
	}
	.chosePayBox {
		height: 150px;
		margin-bottom: 20px;
		position: relative;

		.addressBox {
			padding: 5px;
			border-radius: 5px;
			background-color: #eeeeee;
			opacity: 0.7;
			margin-bottom: 10px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.assets {
				margin-right: 10px;
			}
			
		}
		.guanggao {
			width: 100%;
			height: 52px;
			padding: 0 10px;
			box-sizing: border-box;
			background-color: #eeeeee;
			opacity: 0.7;
			border-radius: 4px;
			position: absolute;
			bottom: 0;
			left: 0;
			
			.qipao {
				position: relative;
				// background-color: pink;
				.jiao {
					width: 20px;
					height: 15px;
					// background-color: red;
					position: absolute;
					top: -15px;
					left: -5px;
				}
			}
			.content {
// 				display: flex;
// 				flex-direction: row;
// 				justify-content: space-between;
				position: relative;
				.chongzhi {
					
					width: 60px;
					height: 23px;
					line-height: 23px;
					text-align: center;
					background-color: red;
					color: #fff;
					position: absolute;
					text-outline: 5px;
					right: 20px;
					bottom: 0;
					border-radius: 5px;
				}
			}
		}
	}
	.ok {
		height: 30px;
		line-height: 30px;
		width: 150px;
		background-color: #FFD845;
		color: #000;
		text-align: center;
		border-radius: 5px;
		margin: 0 auto;
	}
}
</style>
