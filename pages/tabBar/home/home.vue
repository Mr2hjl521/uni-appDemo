<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
		<view class="header" :style="{position:headerPosition}">
			<!-- <view class="addr"><view class="icon location"></view>{{city}}</view> -->
			<view class="input-box">
				<input placeholder="搜索关键字" placeholder-style="color:#c0c0c0;" @tap="toSearch()" disabled="true"/>
				<view class="icon search"></view>
			</view>
			<view class="icon-btn">
				<view class="icon tongzhi" @tap="toMsg()"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<img src="../../../static/img/lunbo1.png" class="lunbo">
				<!-- <swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id"><image :src="swiper.url"></image></swiper-item>
				</swiper>
				<view class="indicator"><view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view></view> -->
			</view>
		</view>
		<!-- 分类列表   开始-->
		<!-- <view class="category-list"> -->
			<!-- <view class="category" @tap="toOldPhone()">
				<view class="img"><image src="/static/img/tabBar/home/c1.png"></image></view>
				<view class="text">二手手机</view>
			</view>
			<view class="category" @tap="toRecycle()">
				<view class="img"><image src="/static/img/tabBar/home/c2.png"></image></view>
				<view class="text">手机回收</view>
			</view>
			<view class="category" @tap="toSchool()">
				<view class="img"><image src="/static/img/tabBar/home/c3.png"></image></view>
				<view class="text">申请校园兼职</view>
			</view>
			<view class="category" @tap="toNewPhone()">
				<view class="img"><image src="/static/img/tabBar/home/c4.png"></image></view>
				<view class="text">全新手机</view>
			</view>
			<view class="category" @tap="toEvaluate()">
				<view class="img"><image src="/static/img/tabBar/home/c5.png"></image></view>
				<view class="text">免费估价</view>
			</view>
			<view class="category" @tap="toEvaluate()">
				<view class="img"><image src="/static/img/tabBar/home/c6.png"></image></view>
				<view class="text">以旧换新</view>
			</view>
		</view> -->
		<!-- 分类列表  结束 -->
		<!-- 广告图 -->
		<view class="banner">
			<image src="/static/img/x2.png" @tap="toCategoryList()" class="bannpic"></image>
			<image src="/static/img/x1.png" @tap="toHelp()"></image>
		</view>
		<!-- 活动区 -->
		<!-- <view class="promotion">
			<view class="text">优惠专区</view>
			<view class="list">
				<view class="column" v-for="(row, index) in Promotion" @tap="toPromotion(row)" :key="index">
					<view class="top">
						<view class="title">{{ row.title }}</view>
						<view class="countdown" v-if="row.countdown">
							<view>{{ row.countdown.h }}</view>
							:
							<view>{{ row.countdown.m }}</view>
							:
							<view>{{ row.countdown.s }}</view>
						</view>
					</view>
					<view class="left">
						<view class="ad">{{ row.ad }}</view>
						<view class="into">点击进入</view>
					</view>
					<view class="right"><image :src="row.img"></image></view>
				</view>
			</view>
		</view> -->
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="title">
				<image src="/static/img/hua.png"></image>
				猜你喜欢
				<image src="/static/img/hua.png"></image>
			</view>
			<view class="product-list">
				<view class="product" v-for="product in productList" :key="product.id" @tap="toGoods(product.id)">
					<image mode="widthFix" :src="product.filmImage"></image>
					<view class="name">{{ product.filmName }}</view>
					<view class="info">
						<view class="price">{{ product.filmPrice }}元</view>
						<view class="slogan">{{ product.filmDesc }}</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{ loadingText }}</view>
		</view>
	</view>
</template>

