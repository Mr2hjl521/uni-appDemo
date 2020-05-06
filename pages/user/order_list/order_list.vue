<template>
	<view class="body">
		<view>
			<view class="box">
				<!-- <view>收件人信息:</view> -->
				<view class="tabcard">
					<view class="inv-h-w boxTit">
						<view :class="['inv-h', Inv == 0 ? 'inv-h-se' : '']" class="write" @tap="getInfoBy0()"><view>全部</view></view>
						<view :class="['inv-h', Inv == 1 ? 'inv-h-se' : '']" class="write" @tap="getInfoBy1()"><view>待付款</view></view>
						<view :class="['inv-h', Inv == 2 ? 'inv-h-se' : '']" class="write" @tap="getInfoBy2()"><view>待服务</view></view>
						<view :class="['inv-h', Inv == 3 ? 'inv-h-se' : '']" class="write" @tap="getInfoBy3()"><view>待评价</view></view>
						<view :class="['inv-h', Inv == 4 ? 'inv-h-se' : '']" class="write" @tap="getInfoBy4()"><view>已完成</view></view>
					</view>
					<view class="kuang">
						<!-- 全部订单 -->
						<view class="list" v-show="Inv == 0">
							<view class="p10" v-for="(item, index) in allOrderList" :key="index">
								<view>
									<view class="box2">
										<view class="contentLeft"><img :src="item.pfFilmImage" class="pic" /></view>
										<view class="contentRight">
											<view class="name">{{ item.pfFilmName }}</view>
											<view class="color"><text>颜色： {{ item.pcColorName }}</text>  <text> 金额： &yen;{{ item.pfFilmPrice }}</text></view>
											<view class="price">共1件商品</view>
										</view>
									</view>
								</view>
								<view class="box3">
									<view class="btnBox">
										<view class="btn btn0" @tap="mydelete0(item.tpoId)">删除订单</view>
										<view class="btn" @tap="toOrder(item.tpoId)">查看订单</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 待付款订单 -->
						<view class="content" v-show="Inv == 1">
							<view class="p10" v-for="(item, index) in nonPaymentOrderList" :key="index">
								<view>
									<view class="box2">
										<view class="contentLeft"><img :src="item.pfFilmImage" class="pic" /></view>
										<view class="contentRight">
											<view class="name">{{ item.pfFilmName }}</view>
											<view class="color"><text>颜色： {{ item.pcColorName }}</text>  <text> 金额： &yen;{{ item.pfFilmPrice }}</text></view>
											<view class="price">共1件商品</view>
										</view>
									</view>
								</view>
								<view class="box3">
									<view class="btnBox">
										<view class="btn btn0" @tap="mydelete1(item.tpoId)">取消订单</view>
										<view class="btn" @tap="myPay(item.tpoId)">付款</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 待服务订单 -->
						<view class="content" v-show="Inv == 2">
							<view class="p10" v-for="(item, index) in waitServiceOrderList" :key="index">
								<view>
									<view class="box2">
										<view class="contentLeft"><img :src="item.pfFilmImage" class="pic" /></view>
										<view class="contentRight">
											<view class="name">{{ item.pfFilmName }}</view>
											<view class="color"><text>颜色： {{ item.pcColorName }}</text>  <text> 金额： &yen;{{ item.pfFilmPrice }}</text></view>
											<view class="price">共1件商品</view>
										</view>
									</view>
								</view>
								<view class="box3">
									<view class="btnBox">
										<!-- <view class="btn btn0" @tap="mydelete(item.tpoId)">删除订单</view> -->
										<view class="btn" @tap="toOrder(item.tpoId)">查看订单</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 待评价订单 -->
						<view class="content" v-show="Inv == 3">
							<view class="p10" v-for="(item, index) in unEvaluateOrderList" :key="index">
								<view>
									<view class="box2">
										<view class="contentLeft"><img :src="item.pfFilmImage" class="pic" /></view>
										<view class="contentRight">
											<view class="name">{{ item.pfFilmName }}</view>
											<view class="color"><text>颜色： {{ item.pcColorName }}</text>  <text> 金额： &yen;{{ item.pfFilmPrice }}</text></view>
											<view class="price">共1件商品</view>
										</view>
									</view>
								</view>
								<view class="box3">
									<view class="btnBox">
										<!-- <view class="btn btn0" @tap="mydelete(item.tpoId)">取消订单</view> -->
										<view class="btn" @tap="toRemark(item.tpoId)">评价</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 已完成订单 -->
						<view class="content" v-show="Inv == 4">
							<view class="p10" v-for="(item, index) in finishedOrder" :key="index">
								<view>
									<view class="box2">
										<view class="contentLeft"><img :src="item.pfFilmImage" class="pic" /></view>
										<view class="contentRight">
											<view class="name">{{ item.pfFilmName }}</view>
											<view class="color"><text>颜色： {{ item.pcColorName }}</text>  <text> 金额： &yen;{{ item.pfFilmPrice }}</text></view>
											<view class="price">共1件商品</view>
										</view>
									</view>
								</view>
								<view class="box3">
									<view class="btnBox">
										<view class="btn btn0" @tap="mydelete4(item.tpoId)">删除订单</view>
										<view class="btn" @tap="toOrder(item.tpoId)">查看订单</view>
									</view>
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
export default {
	components: {
		MxDatePicker,
		mpvueCityPicker
	},
	data() {
		return {
			pp: 999,
			type: ['订单正在分配', '快递员正在取件', '订单正在派送中', '订单完成', '订单正在二次配送中', '订单超时,请联系快递员', '自取,请尽快取件'],
			userId: '',
			Inv: 0,
			id: '',
			isSelect: false,
			index: 0,
			schoolData: '',
			src: '',
			current: 0,
			allOrderList: [], //全部订单
			nonPaymentOrderList: [], //待付款订单
			waitServiceOrderList: [], //待服务订单
			unEvaluateOrderList: [], //待评价订单
			finishedOrder: [
				//已完成的订单信息
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
	onLoad(option) {
		var that = this;
		 //(option.tbIndex)
		that.Inv=option.tbIndex;
		
		// 从缓存拿userid
		const userId = uni.getStorageSync('userId');
		if (userId) {
			 //('可以');
			that.userId = Number(userId);
			 //('this.userid', that.userId);
		}
		
		// 判断Inv==0
		if(that.Inv==0) {
			 //('查询全部订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectUserAllOrder?clientUserId=' + that.userId,
				{
					clientUserId: that.userId
				},
				data => {
					 //(data); //所有的订单
					that.allOrderList = data;
				}
			);
		}
		
		// 判断Inv==1
		if(that.Inv==1) {
			 //('查询待付款订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/findPayStatusByClientUserOrderId?clientUserId=' + that.userId,
				{
					clientUserId: that.userId
				},
				data => {
					 //(data); //所有的订单
					that.nonPaymentOrderList = data.list;
				}
			);
		}
		
		// 判断Inv==2
		if(that.Inv==2) {
			 //('查询待服务订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectClientUserOrder',
				{
					clientUserId: that.userId,
					status: 0
				},
				data => {
					 //(data); //所有的订单
					that.waitServiceOrderList = data.list;
				}
			);
		}
		
		// 判断Inv==3
		if(that.Inv==3) {
			 //('查询待评价订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectClientUserOrder',
				{
					clientUserId: that.userId,
					status: 1
				},
				data => {
					 //(data); //所有的订单
					that.unEvaluateOrderList = data.list;
				}
			);
		}
		
		// 判断Inv==4
		if(that.Inv==4) {
			 //('查询已完成订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectClientUserOrder',
				{
					clientUserId: that.userId,
					status: 4
				},
				data => {
					 //(data); //所有的订单
					that.finishedOrder = data.list;
				}
			);
		}
	},
	onShow() {
		var that=this;
		// 从缓存拿userid
		const userId = uni.getStorageSync('userId');
		if (userId) {
			 //('可以');
			that.userId = Number(userId);
			 //('this.userid', that.userId);
		}
		
		// 判断Inv==0
		if(that.Inv==0) {
			 //('查询全部订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectUserAllOrder?clientUserId=' + that.userId,
				{
					clientUserId: that.userId
				},
				data => {
					 //(data); //所有的订单
					that.allOrderList = data;
				}
			);
		}
		
		// 判断Inv==1
		if(that.Inv==1) {
			 //('查询待付款订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/findPayStatusByClientUserOrderId?clientUserId=' + that.userId,
				{
					clientUserId: that.userId
				},
				data => {
					 //(data); //所有的订单
					that.nonPaymentOrderList = data.list;
				}
			);
		}
		
		// 判断Inv==2
		if(that.Inv==2) {
			 //('查询待服务订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectClientUserOrder',
				{
					clientUserId: that.userId,
					status: 0
				},
				data => {
					 //(data); //所有的订单
					that.waitServiceOrderList = data.list;
				}
			);
		}
		
		// 判断Inv==3
		if(that.Inv==3) {
			 //('查询待评价订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectClientUserOrder',
				{
					clientUserId: that.userId,
					status: 1
				},
				data => {
					 //(data); //所有的订单
					that.unEvaluateOrderList = data.list;
				}
			);
		}
		
		// 判断Inv==4
		if(that.Inv==4) {
			 //('查询已完成订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectClientUserOrder',
				{
					clientUserId: that.userId,
					status: 4
				},
				data => {
					 //(data); //所有的订单
					that.finishedOrder = data.list;
				}
			);
		}
	},
	// 监听页面返回
	onBackPress(event) {
		// #ifdef APP-PLUS
		// 退出程序
		// plus.runtime.quit();  
		// #endif
		uni.reLaunch({
			url: '/pages/tabBar/user/user'
		})
	},
	methods: {
		// 付款
		myPay(tpoId) {
			uni.navigateTo({
				url: '/pages/evaluate/checkOrder?testPhoneOrderId=' + tpoId
				// testPhoneOrderId
			})
		},
		// 删除订单  全部的
		mydelete0(tpoId) {
			 //(tpoId);
			var that = this;
			uni.showModal({
				title: '提示',
				content: '确认删除订单？',
				success: function(res) {
					if (res.confirm) {
						 //('用户点击确定');
						that.Delete(
							//根据订单id查订单详情
							'http://39.99.137.77:8081/projects/testPhoneOrder?id=' + tpoId,
							{},
							data => {
								 //(data); //所有的订单
								uni.navigateTo({
									url: '/pages/user/order_list/order_list?tbIndex=0',
								});
							}
						);
					} else if (res.cancel) {
						 //('用户点击取消');
					}
				}
			});
		},
		// 删除订单  待付款的
		mydelete1(tpoId) {
			 //(tpoId);
			var that = this;
			uni.showModal({
				title: '提示',
				content: '确认删除订单？',
				success: function(res) {
					if (res.confirm) {
						 //('用户点击确定');
						that.Delete(
							//根据订单id查订单详情
							'http://39.99.137.77:8081/projects/testPhoneOrder?id=' + tpoId,
							{},
							data => {
								 //(data); //所有的订单
								uni.navigateTo({
									url: '/pages/user/order_list/order_list?tbIndex=1',
								});
							}
						);
					} else if (res.cancel) {
						 //('用户点击取消');
					}
				}
			});
		},// 删除订单  已完成的
		mydelete4(tpoId) {
			 //(tpoId);
			var that = this;
			uni.showModal({
				title: '提示',
				content: '确认删除订单？',
				success: function(res) {
					if (res.confirm) {
						 //('用户点击确定');
						that.Delete(
							//根据订单id查订单详情
							'http://39.99.137.77:8081/projects/testPhoneOrder?id=' + tpoId,
							{},
							data => {
								 //(data); //所有的订单
								uni.navigateTo({
									url: '/pages/user/order_list/order_list?tbIndex=4',
								});
							}
						);
					} else if (res.cancel) {
						 //('用户点击取消');
					}
				}
			});
		},
		// 添加评论
		toRemark(tpoId) {
			uni.navigateTo({
				url: '../../goods/ratings/writeRating?tpoId='+tpoId //加参数
			});
		},
		// 查看订单
		toOrder(tpoId) {
			 //(tpoId)
			uni.navigateTo({
				url: '../../evaluate/orderInfo?ggid='+tpoId
			})
		},
		// 查询全部订单
		getInfoBy0() {
			var that = this;
			 //(that.userId);
			that.Inv = 0;
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectUserAllOrder?clientUserId=' + that.userId,
				{
					clientUserId: that.userId
				},
				data => {
					 //(data); //所有的订单
					that.allOrderList = data;
				}
			);
		},
		// 查询待付款订单
		getInfoBy1() {
			var that = this;
			that.Inv = 1;
			 //('查询待付款订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/findPayStatusByClientUserOrderId?clientUserId=' + that.userId,
				{
					clientUserId: that.userId
				},
				data => {
					 //(data); //所有的订单
					that.nonPaymentOrderList = data.list;
				}
			);
		},
		// 查询待服务订单
		getInfoBy2() {
			var that = this;
			that.Inv = 2;
			 //('查询待服务订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectClientUserOrder',
				{
					clientUserId: that.userId,
					status: 0
				},
				data => {
					 //(data); //所有的订单
					that.waitServiceOrderList = data.list;
				}
			);
		},
		// 查询待评价订单
		getInfoBy3() {
			var that = this;
			that.Inv = 3;
			 //('查询待评价订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectClientUserOrder',
				{
					clientUserId: that.userId,
					status: 1
				},
				data => {
					 //(data); //所有的订单
					that.unEvaluateOrderList = data.list;
				}
			);
		},
		// 查询已完成订单
		getInfoBy4() {
			var that = this;
			that.Inv = 4;
			 //('查询已完成订单');
			that.Get(
				//根据订单id查订单详情
				'http://39.99.137.77:8081/projects/testPhoneOrder/selectClientUserOrder',
				{
					clientUserId: that.userId,
					status: 4
				},
				data => {
					 //(data); //所有的订单
					that.finishedOrder = data.list;
				}
			);
		},

		// 切换
		changeTab(Inv) {
			this.navIdx = Inv;
		},
		// 返回首页
		toHome() {
			uni.switchTab({
				url: '/pages/tabBar/home/home'
			});
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
			justify-content: space-between;
			.time {
				font-size: 12.5px;
				color: #666;
				text-align: center;
			}
		}
	}
	.box2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 15px;
		.contentLeft {
			text-align: center;
			.pic {
				width: 90px;
				height: 90px;
				margin-top: 10px;
			}
		}
		.contentRight {
			font-size: 15px;
			padding-right: 10px;
			padding-top: 4px;
			.name {
				font-size: 17.5px;
			}
			.color {
				font-size: 15px;
				color: #666;
				margin-top: 5px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
			.price {
				height: 35px;
				line-height: 35px;
				font-size: 15px;
			}
		}
	}
	.box3 {
		border-top: 1px solid #f3f3f3;
		position: relative;
		height: 35px;
		line-height: 35px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.btnBox {
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 7px;
			right: 0;
			.btn0 {
				margin-right: 10px;
			}
			.btn {
				padding: 5px 10px;
				height: 20px;
				line-height: 20px;
				border: 1px solid #ffd845;
				color: #ffd845;
				text-align: center;
				border-radius: 15px;
				font-size: 16px;
			}
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
	border-bottom: 1px solid #ffd845;
}
</style>
