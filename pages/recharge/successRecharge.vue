<template>
	<view class="container">
		<view class="box1">
			<view class="picBox">
				<img src="/static/img/chenggong9.png" class="pic">
			</view>
			<view class="title">充值成功</view>
		</view>
		<view class="content">
			<view class="">恭喜您获得以下优惠券(二选一)</view>
			<!-- 优惠券部分开始 -->
			<view class="info-box spec coupon">
				<view class="rightPart">
					<view class="smallCou">
						<view class="smallCou-left">
							<view>免费贴膜券</view>
							<view>数量: 1</view>
						</view>
						<view class="smallCou-right" @tap="toCoupon1()">领取</view>
					</view>
					<view class="smallCou">
						<view class="smallCou-left">
							<view>免费代取券</view>
							<view>数量: 10</view>
						</view>
						<view class="smallCou-right" @tap="toCoupon2()">领取</view>
					</view>
				</view>
			</view>
			<!-- 优惠券部分结束-->
		</view>
		<view class="back" @tap="topay()">完成</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userId: '',
			flag: 0, //标记用户有没有选择优惠券 默认是0 没选
		};
	},
	onLoad() {
		var that=this;
		uni.getStorage({
			key: 'userId',
			success: function(res) {
				 //(res.data);
				that.userId = Number(res.data);
			}
		});
	},
	// 监听页面返回
	onBackPress(event) {
		// #ifdef APP-PLUS
		// 退出程序
		// plus.runtime.quit();  
		// #endif
		uni.switchTab({
			url: '/pages/tabBar/user/user'
		})
	},
	methods:{
		//【完成】
		topay() {
			 //(this.flag==0)
			// 判断用户有没有选择优惠券
			if(this.flag==0) {
				// 没选优惠券，询问用户是否放弃优惠券
				uni.showModal({
				    title: '提示',
				    content: '您还没有领取优惠券,确定要放弃领取吗?',
				    success: function (res) {
				        if (res.confirm) {
				            //('用户点击确定,放弃===跳转页面');
							uni.navigateBack({
								delta:1
							})
				        } else if (res.cancel) {
				             //('用户点击取消==继续领取');
				        }
				    }
				});
			}
			
		},
		// 领取贴膜券
		toCoupon1() {
			 //("用户选择领取贴膜券")
			this.flag=1;
			 //(this.flag)
			this.Post(   
				// 用户选择领取贴膜券
				'http://39.99.137.77:8081/projects/clientUserCoupons',
				{
				  "clientUserId": this.userId,
				  "couponsId": 1,
				  "number": 1,
				},
				data => {
					 //(data);       
					uni.showLoading({ 
					    title: '领取优惠券成功',
						icon: 'success'
					});
					
					setTimeout(function () {
					    uni.hideLoading();
						// uni.switchTab({
						// 	url:'../tabBar/user/user'
						// })
						uni.navigateBack({
							delta:1
						})
					}, 1000);
					
				}
			);
		},
		// 领取代取券
		toCoupon2() {
			 //("用户选择领取代取券");
			this.flag=2;
			 //(this.flag)
			//用户选择领取代取券
			this.Post(
				'http://39.99.137.77:8081/projects/clientUserCoupons',
				{
				  "clientUserId": this.userId,
				  "couponsId": 2,
				  "number": 10,
				},
				data => {
					 //(data); 
					uni.showLoading({
					    title: '领取优惠券成功',
						icon: 'success'
					});
					
					setTimeout(function () {
					    uni.hideLoading();
						uni.navigateBack({
							delta:1
						})
						// uni.switchTab({
						// 	url:'../tabBar/user/user'
						// })
					}, 1000);
				}
			);
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
	background-color: #f3f3f3;
	padding-top: 10px;
}
.box1 {
	.picBox {
		width: 100px;
		margin: 0 auto;
		margin-top: 30px;
		.pic {
			width: 115px;
			height: 100px;
		}
	}
	.title {
		text-align: center;
	}
}
.content {
	height: 100px;
	padding: 0 20px;
	margin-top: 20px;
	// text-align: center;
	// 优惠券部分样式开始
	.coupon {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		.title {
			font-size: 18px;
			margin-right: 10px;
			width: 18%;
		}
		.rightPart {
			// background-color: pink;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			width: 100%;
			.smallCou {
				background-color: #e5e5e5;
				width: 45%;
				height: 55px;
				border-radius: 8px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				// margin-right: 10px;
				margin: 10px 0;
				.smallCou-left {
					background-color: #fddedc;
					color: #f55764;
					width: 75%;
					border-radius: (8px 0 0 8px);
					font-size: 14px;
					text-align: center;
					padding: 5px;
				}
				.smallCou-right {
					background-color: #f5574e;
					width: 25%;
					border-radius: (0 8px 8px 0);
					text-align: center;
					color: #fff;
					font-size: 14px;
					padding: 5%;
					box-sizing: border-box;
				}
			}
		}
	
	}
	// 优惠券部分样式结束
}

.back {
	width: 88%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	background-color: #ffd845;
	color: #fff;
	border-radius: 8px;
	margin: 0 auto;
	margin-top: 50px;
}
</style>
