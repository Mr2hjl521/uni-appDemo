<template>
	<view>
		<view class="logo">
			<view class="img"><image src="../../static/img/LOGO.jpg" class="pic"></image></view>
		</view>
		<view class="form re">
			<view class="name">
				<input placeholder="请输入您的真实姓名" v-model="name" placeholder-style="color: #000;" />
			</view>
			<view class="password">
				<text class="sex">性别:</text>
				<view>
					<radio-group @change="radioChange" class="groupbox">
						<label class="group" v-for="(item, index) in items" :key="item.value">
							<view><radio :value="item.value" :checked="index === current" class="option" :color="'#FFD845'" /></view>
							<view><image :src="item.src" class="icon"></image></view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="usernumber">
				<view class="get-code" :style="{ color: getCodeBtnColor }" @click.stop="getCode2()">{{ getCodeText }}</view>
				<input placeholder="请输入手机号" v-model="phoneNumber2" placeholder-style="color: #000;" />
			</view>
			<view class="code"><input placeholder="请输入验证码" v-model="mycode2" placeholder-style="color: #000;" /></view>
			<view class="btn" @tap="doReg">立即注册</view>
			<view class="res">
				<view @tap="toLogin">已有账号立即登录</view>
			</view>
			<!-- <view class="res" @tap="wxLogin()">
				<img src="/static/img/weixin.png" class="weixin">
				<view>微信登录</view>
			</view> -->
			  
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
			
			<!-- <view class="ok" @tap="weixinlogin()">
				<img src="/static/img/wx.png" class="weixin">
				<text>微信登录</text>
			</view> -->
		</view>
		<view class="dark" :class="['dark', remindWindows == true ? 'show' : 'unshow']"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phoneNumber2: '', //正常表格里面的手机号 不是弹窗里面的
			mycode2 : '',
			remindWindows: false, //支付时的免责弹窗开关
			current: 0,
			sex: '1', //男女
			items: [
				{
					value: '1',
					name: '男',
					checked: 'true',
					src: '/static/img/n.png'
				},
				{
					value: '0',
					name: '女',
					src: '/static/img/g.png'
				}
				
				
			],
			value: '',
			name: '',
			address: '', //学校地址
			phoneNumber: '',
			code: '', //从后端获取的验证码 
			mycode: '', //用户自己填写的验证码
			passwd: '',
			getCodeText: '获取验证码',
			getCodeBtnColor: '#000',
			getCodeisWaiting: false
		};
	},
	onLoad() {},
	methods: {
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
			alert(11)
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
		// 单选性别
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			 //(evt.target.value);
			this.sex = Number(evt.target.value);
		},
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
						console.log(data.randomNumeric)
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
				console.log(data)
				this.code = data.randomNumeric; //拿到正确的验证码
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
		
		// 马上注册
		doReg() {
			var that =this
			 //(that.sex)
			uni.hideKeyboard();
			//模板示例部分验证规则
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.phoneNumber2)) {
				uni.showToast({ title: '请填写正确手机号码', icon: 'none' });
				return false;
			}
			//示例验证码，实际使用中应为请求服务器比对验证码是否正确。
			if (that.mycode2 != that.code) {
				uni.showToast({ title: '验证码不正确', icon: 'none' });
				return false;
			}
			uni.showLoading({
				title: '提交中...'    
			});
			setTimeout(function () {
				// 关了提示框
			    uni.hideLoading();
				that.Post(
					'http://39.99.137.77:8081/projects/clientUser/add',
					{
						avatarUrl: 'b/2019/11/af04c141b650e8c64c8399daf90001b.png',
						nickName: that.name,
						password: that.phoneNumber2,
						phone: that.phoneNumber2,
						sex: that.sex
					},  
					data => {
						// console.log(data)
						if(data.code==200) {
							// 注册成功
							var userId= data.clientUserId;
							uni.setStorage({   
							    key: 'userId',
							    data: userId,
							    success: function () {
							         //('缓存userId成功');
									// 登录成功
									uni.showToast({ title: '注册成功', icon: 'success' });
									setTimeout(() => {
										// 注册跳转到“完善信息”页面
										uni.navigateTo({
											url: './wanshan'
										})
									}, 500);
							    }
							});
							
						}
						if(data.code==300) {
							uni.showToast({ title: '此手机号已经注册过', icon: 'none' });
						}
					}
				);
			}, 1000);
		},
		
		// 已经有账号去登录  
		toLogin() {
			uni.hideKeyboard();
			uni.redirectTo({ url: 'verificationcode' });
		},
		// 封装好的post+get
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
					// alert("信息错误")
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
					// alert("信息错误")
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../static/css/login.scss';

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
