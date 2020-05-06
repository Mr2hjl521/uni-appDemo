<template>
	<view class="container">
		<view class="userInfo">
			<!-- 订单信息 -->
			<view class="orderInfo">
				<view class="info">
					<view>收件人姓名：</view>
					<view>{{ info.cuaName }}</view>
				</view>
			</view>
			<view class="orderInfo">
				<view class="info">
					<view>手机号：</view>
					<view>{{ info.phone }}</view>
				</view>
			</view>
			<view class="orderInfo adress">
				<view class="info">
					<view class="adressName">地址：</view>
					<view class="adressInfo">{{ info.campusName }}{{ info.floorNumber }}号楼{{ info.doorNumber }}</view>
				</view>
			</view>
			<view class="orderInfo">
				<view class="info">
					<view>订单号：</view>
					<view>{{ info.outTradeNo }}</view>
				</view>
			</view>
		</view>
		<view class="userInfo staffInfo p10" v-for="(item, index) in OrderInfo" :key="index">
			<!-- 服务人员信息 -->

			<view @tap="toOrder()">
				<view class="box2">
					<view class="contentLeft"><img src="/static/img/gg1.png" :class="['pic1', item.packageName == '' ? 'pic1' : 'pic2']" /></view>
					<view class="contentRight">
						<view>快递公司： {{ item.serviceCompany }}</view>
						<view>快递点： {{ item.address }}</view>
						<view>取货码： {{ item.number }}</view>
						<view v-if="item.packageName!==''">包裹姓名： {{ item.packageName }} </view>
						<view v-if="item.packagePhone!==''">包裹电话： {{ item.packagePhone}} </view>
					</view>
				</view>
			</view>
			<view class="box3" v-show="unpay == false">
				<view class="order">{{ item.type }}</view>
				<view class="btn" @click="ok(item.show, index)" v-show="item.show == 1">确认收货</view>
				<view class="btn btn2" v-show="item.show == 2">已完成</view>
				<view class="btn btn3" v-show="item.show == 3">联系快递员</view>
				<view class="btn btn4" v-show="item.show == 4">订单超时</view>
			</view>
			<view class="box3" v-show="unpay == true">
				<view class="order">订单未支付</view>
			</view>
			
		</view>
		<!-- 如果包裹里面有超时的包裹，展示 -->
		<view class="fixedWindow" v-show="overtime == true">
			<view class="btn1" @tap="openWindow()">全部自取</view>
			<view class="btn1 btn2" @tap="repay()">重新下单</view>
		</view>
		<!-- 如果包裹里面有未付款的包裹，展示 -->
		<view class="fixedWindow" v-show="unpay == true">
			<view class="btn1" @tap="deleteOrder()">取消订单</view>
			<view class="btn1 btn2" @tap="toPay()">去付款</view>
		</view>
		<!-- 如果包裹里面有自取的包裹，展示 -->
		<view class="fixedWindow" v-show="callWindow == true">
			<view class="btn1 btn9" @tap="mycall()">联系服务人员</view>
		</view>
		<!-- 【全部自取】的弹窗 -->
		<view class="windows" :class="['windows', remindWindow == true ? 'show' : 'unshow']">
			<view class="title">
				<view>提示</view>
				<img src="/static/img/close9.png" class="close" @tap="closeWindows()" />
			</view>
			<view class="content">
				<text>
					请您确保
					<text class="red">先拨打电话联系服务人员</text>
					后，再点击
					<text class="red">"确认自取"</text>
					按钮，以免订单信息出错。
				</text>
			</view>
			<view class="btnBox">
				<view class="ok btn1" @tap="mycall()">拨打电话</view>
				<view class="ok" @tap="ziqu()">确认自取</view>
			</view>
		</view>
		<view class="dark" :class="['dark', remindWindow == true ? 'show' : 'unshow']"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			callWindow: false,  //如果是自取的包裹显示联系服务人员的按钮
			unpay: false, //是否时未付款订单
			serviceUserPhone: '',//服务人员手机号
			remindWindow: false, //【全部自取】弹框
			overtime: false, //是否有超时订单
			takeDeliveryOrderId: '',
			userId: '',
			typeArr: ['等待快递员取包裹', '包裹已取,正在派送中', '包裹已签收', '等待快递员二次配送', '领取超时,异常处理', '自取,请尽快取件'],
			info: {}, //从后端获取到的用户信息
			OrderInfo: [],
			current: 0
		};
	},
	onLoad(option) {
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
		 //(option.takeDeliveryOrderId); //打印出上个页面传递的参数。
		var id = Number(option.takeDeliveryOrderId);
		 //(id);
		this.takeDeliveryOrderId = id;
		this.Get(
			//根据订单id查订单详情
			'http://39.99.137.77:8081/projects/takeDeliveryOrder/findById?id=' + id,
			{},
			data => {
	 			// console.log(data)
				if (data.status == 7) {
					//未付款
					// 记录一下有超时的订单
					this.unpay = true;
				}
				this.info = data;
				this.serviceUserPhone=data.serviceUserPhone; //服务人员手机号
				 //("服务人员手机号"+this.serviceUserPhone)
				this.takeDeliveryOrderId = data.takeDeliveryOrderId;
				// this.
				var mm = data.parcelBoList[0].list;
				 //(mm);
				for (var i = 0; i < mm.length; i++) {
					if(mm[i].status == 0 ) {
						this.OrderInfo.push({
							status: mm[i].status,
							serviceCompany: mm[i].logisticsName,
							address: mm[i].pickupAddress,
							number: mm[i].pickCode,
							show: 999,
							type: this.typeArr[mm[i].status],
							parcelId: mm[i].parcelId,
							packageName: mm[i].name,
							packagePhone: mm[i].phone
						});
					}
					if ( mm[i].status == 1) {
						//说明还没确认收货
						this.OrderInfo.push({
							status: mm[i].status,
							serviceCompany: mm[i].logisticsName,
							address: mm[i].pickupAddress,
							number: mm[i].pickCode,
							show: 1,
							type: this.typeArr[mm[i].status],
							parcelId: mm[i].parcelId,
							packageName: mm[i].name,
							packagePhone: mm[i].phone
						});
					}
					if (mm[i].status == 2) {
						//已完成的订单
						this.OrderInfo.push({
							status: mm[i].status,
							serviceCompany: mm[i].logisticsName,
							address: mm[i].pickupAddress,
							number: mm[i].pickCode,
							show: 2,
							type: this.typeArr[mm[i].status],
							parcelId: mm[i].parcelId,
							packageName: mm[i].name,
							packagePhone: mm[i].phone
							
						});
					}
					if (mm[i].status == 3) {
						//包裹异常 需要联系快递员 二次派送
						this.OrderInfo.push({
							status: mm[i].status,
							serviceCompany: mm[i].logisticsName,
							address: mm[i].pickupAddress,
							number: mm[i].pickCode,
							show: 1,
							type: this.typeArr[mm[i].status],
							parcelId: mm[i].parcelId,
							packageName: mm[i].name,
							packagePhone: mm[i].phone
						});
					}
					if (mm[i].status == 4) {
						//包裹超时
						// 记录一下有超时的订单
						this.overtime = true;
						this.OrderInfo.push({
							status: mm[i].status,
							serviceCompany: mm[i].logisticsName,
							address: mm[i].pickupAddress,
							number: mm[i].pickCode,
							show: 4,
							type: this.typeArr[mm[i].status],
							parcelId: mm[i].parcelId,
							packageName: mm[i].name,
							packagePhone: mm[i].phone
						});
					}
					if (mm[i].status == 5) {
						//重新下单来的
						this.OrderInfo.push({
							status: mm[i].status,
							serviceCompany: mm[i].logisticsName,
							address: mm[i].pickupAddress,
							number: mm[i].pickCode,
							show: 1,
							type: this.typeArr[mm[i].status],
							parcelId: mm[i].parcelId,
							packageName: mm[i].name,
							packagePhone: mm[i].phone
						});
						this.callWindow=true; //显示给服务人员打电话的底部导航
					}
				}
			}
		);
		// 从缓存拿userid
		const userId = uni.getStorageSync('userId');
		if (userId) {
			 //('可以');
			this.userId = Number(userId);
			 //('this.userid', this.userId);
		}
	},
	onShow() {
		 //('onshow');
		// 刷新页面
	},
	onReady() {
		// this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onPageScroll(e) {},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		// uni.showToast({ title: '触发上拉加载' });
	},
	mounted() {},
	methods: {
		// 如果是未付款订单, 取消订单的方法
		deleteOrder() {
			var that=this;
			var takeDeliveryOrderId=that.takeDeliveryOrderId
			uni.showModal({
			    title: '提示',
			    content: '是否确认取消订单？',
			    success: function (res) {
			        if (res.confirm) {
			             //('用户点击确定');
						that.Delete(
							//根据订单id查订单详情
							'http://39.99.137.77:8081/projects/takeDeliveryOrder?id=' +takeDeliveryOrderId ,
							{},
							data => {
								 //(data);
								uni.navigateTo({
									url: './myHelp'
								});
							}
						);
						
						
			        } else if (res.cancel) {
			             //('用户点击取消');
			        }
			    }
			});
		},
		// 如果是未付款订单, 去付款的方法
		toPay() {
			uni.navigateTo({
				url: './pay?orderId='+this.takeDeliveryOrderId
			})
		},
		// 返回
		goBack() {
			uni.switchTab({
				url: '../tabBar/home/home'
			});
		},
		//打开【全部自取】弹窗
		openWindow() {
			this.remindWindow = true;
		},
		// 拨打电话
		mycall() {
			var phone = this.serviceUserPhone;
			//  //(phone)
			uni.makePhoneCall({
				phoneNumber: phone //仅为示例
			});
		},
		//全部自取
		ziqu() {
			//发请求
			 //('用户点击了全部自取');
			this.Post(
				//全部自取 改包裹状态
				'http://39.99.137.77:8081/projects/takeDeliveryOrder/clientUserAllSelfPick',
				{
					clientUserId: this.userId,
					status: 5,
					takeDeliveryOrderId: this.takeDeliveryOrderId
				},
				data => {
					 //(data); //
					this.remindWindow = false;
					uni.showLoading({
						title: '成功'
					});
					setTimeout(() => {
						uni.navigateTo({
							url: './myHelp'
						});
					}, 1000);
				}
			);
		},
		//关闭弹窗
		closeWindows() {
			this.remindWindow = false;
		},
		//【重新下单】
		repay() {
			var that=this
			uni.showModal({
			    title: '提示',
			    content: '是否确认重新下单？',
			    success: function (res) {
			        if (res.confirm) {
			             //('用户点击确定');
						//请求后端
						that.Post(
							//重新下单 改包裹状态
							'http://39.99.137.77:8081/projects/takeDeliveryOrder/clientUserAllSelfPick',
							{
								clientUserId: that.userId,
								status: 6,
								takeDeliveryOrderId: that.takeDeliveryOrderId
							},
							data => {
								 //(data); //
								that.remindWindow = false;
								uni.showLoading({
									title: '成功'
								});
								setTimeout(function() {
									uni.hideLoading();
								}, 1000);
								var orderId = data;
								// 下单成功 跳转页面
								uni.navigateTo({
									url: '../../../../help/pay?orderId=' + orderId //下单页面
								});
							}
						);
						
			        } else if (res.cancel) {
			             //('用户点击取消');
			        }
			    }
			});
		},
		// “完成订单”
		ok(show, index) {
			var that = this;
			uni.showModal({
				title: '提示',
				content: '是否确定收件？',
				success: function(res) {
					if (res.confirm) {
						 //('用户点击确定');
						var parcelId = that.OrderInfo[index].parcelId;
						// 从缓存拿userid
						uni.getStorage({
							key: 'userId',
							success: function(res) {
								 //(res.data);
								var id = Number(res.data);
								 //(parcelId);
								 //(that.takeDeliveryOrderId);
								//向后端发请求改订单状态
								that.Post(
									//根据订单id查订单详情
									'http://39.99.137.77:8081/projects/takeDeliveryOrder/updateDeliveryOrderAndParcelByStatus',
									// 'http://192.168.3.148:8082/takeDeliveryOrder/updateDeliveryOrderAndParcelByStatus',
									{
										clientUserId: id,
										parcelId: parcelId,
										status: 2,
										takeDeliveryOrderId: that.takeDeliveryOrderId
									},
									data => {
										// 切换按钮
										show = !show;
										that.OrderInfo[index].show = !that.OrderInfo[index].show;
										that.OrderInfo[index].type = '包裹已取件';
										 //('parcelId', that.OrderInfo[index].parcelId);
										that.showUpImg = !that.showUpImg;
										uni.showToast({ title: '已取件',icon:'success' });
									}
								);
							}
						});
					} else if (res.cancel) {
						 //('用户点击取消');
					}
				}
			});
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
		},
		Delete(url, message, callback) {
			uni.request({
				method: 'DELETE',
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
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f3f3f3;
	padding-bottom: 40px;
	padding-top: 10px;
}
.userInfo {
	width: 90%;
	margin: 0 auto;
	background-color: #fff;
	border-radius: 6px;
	padding: 10px 0;
	.goodsInfoBox {
		height: 120px;
		padding: 10px;
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
	}
	.adress {
		height: 100%;
	}
}
.p10 {
	background-color: #fff;
	padding: 10px;
	border-radius: 10px;
	width: 88%;
	box-sizing: border-box;
	margin: 10px auto;
	.box1 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 25px;
		line-height: 25px;
		margin-bottom: 15px;
		.title {
			font-size: 18px;
		}
		.timer {
			font-size: 12.5px;
			color: #666;
		}
	}
	.box2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 15px;
		.contentLeft {
			width: 20%;
			text-align: center;
			.pic1 {
				width: 50px;
				height: 50px;
				margin-top: 10px;
			}
			.pic2 {
				width: 50px;
				height: 50px;
				margin-top: 30px;
			}
		}
		.contentRight {
			width: 80%;
			font-size: 15px;
			padding-left: 10px;
			padding-top: 4px;
		}
	}
	.box3 {
		border-top: 1px solid #f3f3f3;
		position: relative;
		height: 30px;
		line-height: 30px;
		diaplay: flex;
		flex-direction: row;
		justify-content: space-between;
		.order {
			font-size: 17px;
			color: #666666;
			padding-top: 4px;
		}
		.btn {
			width: 90px;
			height: 25px;
			line-height: 25px;
			background-color: #FFD845;
			color: #fff;
			text-align: center;
			border-radius: 5px;
			position: absolute;
			right: 5px;
			top: 7px;
		}
		.btn2 {
			background-color: #c0c0c0;
		}
		.btn3 {
			background-color: pink;
		}
		.btn4 {
			background-color: red;
		}
	}
}
// 服务人员模块
.staffInfo {
	margin-top: 10px;
	.service {
		padding: 5px 10px;
		border-bottom: 1px solid #e5e5e5;
	}
	.goodsInfoBox {
		height: 80px;
		.goods_right {
			.title {
				height: 22px;
			}
		}
	}
}

.goods {
	width: 60px;
	height: 60px;
	border-radius: 50%;
}
.fixedWindow {
	width: 100%;
	height: 50px;
	line-height: 50px;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0 20px;
	box-sizing: border-box;
	.btn1 {
		width: 48%;
		height: 35px;
		line-height: 35px;
		margin-top: 8px;
		background-color: #f0b46c;
		border-radius: 5px;
		color: #fff;
		text-align: center;
	}
	.btn2 {
		background-color: #f06c7a;
	}
	.btn9 {
		background-color: skyblue;
		margin: 0 auto;
		margin-top: 8px;
	}
}
// 【全部自取】优弹窗
.windows {
	width: 88%;
	height: 250px;
	background-color: #fff;
	position: fixed;
	bottom: 30%;
	left: 6%;
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
	.content {
		text-align: center;
		// background-color: pink;
		margin-bottom: 40px;
		.red {
			color: red;
		}
	}
	.btnBox {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.ok {
			height: 35px;
			line-height: 35px;
			width: 48%;
			background-color: skyblue;
			color: #fff;
			text-align: center;
			border-radius: 5px;
			margin: 0 auto;
		}
		.btn1 {
			background-color: #f15c4d;
		}
		
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
</style>
