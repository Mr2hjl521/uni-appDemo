<template>
	<view class="container">
			<view class="header">
				<view class="addr"></view>
				<view class="input-box"></view>
				<view class="icon-btn">
					<view class="icon tongzhi" @tap="toMsg"></view>
					<view class="icon setting" @tap="toSetting"></view>
				</view>
			</view>
		
		<!-- 用户信息 -->
		<view class="user">
			<view class="left" @tap="toSetting()"><image :src="user.avatarUrl"></image></view>
			<view class="right">
				<view class="username">{{ user.nickName }}</view>
				<view class="signature"> 
					<view>{{ user.phone }}</view>
					
				</view>
			</view>
		</view>
		
		<!-- VIP banner -->
		<view class="VIP">
			<view class="img"><image src="/static/img/VIP.png"></image></view>
			<view class="title">余额:{{ user.balance }}</view>
			<view class="tis" @tap="toRechange()">
				<img src="/static/img/qiana.png" class="pic" />
				<view class="chongzhi">去充值</view>
			</view>
		</view>
		<!-- 订单-余额 -->
		<view class="order">
			<view class="list">
				<view class="box" v-for="(row, index) in orderList" :key="index" @tap="toOrderList(index)">
					<view class="img"><view class="icon" :class="row.icon"></view></view>
					<view class="text">{{ row.text }}</view>
				</view>
			</view>
		</view>
		<!-- 工具栏 -->
		<view class="toolbar">
			<view class="title">我的工具栏</view>
			<view class="list">
				<view class="box" v-for="(row, index) in mytoolbarList" :key="index" @tap="toPage(row.url,index)">
					<view class="img"><image :src="row.img"></image></view>
					<view class="text">{{ row.text }}</view>
				</view>
				<!-- <view class="box" @tap="toHelp()">
					<view class="img"><image src="/static/img/user/point.png"></image></view>
					<view class="text">我的代取</view>
				</view>
				<view class="box" @tap="toCoupon()">
					<view class="img"><image src="/static/img/user/quan.png"></image></view>
					<view class="text">我的优惠券</view>
				</view>
				<view class="box" @tap="toAddress()">
					<view class="img"><image src="/static/img/user/addr.png"></image></view>
					<view class="text">收货地址</view>
				</view>
				<view class="box" @tap="toKong()">
					<view class="img"><image src="/static/img/user/renw.png"></image></view>
					<view class="text">我的积分</view>
				</view>
				<view class="box" @tap="toKong()">
					<view class="img"><image src="/static/img/user/choujiang.png"></image></view>
					<view class="text">售后服务</view>
				</view>
				<view class="box" @tap="toKong()">
					<view class="img"><image src="/static/img/user/bank.png"></image></view>
					<view class="text">我的任务</view>
				</view>
				<view class="box" @tap="toKong()">
					<view class="img"><image src="/static/img/user/momey.png" class="pictou"></image></view>
					<view class="text">每日签到</view>
				</view>
				<view class="box" @tap="toKong()">
					<view class="img"><image src="/static/img/user/mingxi.png"></image></view>
					<view class="text">服务保障</view>
				</view> -->
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			userId: '', //用户唯一标识
			isfirst: true,
			headerPosition: 'fixed',
			headerTop: null,
			statusTop: null,
			showHeader: true,
			//个人信息,
			user: {
				nickName: '',
				avatarUrl: '/static/img/tou.png',
				balance: '0.00',
				phone: ''
			},
			// 订单类型
			orderList: [
				{ text: '全部订单', icon: 'fukuan' },
				{ text: '待付款', icon: 'tuihuo' },
				{ text: '待服务', icon: 'fahuo' },
				{ text: '待评价', icon: 'pingjia' },
				{ text: '已完成', icon: 'shouhuo' },
				// { text: '退换货', icon: 'tuihuo' }
			],
			// 工具栏列表
			// ../../user/integral/integral  【我的积分】
			// ../../user/task/task 【每日任务】
			//../../user/checkin/checkin 【每日签到】
			// ../../user/service/service【售后服务】
			mytoolbarList: [  
				{ url: '../../help/myHelp', text: '我的代取', img: '/static/img/user/point.png' },
				{ url: '../../user/coupon/coupon', text: '我的优惠券', img: '/static/img/user/quan.png' },
				{ url: '../../user/address/address', text: '收货地址', img: '/static/img/user/addr.png' },
				{ url: '../../user/school/school', text: '申请校园兼职', img: '/static/img/tabBar/home/c3.png' },
				// { url: '', text: '我的积分', img: '/static/img/user/renw.png' },
				{ url: '../../user/phone/phone', text: '售后服务', img: '/static/img/user/choujiang.png' },
				// { url: '', text: '我的任务', img: '/static/img/user/bank.png' },
				// { url: '', text: '每日签到', img: '/static/img/user/momey.png' },
				// { url: '', text: '服务保障', img: '/static/img/user/mingxi.png' }
			]
		};
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop >= 0 ? 'fixed' : 'absolute';
		this.headerTop = e.scrollTop >= 0 ? null : 0;
		this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
	},
	onLoad() {
		var that=this;
		that.statusHeight = 0;
		// #ifdef APP-PLUS
		that.showHeader = false;
		that.statusHeight = plus.navigator.getStatusbarHeight();
		// #endif
		uni.getStorage({
			key: 'userId',
			success: function(res) {
				 //('userId', res.data);
				that.userId = res.data;
			}
		});
	},
	onReady() {
		//此处，演示,每次页面初次渲染都把登录状态重置
		// this.getMessage();
	},
	onShow() {
		try {
			const value = uni.getStorageSync('userId');
			if (value) {
				this.Get('http://39.99.137.77:8081/projects/clientUser/findByClientUserId', { clientUserId: value }, data => {
					 //(data);
					// 昵称
					this.user.nickName = data[0].nickName;
					// 余额
					if(data[0].assets!=null) {
						this.user.balance = data[0].assets;
					}else {
						this.user.balance=0
					}
					// 处理手机号加*
					const mobile=data[0].phone
					const pre=mobile.substring(0,3)
					const lst=mobile.substring(7,11)
					const showMobile=pre+"****"+lst
					this.user.phone = showMobile;
					// 头像
					this.user.avatarUrl=data[0].avatarUrl
				});
				 //(value);
			}
		} catch (e) {
			// error
		}
		
	},
	methods: {
		// 我的代取
		// toHelp() {
		// 	uni.navigateTo({
		// 		url: '../../help/myHelp'
		// 	})
		// },
		// // 我的优惠券
		// toCoupon() {
		// 	uni.navigateTo({
		// 		url: '../../user/coupon/coupon'
		// 	})
		// },
		// // 收货地址
		// toAddress() {
		// 	uni.navigateTo({
		// 		url: '../../user/address/address'
		// 	})
		// },
		// // 敬请期待
		// toKong() {
		// 	uni.showToast({ title: '敬请期待', icon: 'none' });
		// },
		//消息列表
		toMsg() {
			// uni.showToast({ title: '敬请期待',icon:'none' });
			// uni.navigateTo({
			// 	url: '../../msg/msg'
			// });
		},
		toOrderList(index) {
			 //(index)
			uni.navigateTo({ url: '../../user/order_list/order_list?tbIndex=' + index });
		},
		toSetting() {
			uni.navigateTo({
				url: '../../user/setting/setting'
			});
		},
		toMyQR() {
		},
		toLogin() {
			uni.showToast({ title: '请登录', icon: 'none' });
			uni.navigateTo({
				url: '../../login/verificationcode'
			});
			this.isfirst = false;
		},
		isLogin() {
			//实际应用中,用户登录状态应该用token等方法去维持登录状态.
			const value = uni.getStorageSync('UserInfo');
			if (value) {
				return true;
			}
			return false;
		},
		toDeposit() {
			uni.navigateTo({
				url: '../../user/deposit/deposit'
			});
		},
		//页面加载函数
		// getMessage() {
		// 	var that = this;
		// 	this.id = uni.getStorageSync('id');
		// 	this.Get('http://192.168.3.78:8082/grade/findByGreade', { id: this.id }, function(data) {
		// 		that.user = data[0];
		// 		 //(data)
		// 	});
		// },
		toPage(url,index) {
			if (!url) {
				uni.showToast({ title: '敬请期待', icon: 'none' });
				return;
			}
			if(index==3){
				var that= this
				const userId = uni.getStorageSync('userId');
				that.userId= userId
				if(userId) { //有userid就没问题
					that.Get('http://39.99.137.77:8081/projects/clientUser/findIsApplicationByClientUser?clientUserId=' + userId, {}, data => {
						 //(data); //返回的状态
						if (data == 0) {
							//没申请过
							uni.navigateTo({
								url: '/pages/user/school/school'
							});
						}
						if (data == 1) {
							//审核中
							uni.navigateTo({
								url: '/pages/user/school/checking'
							});
						}
						if (data == 2) {
							//通过
							uni.navigateTo({
								url: '/pages/user/school/getApproved'
							});
						}
						if (data == 3) {
							//未通过
							uni.navigateTo({
								url: '/pages/user/school/unapproved'
							});
						}
					});
				}
			}
			else{
				uni.navigateTo({
					url: url,
				});
			}
			
		},
		//【完善信息】
		tocomplete() {
			uni.navigateTo({
				url: '../../user/setting/modifiedData'
			});
		},
		// 【充值】
		toRechange() {
			uni.navigateTo({
				url: '../../recharge/recharge'
			});
		},
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
					alert('信息错误');
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
					 //(res);
					callback(res.data);
				},
				fail: res => {
					alert('信息错误');
				}
			});
		}
	}
};
</script>
<style lang="scss">

