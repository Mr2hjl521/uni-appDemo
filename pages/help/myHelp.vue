<template>
	<view class="body">
		<view >
			<view class="box">
				<!-- <view>收件人信息:</view> -->
				<view class="tabcard">
					<view class="inv-h-w boxTit">
						<view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" class="write" @tap="getInfoBy4()"><view>未完成</view></view>
						<view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" class="write" @tap="getInfoBy3()"><view>已完成</view></view>
						<view :class="['inv-h', Inv == 2 ? 'inv-h-se' : '']" class="write" @tap="getInfoBy5()"><view>超时订单</view></view>
						<!-- <view class="jiao"><img src="/static/img/sanjiao.png" class="sanjiao" /></view> -->
					</view>
					<view class="kuang">
						<!-- 未完成订单 -->
						<view class="list" v-show="Inv == 0">
							<view class="p10" v-for="(item, index) in unfinishedOrder" :key="index">
								<view>
									<view class="box1">
										<view class="title">
											<view>{{ type[item.status] }}</view>
											<view class="time">{{ item.updateTime }}</view>
										</view>
									</view>
									<view class="box2">
										<view class="contentLeft"><img src="/static/img/gg1.png" class="pic" /></view>
										<view class="contentRight">
											<view>收件人： {{ item.nickName }}</view>
											<view>手机号： {{ item.phone }}</view>
											<view>收货地点： {{ item.campusName }}{{ item.floorNumber }}号楼{{ item.doorNumber }}室</view>
										</view>
									</view>
								</view>
								<view class="box3">
									<view class="order">订单号:{{ item.outTradeNo }}</view>
									<view class="btn"  @tap="toOrder(item.takeDeliveryOrderId)">查看订单</view>
								</view>
							</view>
						</view>
						<!-- 已完成订单 -->
						<view class="content" v-show="Inv == 1">
							<view class="p10" v-for="(item, index) in completedOrder" :key="index">
								<view>
									<view class="box1">
										<view class="title">
											<view>{{ type[item.status] }}</view>
											<view class="time">{{ item.updateTime }}</view>
										</view>
									</view>
									<view class="box2">
										<view class="contentLeft"><img src="/static/img/gg1.png" class="pic" /></view>
										<view class="contentRight">
											<view>收件人： {{ item.nickName }}</view>
											<view>手机号： {{ item.phone }}</view>
											<view>收货地点： {{ item.campusName }}{{ item.floorNumber }}号楼{{ item.doorNumber }}室</view>
										</view>
									</view>
								</view>
								<view class="box3">
									<view class="order">订单号:{{ item.outTradeNo }}</view>
									<view class="btn btn2" @tap="toOrder(item.takeDeliveryOrderId)">查看订单</view>
								</view>
							</view>
						</view>
						<!-- 超时订单 -->
						<view class="content" v-show="Inv == 2">
							<view class="p10" v-for="(item, index) in overtimeOrder" :key="index">
								<view>
									<view class="box1">
										<view class="title">
											<view>{{ type[item.status] }}</view>
											<view class="time">{{ item.updateTime }}</view>
										</view>
									</view>
									<view class="box2">
										<view class="contentLeft"><img src="/static/img/gg1.png" class="pic" /></view>
										<view class="contentRight">
											<view>收件人： {{ item.nickName }}</view>
											<view>手机号： {{ item.phone }}</view>
											<view>收货地点： {{ item.campusName }}{{ item.floorNumber }}号楼{{ item.doorNumber }}室</view>
										</view>
									</view>
								</view>
								<view class="box3">
									<view class="order">订单号:{{ item.outTradeNo }}</view>
									<!-- @tap="toOvertimeOrder(item.takeDeliveryOrderId) -->
									<view class="btn btn3"  @tap="toOrder(item.takeDeliveryOrderId)">查看超时</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
