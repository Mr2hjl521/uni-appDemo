<template>
	<view>
		<view class="logo">
			<view class="img"><image src="../../static/img/LOGO.jpg" class="pic"></image></view>
		</view>
		<!-- 账号密码输入框 -->
		<view class="form re">
			<view class="usernumber">
				<view class="get-code" :style="{ color: getCodeBtnColor }" @click.stop="getCode2()">{{ getCodeText }}</view>
				<input placeholder="请输入手机号" v-model="phoneNumber2" placeholder-style="color: #000;" />
			</view>
			<view class="code"><input placeholder="请输入验证码" v-model="mycode2" placeholder-style="color: #000;" /></view>
			<view class="btn" @tap="doLogin">登 录</view>
			<view class="res">
				<view @tap="toPage('register')">用户注册</view>
				<!-- <view class="box" @tap="wxLogin()">
					<img src="../../static/img/weixin.png" class="weixin" />
					微信登录
				</view> -->
			</view>
		</view>
		<!-- 微信登录弹窗提示 -->
		<view class="remindWindows" :class="['remindWindows', remindWindows == true ? 'show' : 'unshow']">
			<view class="title">
				<view>温馨提示</view>
				<img src="/static/img/close2.png" class="close" @tap="closeWindows()">
			</view>
			<view class="content">
				<text>亲爱的用户，如需使用微信登录本app，请先完成手机号验证。</text>
			</view>
			<view class="usernumber">
				<input placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color: #000;" />
				<view class="get-code" :style="{ color: getCodeBtnColor }" @click.stop="getCode()">{{ getCodeText }}</view>
			</view>
			<view class="code"><input placeholder="请输入验证码" v-model="mycode" placeholder-style="color: #000;" /></view>
			
			<view class="ok" @tap="weixinlogin()">
				<img src="/static/img/wx.png" class="weixin">
				<text>微信登录</text>
			</view>
		</view>
		<view class="dark" :class="['dark', remindWindows == true ? 'show' : 'unshow']"></view>
	</view>
</template>

