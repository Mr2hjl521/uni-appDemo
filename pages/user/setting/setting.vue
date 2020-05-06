<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="box">
					<view class="box_left">
						<view>
							<img :src="avatarUrl" class="pic">
						</view>
						<view class="content">
							<view>{{ nickName }}</view>
							<view class="rank">{{ phone }}</view>
						</view>
					</view>
					<view class="box_right">
						<view class="edit" @tap="toModeifiedData()">编辑</view>
					</view>
				</view>
				
			</view>
			<view class="list">
				<view class="row" @tap="goAccount()">
					<view class="title">账户与安全</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
			
			
			<view class="list">
				<!-- <view class="row">
					<view class="title">版本升级</view>
					<view class="right"><view class="tis">v1.0.0</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">通用</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view> -->
				<view class="row" @tap="openPrivacyWindow()">
					<view class="title">隐私保护指引</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
			<view class="list">
				<!-- <view class="row">
					<view class="title">问题反馈</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view> -->
				<view class="row" @tap="toguanyu()">
					<view class="title">关于商城</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
				</view>
			</view>
			<view class="list">
				<view class="row tac" @tap="exit()">
					<view class="title">退出登录</view>
				</view>
			</view>
		</view>
		<view class="dark" :class="['dark', windows == true ? 'show' : 'unshow']"></view>
		<!-- 隐私弹窗 -->
		<view class="addressWindows" :class="['addressWindows', windows == true ? 'show' : 'unshow']">
			<view class="title">
				<view>服务协议和隐私政策</view>
			</view>
			<view class="content">
				<p>
					请你务必审慎阅读、充分理解"服务协议“和“隐私政策”各条款，包括但不限于：为了向你提供即时通讯、内容分享等服务，我们需要收集你的设备信息、操作日志等个人信息。你可以在“设置”中查看、变更、删除个人信息并管理你的授权你可阅读
					<navigator url="./service" open-type="navigate" class="link">《服务协议》</navigator>和
					<navigator url="./privacy" open-type="navigate" class="link">《隐私政策》</navigator>了解详细信息。如你同意，请点击“同意”开始接受我们的服务。
				</p>
			</view>
			<view class="bottom">
				<view class="btn" @tap="closeWindows()">暂不使用</view>
				<view class="btn color" @tap="closeWindows()">同意</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windows: false,
				nickName: '',
				phone: '',
				avatarUrl: ''
			};
		},
		onLoad() {
			const value = uni.getStorageSync('userId');
			if (value) {
				this.Get('http://39.99.137.77:8081/projects/clientUser/findByClientUserId', { clientUserId: value }, data => {
					 //(data);
					// 昵称
					this.nickName = data[0].nickName;
					// 处理手机号加*
					const mobile=data[0].phone
					const pre=mobile.substring(0,3)
					const lst=mobile.substring(7,11)
					const showMobile=pre+"****"+lst
					this.phone = showMobile;
					// 头像
					this.avatarUrl=data[0].avatarUrl
				});
				 //(value);
			}
		},
		onShow() {
			const userId = uni.getStorageSync('userId');
			this.userId= userId
			if(userId) { //有userid就没问题
				 //("userId",this.userId)
			}else { //没有userid 就去登录
				uni.navigateTo({
					url: '../../login/verificationcode'
				})
			}
		},
		methods: {
			// 打开隐私协议
			openPrivacyWindow() {
				this.windows=true;
			},
			closeWindows() {
				this.windows=false;
			},
			// 退出登录
			exit() {
				uni.navigateTo({
					url: '../../login/verificationcode',
				});
				// 清除所有缓存
				uni.clearStorage();
			},
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			// 【账户与安全】
			goAccount() {
				uni.navigateTo({
					url: './accountAndSecurity'
				})
			},
			// 【关于】
			toguanyu() {
				uni.navigateTo({
					url: '../../guanyu/guanyu'
				})
			},
			//【编辑资料】
			toModeifiedData() {
				uni.navigateTo({
					url: './modifiedData'
				})
				// uni.navigateTo({
				// 	url: '../../help/wanshanTwo'
				// })
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
	}
</script>

<style lang="scss">
page{
	// background-color: #f3f3f3;	
	background-color: #F4F5F7;
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
		.box {
			height: 70px;
			padding: 10px;
			background-color: #fff;
			border-bottom: 1px solid #eee;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			// background-color: pink;
			.box_left{
				display: flex;
				flex-direction: row;
				.content {
					// background-color: red;
					padding-top: 10px;
					box-sizing: border-box;
					margin-left: 10px;
					.rank {
						font-size: 14px;
						color: #C8C7CC;
					}
				}
				.pic {
					width: 70px;
					height: 70px;
					border-radius: 50%;
				}
			}
			.box_right {
				height: 80px;
				.edit {
					width: 55px;
					height: 25px;
					line-height: 25px;
					color: #FFD845;
					border-radius: 5px;
					text-align: center;
					border: 1px solid #FFD845;
					margin-top: 20px;
					margin-right: 20px;
					font-size: 16px;
				}
			}
		}
		.tac {
			height: 45px;
			line-height: 45px;
			display: block;
			text-align: center;
			.title {
				color: red;
			}
		}
	}
}

// 隐私弹窗
.addressWindows {
	// overflow-y:scroll; 
	width: 80%;
	// height: 55%;
	background-color: #fff;
	position: fixed;
	bottom: 20%;
	left: 10%;
	padding: 15px;
	box-sizing: border-box;
	z-index: 999;
	border-radius: 5px;
	.title {
		font-size: 20px;
		margin-bottom: 15px;
		text-align: center;
		margin-top: 15px;
	}
	.content {
		font-size: 16px;
		.link {
			color: #FFD845;
			display: inline-block;
			text-decoration: underline;
		}
	}
	.bottom {
		height: 45px;
		line-height: 45px;
		background-color: #fff;
		border-top: 1px solid #F3F3F3;
		margin-top: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 18px;
		.btn {
			width: 90px;
			text-align: center;
		}
		.color {
			color: #FFD845;
		}
	}
}
.windows {
	width: 100%;
	height: 300px;
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
	}
	.addressBox {
		padding: 5px;
		border-radius: 5px;
		background-color: #eeeeee;
		opacity: 0.7;
		margin-bottom: 40px;
	}
	.ok {
		height: 30px;
		line-height: 30px;
		width: 150px;
		background-color: #ffd845;
		color: #000;
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
</style>