import xflSelect from '../../components/xfl-select/xfl-select.vue';
export default {
	components: {
		MxDatePicker,
		mpvueCityPicker,
		xflSelect
	},
	data() {
		return {
			type:["订单正在分配","快递员正在取件","订单正在派送中","订单完成","订单正在二次配送中","订单超时,请联系快递员","自取,请尽快取件","未支付"],
			userId:'',
			Inv: 0,
			id: '',
			isSelect: false,
			index: 0,
			schoolData: '',
			src: '',
			current: 0,
			unfinishedOrder: [ //未完成的订单信息

			],
			completedOrder: [

			],
			overtimeOrder: [

			]
		};
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) {
			this.headerPosition = 'fixed';
		} else {
			this.headerPosition = 'absolute';
		}
	},
	onLoad() {
		// 从缓存拿userid
		// var that = this;
		// const userId = uni.getStorageSync('userId');  
		// if(userId) {
		// 	 //("可以")
		// 	that.userId = Number(userId);
		// 	 //("this.userid",that.userId)
		// 	 //("查询未完成订单")
		// 	that.Post(
		// 		//根据订单id查订单详情
		// 		'http://39.99.137.77:8081/projects/takeDeliveryOrder/findByClientUserIdAndStatus',
		// 		{
		// 			clientUserId: that.userId,
		// 			status: 4
		// 		},
		// 		data => {
		// 			 //(data); //所有的未完成的订单
		// 			that.unfinishedOrder=data
		// 		}
		// 	);
		// }
	},
	// 监听页面返回
	onBackPress(event) {
		console.log("回退")
		uni.switchTab({
			url: '/pages/tabBar/user/user'
		})
		// #ifdef APP-PLUS
		
		// #endif
	},
	onShow() {
		// 从缓存拿userid
		var that = this;
		const userId = uni.getStorageSync('userId');  
		if(userId) {
			 //("可以")
			that.userId = Number(userId);
			 //("this.userid",that.userId)
			 //("查询未完成订单")
			that.Post(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/takeDeliveryOrder/findByClientUserIdAndStatus',
				{
					clientUserId: that.userId,
					status: 4
				},
				data => {
					 //(data); //所有的未完成的订单
					that.unfinishedOrder=data
				}
			);
		}
	},
	
	
	methods: {
		getInfoBy4() {
			 //("查询未完成订单")
			 //(this.userId)
			this.Inv=0;
			this.Post(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/takeDeliveryOrder/findByClientUserIdAndStatus',
				{
					clientUserId: this.userId,
					status: 4
				},
				data => {
					 //(data); //所有的未完成的订单
					this.unfinishedOrder=data
				}
			);
		},
		getInfoBy3() {
			this.Inv=1
			 //("查询已完成订单")
			this.Post(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/takeDeliveryOrder/findByClientUserIdAndStatus',
				{
					clientUserId: this.userId,
					status: 3
				},
				data => {
					 //(data); //所有的未完成的订单
					this.completedOrder=data
				}
			);
		},
		getInfoBy5() {
			this.Inv=2
			 //("查询超时订单")
			this.Post(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/takeDeliveryOrder/findByClientUserIdAndStatus',
				{
					clientUserId: this.userId,
					status: 5
				},
				data => {
					 //(data); //所有的未完成的订单
					this.overtimeOrder=data
				}
			);
		},
		changeTab(Inv) {
			// that.navIdx = Inv;
			this.navIdx = Inv;
		},
		// 返回首页
		toHome() {
			uni.switchTab({
				url: '/pages/tabBar/home/home'
			});
		},
		// 订单详情
		toOrder(takeDeliveryOrderId) {
			 //(takeDeliveryOrderId)
			uni.navigateTo({
				url: './helpInfo?takeDeliveryOrderId='+takeDeliveryOrderId
			})
		},
		// 去超时订单详情
		toOvertimeOrder(takeDeliveryOrderId) {
			uni.navigateTo({
				url: './overtimeOrderList?takeDeliveryOrderId='+takeDeliveryOrderId
			})
		},
		onShowDatePicker(type) {
			//显示
			this.type = type;
			this.showPicker = true;
			this.value = this[type];
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

.box {
	.tabcard {
		.boxTit {
			position: relative;
			.sanjiao {
				width: 15px;
				height: 15px;
				position: absolute;
				bottom: -3px;
				left: 15%;
			}
		}
	}
}

page {
	background-color: #f2f2f2;
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
			font-size: 17px;
			width: 100%;
			display: flex;
			flex-direction: row;
			// background-color: red;
			justify-content: space-between;
			.time {
				font-size: 12.5px;
				color: #666;
				// background-color: pink;
				text-align: center;
			}
		}
// 		.timer {
// 			font-size: 12.5px;
// 			color: #666;
// 		}
	}
	.box2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 15px;
		.contentLeft {
			width: 20%;
			text-align: center;
			.pic {
				width: 50px;
				height: 50px;
				margin-top: 10px;
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
			font-size: 12.5px;
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
			font-size: 15.5px !important; 
		}
		.btn2 {
			background-color: #c0c0c0;
		}
		.btn3 {
			background-color: red;
		}
	}
}

.inv-h-w {
	background-color: #ffffff;
	height: 35px;
	display: flex;
	border-bottom: 1px solid #e6e6e6;
}
.inv-h {
	font-size: 35upx;
	flex: 1;
	text-align: center;
	color: #999999;
	// color: #35a6e0;
	height: 35px;
	line-height: 35px;
}
.inv-h-se {
	color: #323332;
	border-bottom: 1px solid #FFD845;
}
</style>
