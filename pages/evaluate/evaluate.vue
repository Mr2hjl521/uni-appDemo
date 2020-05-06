<template>
	<view class="body">
		<!-- 状态栏 -->
		<view class="status"></view>
		<view class="header">
			<view class="addr" @tap="toHome()">
				<img src="/static/img/evaluate/leftArr.png" class="return">
			</view>
			<view>免费评估</view>
			<!-- <view class="icon-btn"><view class="icon tongzhi" @tap="toMsg"></view></view> -->
		</view>
		<!-- 流程介绍部分  开始-->
		<view class="flow">
			<view class="picBox">
				<img src="/static/img/evaluate/flow1.png" class="ffPic">
				<img src="/static/img/evaluate/flow4.png" class="ffPic f2">
				<img src="/static/img/evaluate/flow2.png" class="ffPic">
				<img src="/static/img/evaluate/flow4.png" class="ffPic f2">
				<img src="/static/img/evaluate/flow3.png" class="ffPic">
			</view>
			<view class="textBox">
				<view class="text">快速估价</view>
				<view class="text">上门回收</view>
				<view class="text">极速收款</view>
			</view>
		</view>
		
		<!-- 流程介绍部分  结束-->

		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view class="row" v-for="(category, index) in categoryList" :key="category.id" :class="[index == showCategoryIndex ? 'on' : '']" @tap="showCategory(index)">
					<view class="text">
						<view class="block"></view>
						{{ category}}
					</view>
				</view>
			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right">
				<view class="category" v-for="(category, index) in categoryList" :key="category.id" v-show="index == showCategoryIndex">
					<!-- <view class="banner"><image :src="category.imageUrl"></image></view> -->
					<view class="list">
						<view class="box" v-for="(box, i) in smallCategory" :key="i" @tap="toWrite(box)">
							<image :src="box.img"></image>
							<view class="text">{{ box.name }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
//高德SDK
import amap from '@/common/SDK/amap-wx.js';
export default {
	data() {
		return {
			showCategoryIndex: 0,
			headerPosition: 'fixed',
			city: '北京',
			//左侧菜单分类列表
			categoryList: ["华为","vivo","小米","魅族","OPPO"],
			// 右侧显示的具体机型
			smallCategory: [
				{ name: '机型1', img: '/static/img/goods/p1.jpg' },
				{ name: '机型2', img: '/static/img/goods/p2.jpg' },
				{ name: '机型3', img: '/static/img/goods/p3.jpg' },
				{ name: '机型4', img: '/static/img/goods/p4.jpg' },
				{ name: '机型5', img: '/static/img/goods/phone1.jpg' },
				{ name: '机型6', img: '/static/img/goods/phone2.jpg' },
				{ name: '机型7', img: '/static/img/goods/phone3.jpg' },
				{ name: '机型8', img: '/static/img/goods/phone4.jpg' }
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
		this.amapPlugin = new amap.AMapWX({
			//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
			key: '7c235a9ac4e25e482614c6b8eac6fd8e'
		});
		//定位地址
		this.amapPlugin.getRegeo({
			success: data => {
				this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); //把"市"去掉
			}
		});
		// 获取所有产品分类信息
		// this.getProducts();
		// 页面初始化的时候默认查分类1
		// this.queryFirstCategory();
	},
	methods: {
		// 返回首页
		toHome() {
			uni.switchTab({
				url: '/pages/tabBar/home/home'
			})
		},
		//消息列表
		toMsg() {
			uni.navigateTo({
				url: '../../msg/msg'
			});
		},
		
		//页面初始化时默认查分类一显示出来
// 		queryFirstCategory(){
// 			this.Get('http://192.168.3.78:8082/product/findProductByCategories', {categoriesId: 1}, data => {
// 				 //(data);
// 				this.smallCategory = data;
// 				 //(this.smallCategory);
// 			});
// 		},
		//分类切换显示
		showCategory(index) {
			this.showCategoryIndex = index;
			 //('嘻嘻');
			 //(this.smallCategory);
			// 拿着id去后端查询
// 			this.Get('http://192.168.3.78:8082/product/findProductByCategories', {categoriesId: index+1}, data => {
// 				 //(data);
// 				this.smallCategory = data;
// 				 //(this.smallCategory);
// 			});
		},
		toWrite(e) {
			uni.setStorageSync('catName', e.name);
			uni.navigateTo({
				url: '../evaluate/writeEvaluateInfo'
			});
		},
		//搜索跳转
		toSearch() {
			uni.showToast({ title: '敬请期待' });
		},
		// 获取所有待评估的机型
// 		getProducts() {
// 			this.Get('http://192.168.3.78:8082/categories/findAll', {}, data => {
// 				 //(data);
// 				this.categoryList = data;
// 				 //(this.categoryList);
// 			});
// 		},
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
	height: 50px;
	line-height: 50px;
	padding: 0 4%;
	text-align: center;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */
	
	font-size: 18px;
	.addr {
		width: 120upx;
		height: 60upx;
		position: absolute;
		top: 5px;
		left: 0;
		
		.return {
			width: 25px;
			height: 20px;
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

//评估流程部分
.flow {
	margin-top: 50px;
	background-color: #F2F2F2;
	height: 93px;
	
	.picBox {
		width : 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20px;
		padding-bottom: 10px;
		box-sizing: border-box;
		.ffPic {
			width: 30px;
			height: 30px;
		}
		.f2 {
			width : 84px;
		}
	}
	.textBox {
		width : 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 10px;
		box-sizing: border-box;
		.text {
			font-size : 12.5px;
		}
	}
	
}
.category-list {
	width: 100%;
	background-color: #fff;
	display: flex;
	.left,
	.right {
		position: absolute;

		top: 100upx;
		/*  #ifdef  APP-PLUS  */
		top: calc(100upx + var(--status-bar-height));
		/*  #endif  */
		bottom: 0upx;
	}
	.left {
		margin-top: 52px;
		width: 24%;
		left: 0upx;
		background-color: #f8f8f8;
		.row {
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			.text {
				width: 100%;
				position: relative;
				font-size: 28upx;
				display: flex;
				justify-content: center;
				color: #3c3c3c;
				.block {
					position: absolute;
					width: 0upx;
					left: 0;
				}
			}
			&.on {
				height: 100upx;
				background-color: #fff;
				.text {
					font-size: 30upx;
					font-weight: 600;
					color: #2d2d2d;
					.block {
						width: 10upx;
						height: 80%;
						top: 10%;
						background-color: #f06c7a;
					}
				}
			}
		}
	}
	.right {
		margin-top: 52px;
		width: 76%;
		left: 24%;
		.category {
			width: 94%;
			padding: 20upx 3%;
			.banner {
				width: 100%;
				height: 24.262vw;
				border-radius: 10upx;
				overflow: hidden;
				box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);
				image {
					width: 100%;
					height: 24.262vw;
				}
			}
			.list {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.box {
					width: calc(71.44vw / 3);
					margin-bottom: 30upx;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;
					image {
						width: 60%;
						height: calc(71.44vw / 3 * 0.6);
					}
					.text {
						margin-top: 5upx;
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 26upx;
					}
				}
			}
		}
	}
}
</style>
