<template>
	<view class="container">
		<view class="msg">{{msg}}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			msg: ''
		};
	},
	onLoad() {
		
		this.Get('http://39.99.137.77:8081/projects/aboutMall/findAll', { status:2 }, data => {
			 //(data);
			this.msg=data[0].help;
			
		});
	},

	methods: {
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
	page {
		box-sizing: border-box;
		// padding-top: 50%;
	}
.container {
	height: 100%;
	box-sizing: border-box;
	.msg {
		box-sizing: border-box;
		height: 200px;
		width: 100%;
		// background-color: pink;
		text-align: center;
		padding: 20px;
	}
}
</style>
