<template>
	<view class="body">
		<view class="header" @tap="goBack()">
			<img src="/static/img/evaluate/leftArr.png" class="return" />
			<view class="title">评估结果</view>
		</view>
		<view class="box1">
			<view class="type">机型： 荣耀v10</view>
			<view class="price">&yen;8889</view>
			<view class="add">添加更多旧机</view>
		</view>
		<view class="box2">上门验机时间： 18：00-22：00</view>
		<view class="box3" @tap="toBook()">立即换钱</view>
		<view class="box3" @tap="toNewPhone()">以旧换新</view>
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
			categoryList: ['华为', 'vivo', '小米', '魅族', 'OPPO'],
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
		// 返回
		goBack() {
			uni.navigateTo({
				url: '../evaluate/writeEvaluateInfo'
			});
		},
		// 跳转至 分类页面的全新机页面 ==[以旧换新]
		toNewPhone() {
			var userSeId = 2;
			uni.setStorageSync('userSeId', userSeId);
			uni.switchTab({
				url: '../tabBar/category/category'
			});
		},
		// "预约服务人员" ==[立即换钱]
		toBook() {
			uni.navigateTo({
				url: '../evaluate/bookingServiceStaff'
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
		}
	}
};
</script>

<style lang="scss">
.header {
	text-align: center;
	width: 100%;
	padding: 0 4%;
	height: 50px;
	line-height: 50px;
	box-sizing: border-box;
	position: relative;
	z-index: 10;
	background-color: #fff;
	color: #000;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.title {
		text-align: center;
	}

	.return {
		width: 25px;
		height: 20px;
		position: absolute;
		left: 10px;
		top: 15px;
	}
}
.box1 {
	height: 100px;
	background-color: #494aaa;
	color: #fff;
	padding: 10px;
	.type {
		font-size: 12.5px;
		margin-bottom: 10px;
	}
	.price {
		text-align: center;
		font-size: 26px;
	}
	.add {
		width: 90px;
		height: 30px;
		line-height: 30px;
		background-color: #009688;
		font-size: 13px;
		text-align: center;
		border-radius: 5px;
		margin: 0 auto;
		margin-top: 5px;
	}
}
.box2 {
	padding-top: 200px;
	text-align: center;
	font-size: 13px;
}
.box3 {
	background-color: #43cf7c;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #fff;
	margin: 0 auto;
	border-radius: 5px;
	text-align: center;
	margin-top: 30px;
	font-size: 18px;
}
</style>
