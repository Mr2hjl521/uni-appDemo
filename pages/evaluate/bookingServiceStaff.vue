<template>
	<view class="body">
		<view class="p10">
			<view class="serviceBox"  v-for="(item, index) in serviceStaffs" :key="index" @tap="bookingTime(item.suId)">
				<view class="serviceBox_left">
					<img :src="item.suAvatarUrl" class="pic">
				</view>
				<view class="serviceBox_right">
					<view class="right_a">
						<view class="name">
						{{item.suName}}
						<text class="sex">{{sex[item.suSex]}}</text>
						</view>
						<view class="remark">看看大家怎么说</view>
					</view>
					<view class="right_b">
						<text>{{ item.suSchool}}</text><text>{{ item.suFloorNumber}}号楼</text><text>{{ item.suDoorNumber}}</text>
					</view>
					<view class="right_c">
						{{item.suPersonalDesc}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import amap from '@/common/SDK/amap-wx.js';
	export default {
		data() {
			return {
				sex:['女','男'],
				serviceStaffs: [
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
		onLoad(option) {
			var that= this
			uni.getStorage({
				key: 'userId',
				success: function(res) {
					 //(res.data)
					// 获取所有的服务人员信息
					that.Get('http://39.99.137.77:8081/projects/serviceUser/selectAllServiceUser', { clientUserId: res.data }, data => {
						 //(data); //服务人员信息
						for(var i=0;i<data.length;i++) {
							that.serviceStaffs.push(data[i])
						}
						 //(that.serviceStaffs)
					});	
				}
			});
			
		},
		methods: {
			// 返回
			goBack() {
				uni.navigateTo({
					url: '../goods/screenGoods'
				})
			},
			// 跳转至"选择预约时间"页面
			bookingTime(suId) {
				 //(suId)
				uni.setStorage({
					key: 'serviceUserId',
					data: suId,
					success: function() {
						 //('serviceUserId缓存成功');
						uni.navigateTo({
							url: '../evaluate/bookingTime'
						})
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
	background-color: #FFD845;
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
.p10 {
	padding: 10px;
}	
.serviceBox {
	height: 100px;
	width: 100%;
	padding:  10px 10px;
	box-sizing: border-box;
	// background-color: pink;
	border-bottom: 1px solid #E5E5E5;
	display: flex;
	flex-direction: row;
	.serviceBox_left {
		.pic {
			width: 70px;
			height: 70px;
			margin-right: 10px;
		}
	}
	.serviceBox_right {
		width: 100%;
		font-size: 14px;
		.right_a {
			height: 24px;
			line-height: 24px;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: 7px;
			.name {
				font-size: 18px;
				.sex {
					color: red;
					margin-left: 5px;
				}
			}
			.remark {
				font-size: 13px;
				color: #C0C0C0;
			}
			
		}
		.right_b,.right_c {
			margin-top: 3px;
		}
		
	}
}

</style>
