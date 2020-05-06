<template>
	<view>
		<view class="content">
			<view class="tips">请输入您需要绑定的新手机号</view>
			
			<view class="list">
				<view class="row">
					<view class="title">新手机号</view>
					<view class="right">
						<input type="text" placeholder="请输入手机号" class="inputBox" v-model="phoneNumber">
						<view class="get-code" :style="{ color: getCodeBtnColor }" @click.stop="getCode()">{{ getCodeText }}</view>
					</view>
				</view>
				<view class="row">
					<view class="title">校验码</view>
					<view class="right">
						<input type="text" placeholder="请输入校验码" class="inputBox" v-model="newcode">
					</view>
				</view>
			</view>
			<view class="next">
				<view class="btn" @tap="toHome()">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				newcode: '', //用户自己输入的验证码
				code: '', //从后端拿到的验证码
				phoneNumber: '', //输入的手机号
				getCodeText: '获取验证码',
				getCodeBtnColor: '#666',
				getCodeisWaiting: false
			};
		},
		onLoad(option) {
			
			// 从缓存拿userid
			const userId = uni.getStorageSync('userId');
			if (userId) {
				 //('可以');
				this.userId = Number(userId);
				 //('this.userid', this.userId);
			}
		},
		methods: {
			getCode() {
				uni.hideKeyboard();
				if (this.getCodeisWaiting) {
					return;
				}
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)) {
					uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
					return false;
				}
				this.getCodeText = '发送中...';
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = '#ccc';
				//示例用定时器模拟请求效果
				setTimeout(() => {
					uni.showToast({ title: '验证码已发送', icon: 'none' });
					this.Get(
					'http://39.99.137.77:8081/projects/send/sms', 
					{ phone: this.phoneNumber },
					 (data) => {
						 //(data);
						this.code = data.randomNumeric;
					});
					 //(this.phoneNumber)
					this.setTimer();
				}, 500);
			},
			setTimer() {
				let holdTime = 60;
				this.getCodeText = '重新获取(60)';
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = '#eee';
						this.getCodeText = '获取验证码';
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = '重新获取(' + holdTime + ')';
					holdTime--;
				}, 1000);
			},
			
			// 【下一步】回首页
			toHome() {
				uni.hideKeyboard();
				//模板示例部分验证规则
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber)) {
					uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
					return false;
				}
				//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
				if (this.code != this.newcode) {
					uni.showToast({ title: '验证码不正确', icon: 'none' });
					return false;
				}
				 //(this.userId)
				 //(this.phoneNumber)
				
				this.Put('http://39.99.137.77:8081/projects/clientUser/updateByPhone', 
					{ 	
						id: this.userId,
						phone: this.phoneNumber,
						password: this.phoneNumber
					}, 
					data => {
					 //(data);
					if(data.code==200) {
						uni.showToast({ title: '修改成功', icon: 'success' });
						setTimeout(() => {
							uni.switchTab({ 
								url: '../../tabBar/user/user',
							});
						}, 500);
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
			Put(url, message, callback) {
				uni.request({
					method: 'PUT',
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
						callback(res.data);
					},
					fail: res => {
						callback(res);
					}
				});
			}
		}
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
	.tips {
		height: 50px;
		line-height: 50px;
		padding-left: 20px;
		// background-color: pink;
		font-size: 14px;
		color: #666;
	}
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
			border-bottom: solid 1upx #eee;
			&:last-child{
				border-bottom: none;
			}
			.title{
				width: 70px;
				font-size: 32upx;
				color: #333;
			}
			.right{
				display: flex;
				align-items: center;
				color: #999;
				padding-left: 5px;
				.inputBox {
					width: 120px;
					font-size: 15px;
				}
				.get-code{
					font-size: 15px;
					background-color: #FFFFFF;
					position: absolute;
					height: 90upx;
					display: flex;
					align-items: center;
					justify-content: center;
					right: 0;
					padding: 0 40upx;
					z-index: 3;
					&:after {
						content: " ";
						width: 1upx;
						height: 50upx;
						position: absolute;
						z-index: 3;
						margin-right: 100%;
						left: 0;
						top: 20upx;
						color: #000;
					}
				}
				.yanzheng {
					background-color: #f3f3f3;
					width: 96px;
					height: 28px;
					line-height: 28px;
					text-align: center;
				}
			}
			
		}
		
	}
	.next {
		// background-color: pink;
		text-align: center;
		// height: 50px;
		padding-top: 10px;
		.btn {
			height: 40px;
			line-height: 40px;
			width: 90%;
			color: #fff;
			background-color: #FFD845;
			margin: 0 auto;
			margin-top: 5px;
			border-radius: 3px;
		}
	}
}

</style>