.header {
	width: 92%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	background-color: #FFD845;
	padding-top: 20px;
	.icon-btn {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		.icon {
			color: #fff;
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 42upx;
		}
	}
}
.user {
	width: 92%;
	padding: 0 4%;
	padding-top: 10px;
	display: flex;
	align-items: center;
	background-color: #FFD845;
	padding-bottom: 120upx;
	.left {
		width: 20vw;
		height: 20vw;
		flex-shrink: 0;
		margin-right: 20upx;
		border: solid 1upx #fff;
		border-radius: 100%;
		image {
			width: 20vw;
			height: 20vw;
			border-radius: 100%;
		}
	}
	.right {
		width: 100%;
		.username {
			font-size: 36upx;
			color: #666;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		.signature {
			color: #9AA0A6;
			font-size: 28upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.box {
				display: flex;
				flex-direction: row;
				.info {
					height: 25px;
					line-height: 25px;
					font-size: 15px;
					margin-right: 5px;
				}
				.complete {
					// width: 50px;
					padding: 0 5px;
					height: 22px;
					line-height: 22px;
					border-radius: 3px;
					text-align: center;
					// background-color: pink;
					border: 1px solid #666;
					color: #666;
				}
			}
		}
	}
	.erweima {
		flex-shrink: 0;
		width: 10vw;
		height: 10vw;
		margin-left: 5vw;
		border-radius: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to left, #fbbb37 0%, #fcf0d0 105%);
		.icon {
			color: #7b6335;
			font-size: 42upx;
		}
	}
}
.order {
	width: 84%;
	margin: 30upx 4% 30upx 4%;
	padding: 30upx 4% 20upx 4%;
	background-color: #fff;
	box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
	border-radius: 15upx;
	.list {
		display: flex;
		border-bottom: solid 1upx #17e6a1;
		padding-bottom: 10upx;
		.box {
			width: 20%;
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				.icon {
					font-size: 50upx;
					color: #464646;
				}
			}
			.text {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 28upx;
				color: #3d3d3d;
			}
		}
	}
	.balance-info {
		display: flex;
		padding: 10upx 0;
		.left {
			width: 75%;
			display: flex;
			.box {
				width: 50%;
				font-size: 28upx;

				.num {
					width: 100%;
					height: 50upx;
					display: flex;
					justify-content: center;
					align-items: flex-end;
					color: #f9a453;
				}
				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					color: #3d3d3d;
					font-size: 28upx;
				}
			}
		}
		.right {
			border-left: solid 1upx #17e6a1;
			width: 25%;
			.box {
				.img {
					width: 100%;
					height: 50upx;
					display: flex;
					justify-content: center;
					align-items: flex-end;
					.icon {
						font-size: 45upx;
						color: #e78901;
					}
				}
				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 28upx;
					color: #3d3d3d;
				}
			}
		}
	}
}
.VIP {
	width: 84%;
	margin: -65upx auto 20upx auto;
	padding: 30upx 4%;
	background: linear-gradient(to left, #dea96d 0%, #f6d59b 100%);
	box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.2);
	border-radius: 15upx;
	display: flex;
	align-items: center;
	.img {
		flex-shrink: 0;
		width: 60upx;
		height: 60upx;
		image {
			width: 60upx;
			height: 60upx;
		}
	}
	.title {
		width: 100%;
		color: #796335;
		font-size: 30upx;
	}
	.tis {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		color: red;
		font-size: 26upx;
		.pic {
			width: 25px;
			height: 25px;
			vertical-align: middle;
		}
		.chongzhi {
			width: 55px;
			height: 25px;
			line-height: 25px;
			text-align: center;
			color: #8a713e;
			font-size: 17px;
		}
	}
}
.toolbar {
	width: 92%;
	margin: 0 4% 0 4%;
	padding: 0 0 20upx 0;
	background-color: #fff;
	box-shadow: 0upx 0upx 25upx rgba(0, 0, 0, 0.1);
	border-radius: 15upx;
	.title {
		padding-top: 10upx;
		margin: 0 0 10upx 3%;
		font-size: 30upx;
		height: 80upx;
		display: flex;
		align-items: center;
	}
	.list {
		display: flex;
		flex-wrap: wrap;
		.box {
			width: 25%;
			margin-bottom: 30upx;
			
			.img {
				width: 23vw;
				height: 10.5vw;
				display: flex;
				justify-content: center;

				image {
					width: 9vw;
					height: 9vw;
				}
				.pictou {
					width: 45px;
				}
			}
			.text {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 26upx;
				color: #3d3d3d;
			}
			
		}
	}
}
</style>