<script>
var ttt = 0;
//高德SDK
// import amap from '@/common/SDK/amap-wx.js';
export default {
	data() {
		return {
			userId: '',
			showHeader: true,
			afterHeaderOpacity: 1, //不透明度
			headerPosition: 'fixed',
			headerTop: null,
			statusTop: null,
			nVueTitle: null,
			city: '北京',
			currentSwiper: 0,
			// 轮播图片
			swiperList: [
				// { id: 1, src: 'url1', img: '/static/img/tabBar/home/banner1.png' },
				// { id: 2, src: 'url2', img: '/static/img/bb2.jpg' },
				// { id: 3, src: 'url3', img: '/static/img/tabBar/home/banner2.png' },
				// { id: 4, src: 'url4', img: '/static/img/bb1.jpg' }
			],
			// 分类菜单
			categoryList: [
				// { id: 1, name: '手机贴膜', img: '/static/img/category/tiemoa.png' },
				{ id: 1, name: '二手手机', img: '/static/img/category/gobacka.png' },
				{ id: 2, name: '手机回收', img: '/static/img/category/twicephonea.png' },
				{ id: 3, name: '申请校园代理', img: '/static/img/category/renzheng.png' },
				{ id: 4, name: '全新手机', img: '/static/img/category/newphonea.png' },
				{ id: 5, name: '免费估价', img: '/static/img/category/thinka.png' },
				{ id: 6, name: '以旧换新', img: '/static/img/category/oldnewa.png' }
				// { id: 8, name: '服务保障', img: '/static/img/category/protecta.png' }
			],
			Promotion: [],
			//猜你喜欢列表
			productList: [
				
			],
			loadingText: '我也是有底线的...'
		};
	},
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		this.headerPosition = e.scrollTop >= 0 ? 'fixed' : 'absolute';
		this.headerTop = e.scrollTop >= 0 ? null : 0;
		this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
	},
	//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		// uni.showToast({ title: '触发上拉加载' });
		let len = this.productList.length;
		if (len >= 40) {
			this.loadingText = '人家也是有底线的！';
			return false;
		}
	},
	onLoad() {
		const userId = uni.getStorageSync('userId');
		this.userId= userId
		if(userId) { //有userid就没问题
			 //("userId",this.userId)
		}else { //没有userid 就去登录
			uni.navigateTo({
				url: '../../login/verificationcode'
			})
		}
		
		// 获取轮播图方法
		this.getSwiperImg();
		// 获取所有的产品图信息
		this.getProducts();
	},
	onShow() {
		
	},
	methods: {
		police() {
			uni.showToast({ title: '敬请期待',icon:'none' });
		},
		
		// 获取轮播图片
		getSwiperImg() {
			this.Get('http://39.99.137.77:8081/projects/carouselImage/findAll', {}, data => {
				 //(data);
				this.swiperList = data;
				 //(this.swiperList);
			});
		},
		// 获取所有产品
		getProducts() {
			// console.log("测试")
			this.Get('http://39.99.137.77:8081/projects/phoneFilm/findAll', {}, data => {
				 //(data);
				this.productList = data;
				// console.log(this.productList)
				 //(this.productList);
			});
		},
		//消息列表
		toMsg() {
			// uni.showToast({ title: '敬请期待',icon:'none' });
		},
		//搜索跳转
		toSearch() {
			// uni.showToast({ title: '敬请期待',icon:'none' });
		},
		// 跳转至“代取快递”页面
		toHelp() {
			var that= this
			// 请求后端
			const userId = uni.getStorageSync('userId');
			that.userId= userId
			if(userId) { //有userid就没问题
				 //("userId",that.userId)
				that.Get('http://39.99.137.77:8081/projects/clientUserAddress/selectBooleanAddress', { clientUserId: userId }, data => {
					 //(data);
					if (data.flag == true) {
						//说明用户已经完善  跳转页面
						uni.navigateTo({
							url: '../../help/writeHelpInfo'
						});
					} 
					if(data.flag == false) {
						 //('未完善信息');  
						// 提示用户去完善信息
						uni.showModal({
							title: '提示',
							content: '完善信息后才能代取哦，是否去完善？',
							success: function(res) {
								if (res.confirm) {
									 //('用户点击确定');
									uni.navigateTo({
										url: '/pages/help/wanshanTwo',
										
									});
								} else if (res.cancel) {
									 //('用户点击取消');
								}
							}
						});
						
					}
				});
			}
			
			
			
		},
		// 跳转至“免费评估”页面
		toEvaluate() {
			uni.showToast({ title: '敬请期待',icon:'none' });
			// uni.navigateTo({
			// 	url: '../../evaluate/evaluate'
			// });
		},
		// 跳转至“申请成为校园代理”页面
		toSchool() {
			// 根据用户id查此用户有没有申请过校园兼职
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
		},
		// 跳转至分类页面的”二手手机“
		toOldPhone() {
			uni.showToast({ title: '敬请期待',icon:'none' });
			// var userSeId = 1;
			// uni.setStorageSync('userSeId', userSeId);
			// uni.switchTab({
			// 	url: '../category/category'
			// });
		},
		// 跳转至分类页面的”手机回收“
		toRecycle() {
			uni.showToast({ title: '敬请期待',icon:'none' });
			// var userSeId = 2;
			// uni.setStorageSync('userSeId', userSeId);
			// uni.switchTab({
			// 	url: '../category/category'
			// });
		},
		// 跳转至分类页面的”全新手机“
		toNewPhone() {
			uni.showToast({ title: '敬请期待',icon:'none' });
			// var userSeId = 4;
			// uni.setStorageSync('userSeId', userSeId);
			// uni.switchTab({
			// 	url: '../category/category'
			// });
		},
		//轮播图跳转
		toSwiper(e) {
			// uni.showToast({ title: e.src, icon: 'none' });
			var userSeId = 3;
			uni.setStorageSync('userSeId', userSeId);
			uni.switchTab({
				url: '../category/category'
			});
		},
		// 首页“手机贴膜”跳转链接到分类页面的手机贴膜选项
		toCategoryList(id) {
// 			var userSeId = 4;
// 			uni.setStorageSync('userSeId', userSeId);
			uni.switchTab({
				url: '../category/category'
			});
		},
		//分类跳转
		//推荐商品跳转
		toPromotion(e) {
			uni.showToast({ title: e.title, icon: 'none' });
		},
		//商品跳转
		toGoods(id) {
			// uni.showToast({ title: '商品' + e.goods_id, icon: 'none' });
			var id = id;
			 //(id);
			uni.navigateTo({
				url: '../../goods/screenGoods?id='+id
			});
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
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
	position: relative;
	background-color: #fff;
}

@font-face {
	font-family: 'HMfont-home';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
		format('woff2');
}

.pullDown-effects {
	position: fixed;
	//top: calc(100upx - 36vw);
	top: 0;
	z-index: 9;
	width: 100%;
	height: 36vw;
	/*  #ifdef  APP-PLUS  */
	padding-top: var(--status-bar-height);
	/*  #endif  */
	image {
		width: 100%;
		height: 36vw;
	}
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}
.header {
	width: 92%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;

	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.addr {
		width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		font-size: 28upx;
		.icon {
			height: 60upx;
			margin-right: 5upx;
			display: flex;
			align-items: center;
			font-size: 42upx;
			color: #ffc50a;
		}
	}
	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 28upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
	.icon-btn {
		width: 60upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		.icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 42upx;
		}
	}
}
.place {
	background-color: #ffffff;
	height: 100upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
.swiper {
	width: 100%;
	margin-top: 10upx;
	display: flex;
	justify-content: center;
	.swiper-box {
		width: 92%;
		height: 30.7vw;
		overflow: hidden;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;
		.lunbo {
			width: 100%;
			height: 100%;
		}
		swiper {
			width: 100%;
			height: 30.7vw;
			swiper-item {
				image {
					width: 100%;
					height: 30.7vw;
				}
			}
		}
		.indicator {
			position: absolute;
			bottom: 20upx;
			left: 50%;
			margin-left: -75upx;
			background-color: rgba(255, 255, 255, 0.4);
			width: 150upx;
			height: 5upx;
			border-radius: 3upx;
			overflow: hidden;
			display: flex;
			.dots {
				width: 0upx;
				background-color: rgba(255, 255, 255, 1);
				transition: all 0.3s ease-out;
				&.on {
					width: (100%/3);
				}
			}
		}
	}
}

.category-list {
	width: 92%;
	margin: 0 4%;
	padding: 0 0 30upx 0;
	border-bottom: solid 2upx #f6f6f6;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.category {
		width: 33%;
		margin-top: 50upx;
		display: flex;
		flex-wrap: wrap;
		.img {
			width: 100%;
			display: flex;
			justify-content: center;
			image {
				width: 40px;
				height: 40px;
			}
			.ptou2{
				width: 50px;
				height: 40px;
			}
			.ptou3{
				width: 55px;
				height: 40px;
			}
		}
		.img9 {
			image {
				width: 27px;
				height: 40px;
			}
		}
		.text {
			margin-top: 16upx;
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24upx;
			color: #3c3c3c;
		}
	}
}
.banner {
	width: 92%;
	margin: 40upx 4%;
	// background-color: pink;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	image {
		width: 48%;
		height: 24vw;
		border-radius: 5vw;
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
	}
	.bannpic {
		margin-right: 5px;
	}
}
.promotion {
	width: 92%;
	margin: 0 4%;
	.text {
		width: 100%;
		height: 60upx;
		font-size: 34upx;
		font-weight: 600;
		margin-top: -10upx;
	}
	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.column {
			width: 43%;
			padding: 15upx 3%;
			background-color: #ebf9f9;
			border-radius: 10upx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.top {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				margin-bottom: 5upx;
				.title {
					font-size: 30upx;
				}
				.countdown {
					margin-left: 20upx;
					display: flex;
					height: 40upx;
					display: flex;
					align-items: center;
					font-size: 20upx;
					view {
						height: 30upx;
						background-color: #f06c7a;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						border-radius: 4upx;
						margin: 0 4upx;
						padding: 0 2upx;
					}
				}
			}
			.left {
				width: 50%;
				height: 18.86vw;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				.ad {
					margin-top: 5upx;
					width: 100%;
					font-size: 22upx;
					color: #acb0b0;
				}
				.into {
					width: 100%;
					font-size: 24upx;
					color: #aaa;
					margin-bottom: 5upx;
				}
			}
			.right {
				width: 18.86vw;
				height: 18.86vw;
				image {
					width: 18.86vw;
					height: 18.86vw;
				}
			}
		}
	}
}
.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		width: 92%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			width: 48%;
			border-radius: 20upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
			.name {
				width: 92%;
				padding: 10upx 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 10upx 4% 10upx 4%;

				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
					width: 35%;
				}
				
				.slogan {
					width: 80%;
					color: #807c87;
					font-size: 24upx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}
}
</style>