<script>
import md5 from '@/common/SDK/md5.min.js';
export default {
	data() {
		return {
			phoneNumber2: '', //正常表格里面的手机号 不是弹窗里面的
			mycode2 : '',
			phoneNumber: '', //弹窗里面
			mycode: '',
			remindWindows: false, //支付时的免责弹窗开关
			userId: '',
			name: '',
			address: '',
			code: '000000', //正确的验证码
			passwd: '',
			getCodeText: '获取验证码',
			getCodeBtnColor: '#000',
			getCodeisWaiting: false
		};
	},
	onShow() {},
	onLoad() {
		//APP显示第三方登录
		// #ifdef APP-PLUS
		this.isShowOauth = true;
		// #endif
		// 应用程序一进去是登录页，如果缓存里面有userid 就直接去首页
		const userId = uni.getStorageSync('userId');
		this.userId= userId
		if(userId) { //有userid就没问题
			 //("userId",this.userId)
		}else { //没有userid 就去登录
			// 没有userid直接登录
		}
	},
	// 监听页面返回
	onBackPress(event) {
		 //(event)
		// #ifdef APP-PLUS
		// 退出程序
		plus.runtime.quit();  
		// #endif
	},
	methods: {
		// 点击微信登录的时候先弹窗
		wxLogin() {
			// alert(1)
			var that =this;
			uni.getProvider({
			    service: 'oauth',
			    success: function (res) {
			         //(res.provider)
			        if (~res.provider.indexOf('weixin')) {  
			            uni.login({
			                provider: 'weixin',
			                success: function (loginRes) {
			                     //(JSON.stringify(loginRes));
								 //(loginRes.authResult)
								 //(loginRes.authResult.openid)
								 //(loginRes.authResult.access_token)
								var token= loginRes.authResult.access_token;
								var openid= loginRes.authResult.openid;
								
								// **先去后端查此用户之前有没有留过手机号
								
								uni.request({
									url: 'http://39.99.137.77:8081/projects/weChatLogin/findOpenId?access_token='+token+'&openId='+openid, 
									data: '',
									header: {
										'Content-Type': 'application/json' //设置请求头请求格式为JSON
									}, 
									success: res => {
										//没有手机号，弹窗获取手机号
										if(res.data.code==400) {
											 //(res.data);
											that.remindWindows=true;
										}
										//成了，缓存userid进首页
										if(res.data.code==200) {  
											 //(res.data);
											var userId = Number(res.data.data);
											// 缓存userid，进首页
											uni.setStorage({
												key: 'userId',
												data: userId,
												success: function() {
													 //('success');
													uni.showToast({ title: '登录成功', icon: 'success' });
													uni.switchTab({ url: '../tabBar/home/home' });
												}
											});
										}
									},     
									fail: res => {
										 //(res.data);
									}
								});
			                }
			            });
			        }
			    }
			}); 
		
		},
		// 关闭微信登录弹窗
		closeWindows() {
			this.remindWindows=false;
		}, 
		
		// 微信登录 【弹窗】
		weixinlogin(){
			var that =this;
			uni.hideKeyboard();
			//模板示例部分验证规则
		
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.phoneNumber)) {
				uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
				return false;
			}
			//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
			if (that.mycode != that.code) {
				uni.showToast({ title: '验证码不正确', icon: 'none' });
				return false;
			}
			
			uni.getProvider({
			    service: 'oauth',
			    success: function (res) {
			         //(res.provider)
			        if (~res.provider.indexOf('weixin')) {  
			            uni.login({
			                provider: 'weixin',
			                success: function (loginRes) {
			                     //(JSON.stringify(loginRes));
								var msg=JSON.stringify(loginRes);
								 //(loginRes.authResult)
								 //(loginRes.authResult.openid)
								 //(loginRes.authResult.access_token)
								var token= loginRes.authResult.access_token;
								var openid= loginRes.authResult.openid;
								var phone =that.phoneNumber;
								 //(that.phoneNumber)
								uni.request({
									url: 'http://39.99.137.77:8081/projects/weChatLogin/getUserInfo?access_token='+token+'&openId='+openid+'&phone='+phone, 
									data: '',
									header: {
										'Content-Type': 'application/json' //设置请求头请求格式为JSON
									},
									success: res => {
										 //(res.data);
										var userId= res.data.data
										uni.setStorage({   
										    key: 'userId',
										    data: userId,
										    success: function () {
										         //('缓存userId成功');
												
												// 登录成功
												uni.showToast({ title: '登录成功', icon: 'success' });
												setTimeout(() => {
													uni.switchTab({
														url :'../tabBar/home/home'
													})
												}, 500);
										    }
										});
										 //("成功啦啦啦")
									},     
									fail: res => {
										// callback(res.data); 
									}
								});
			                }
			            });
			        }
			    }
			});  
		},
		Timer() {},
		getCode() {
			var that=this
			uni.hideKeyboard();
			if (that.getCodeisWaiting) {
				return;
			}
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.phoneNumber)) {
				uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
				return false;
			}
			that.getCodeText = '发送中...';
			that.getCodeisWaiting = true;
			that.getCodeBtnColor = '#000';
			uni.showToast({ title: '验证码已发送', icon: 'none' });
			var phone =that.phoneNumber;
			that.Get('http://39.99.137.77:8081/projects/weChatLogin/findByPhone?phone='+phone, {  }, data => {
				 //(data);
				if(data.code==401) {
					// 此手机号已经注册过，如果想要继续微信登录，请更换手机号
					uni.showToast({
					    title: '请更换手机号',
					    duration: 2000,
						icon: 'none'
						
					});
				}
				if(data.code==200) {
					 //("ok")
					that.Get('http://39.99.137.77:8081/projects/send/sms', { phone: that.phoneNumber }, data => {
						 //(data);
						that.code = data.randomNumeric; //拿到正确的验证码
						
					});
				}
			});
			this.setTimer();  
			 
		},  
		getCode2() {
			uni.hideKeyboard();
			if (this.getCodeisWaiting) {
				return;
			}
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber2)) {
				uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
				return false;
			}
			this.getCodeText = '发送中...';
			this.getCodeisWaiting = true;
			this.getCodeBtnColor = '#000';
			uni.showToast({ title: '验证码已发送', icon: 'none' });
			this.Get('http://39.99.137.77:8081/projects/send/sms', { phone: this.phoneNumber2 }, data => {
				 //(data);
				this.code = data.randomNumeric; //拿到正确的验证码
				console.log(this.code)
			});
			this.setTimer();  
			 
		}, 
		setTimer() {
			let holdTime = 60;
			this.getCodeText = '重新获取(60)';
			this.Timer = setInterval(() => {
				if (holdTime <= 0) {
					this.getCodeisWaiting = false;
					this.getCodeBtnColor = '#000';
					this.getCodeText = '获取验证码';
					clearInterval(this.Timer);
					return;
				}
				this.getCodeText = '重新获取(' + holdTime + ')';
				holdTime--;
			}, 1000);
		},
		// 正常流程的登录
		doLogin() {
			 //("走登录")
			uni.hideKeyboard();
			//模板示例部分验证规则
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber2)) {
				uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
				return false;
			}
			//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
			if (this.mycode2 !==this.code) {
				uni.showToast({ title: '验证码不正确', icon: 'none' });
				return false;
			}
			if(this.mycode2=='') {
				uni.showToast({ title: '没有填写验证码', icon: 'none' });
				return false;
			}
			if(this.mycode2!=''&&this.mycode2==this.code) {
				 //("ok")
				this.Get('http://39.99.137.77:8081/projects/login', { phone: this.phoneNumber2 }, data => {
					console.log(data)//?????????
					if (data.code == 'OK') {
						//成功
						this.userId= data.userId;
						uni.setStorage({
							key: 'userId',
							data: this.userId,
							success: function() {
								 //('success');
								uni.showToast({ title: '登录成功', icon: 'success' });
								uni.switchTab({ url: '../tabBar/home/home' });
							}
						});
					}
					if (data.code == 'FAIL') {
						//失败
						uni.showToast({ title: data.msg, icon: 'none' });
					}
				});
			}
			

			//模板示例把用户注册信息储存在本地，实际使用中请替换为上传服务器。
		},
		toPage(page) {
			uni.hideKeyboard();
			uni.navigateTo({
				url: page
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
					callback(res.data);
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
					callback(res.data);
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../static/css/login.scss';
.header {
	text-align: center;
	width: 100%;
	padding: 0 4%;
	height: 50px;
	line-height: 50px;
	box-sizing: border-box;
	position: relative;
	z-index: 10;
	background-color: #f1f1f1;
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
.form {
	.res {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		// color: rgba($color: #ffffff, $alpha: 0.8);
		color: #000;
		.box {
			height: 30px;
			line-height: 30px;
			.weixin {
				width: 28px;
				height: 28px;
				vertical-align: middle;
				margin-right: 3px;
			}
		}
	}
}
.oauth {
	@media all and (max-height: 150vw) {
		display: none;
	}
	position: absolute;
	bottom: 50upx;
	width: 100%;
	.text {
		width: 100%;
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba($color: #ffffff, $alpha: 0.8);
		font-size: 28upx;
	}
	.list {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20upx 0;
		.icon {
			font-size: 80upx;
			margin: 0 30upx;
		}
	}
}
// 微信登录时的弹窗
.remindWindows {
	width: 100%;
	height: 360px;
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
		text-align: center;
		position: relative;
		margin-bottom: 15px;
		.close {
			width: 30px;
			height: 30px;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	.content {
		margin-bottom: 15px;
		text-align: center;
	}
	.groups {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 50px;
		.gg {
			display: flex;
			flex-direction: row;
		}
		.kuang {
		}
	}
	.ok {
		height: 35px;
		line-height: 35px;
		width: 90%;
		background-color: red;
		color: #fff;
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
// 微信登录时的弹窗
.remindWindows {
	width: 90%;
	height: 360px;
	background-color: #fff;
	position: fixed;
	top: 30%;
	left: 5%;
	padding: 15px;
	box-sizing: border-box;
	z-index: 999;
	border-radius: 5px;
	.title {
		font-size: 22px;
		margin-bottom: 15px;
		text-align: center;
		position: relative;
		margin-bottom: 15px;
		.close {
			width: 25px;
			height: 25px;
			position: absolute;
			top: 0;
			right: 0;
		}
	}
	.content {
		margin-bottom: 30px;
		text-align: center;
	}
	
	.usernumber{
		position: relative;
		.get-code{
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
				background-color: #fff;
				position: absolute;
				z-index: 3;
				margin-right: 100%;
				left: 0;
				top: 20upx;
			}
		}
	}
	.usernumber,
	.code {
		background-color: red;
		width: calc(100% - 90upx);
		height: 90upx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #EBEBEB;
		background-color: #fff;
		padding: 0 45upx;
		margin-bottom: 26upx;
		input {
			width: 100%;
			height: 50upx;
			color: #000;
			font-weight: 200;
		}
	}
	.groups {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 50px;
		.gg {
			display: flex;
			flex-direction: row;
		}
		.kuang {
		}
	}
	.ok {
		height: 45px;
		line-height: 42px;
		width: 66%;
		background-color: #49BD38;
		color: #fff;
		text-align: center;
		border-radius: 5px;
		margin: 0 auto;
		margin-top: 40px;
		.weixin {
			width: 30px;
			height: 30px;
			margin-right: 5px;
			vertical-align: middle;
		} 
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
