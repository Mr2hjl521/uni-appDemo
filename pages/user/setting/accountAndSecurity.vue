<template>
	<view>
		<view class="content">
			
			<view class="list">
				<view class="row">
					<view class="title">姓名</view>
					<view class="right"><view class="tis">{{nickName}}</view><view class="icon"></view></view>
				</view>
				<view class="row" @tap="editPhone()">
					<view class="title">修改手机号码</view>
					<view class="right"><view class="tis">{{phone}}</view><view class="icon xiangyou"></view></view>
				</view>
			</view>
			<!-- <view class="list">
				<view class="row">
					<view class="title">账户保护</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">安全中心</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view> -->
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: '',
				phone:''
			};
		},
		onLoad() {
			var that=this
			const value = uni.getStorageSync('userId');
			if (value) {
				that.Get('http://39.99.137.77:8081/projects/clientUser/findByClientUserId', { clientUserId: value }, data => {
					 //(data);
					// 昵称
					that.nickName = data[0].nickName;
					// 处理手机号加*
					const mobile=data[0].phone
					const pre=mobile.substring(0,3)
					const lst=mobile.substring(7,11)
					const showMobile=pre+"****"+lst
					that.phone = showMobile;
				});
				 //(value);
			}
		},
		methods: {
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			// 【修改手机号】
			editPhone() {
				uni.navigateTo({
					url: './editPhone'
				})
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
		},
		
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;	
}

.icon {
	font-size: 30upx;

}
.content{
	padding-bottom: 20upx;
	.list{
		width: 96%;
		padding-left: 4%;
		background-color: #fff;
		margin-bottom: 20upx;
		
		.row{
			widows: 100%;
			min-height: 90upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: solid 1upx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				font-size: 32upx;
				color: #333;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				.tis{
					font-size: 26upx;
					margin-right: 5upx;
					max-height: 120upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 100%;
						margin: 10upx 0;
					}
				}
				.icon{
					width: 40upx;
					color: #cecece;
				}
			}
			
		}
		
	}
}

</style>
