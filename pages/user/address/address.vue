<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row" v-for="(row, index) in addressList" :key="index" @tap="select(row)">
					<view class="center">
						<view class="name-tel">
							<view class="name">{{ row.name }}</view>
							<view class="tel">{{ row.phone }}</view>
							<view class="default" v-if="row.isDefault == 1">默认</view>
						</view>
						<view class="address">{{ row.campusName }}{{ row.floorNumber }}号楼{{ row.doorNumber }}宿舍</view>
					</view>
					<view class="right"><view class="icon bianji" @tap.stop="edit(row.id)"></view></view>
				</view>
			</view>
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>
				新增地址
			</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			userId: '',
			id: '',
			isSelect: false,
			addressList: []
		};
	},
	// 监听页面返回
	onBackPress(event) {
		// #ifdef APP-PLUS
		// 退出程序
		// plus.runtime.quit();  
		// #endif
		uni.reLaunch({
			url: '/pages/tabBar/user/user'
		})
	},
// 	onBackPress(options) {
// 		if (options.from === 'navigateBack') {
// 			return false;
// 		}
// 		this.back();
// 		return true;
// 	},
	onShow() {
		// this.getMessage()
	},
	onLoad(e) {
		if (e.type == 'select') {
			this.isSelect = true;
		}
		var that = this;
		uni.getStorage({
			key: 'userId',
			success: function(res) {
				//(res.data);
				that.userId = Number(res.data);
				// 获取所有可导入的地址
				that.Get('http://39.99.137.77:8081/projects/serviceUserTime/selectAddressById', { clientUserId: res.data }, data => {
					//(data);
					that.addressList = data.clientUserAddressList;
				});
			}
		});
	},
	methods: {
		back() {
			uni.reLaunch({
				url: '../../../pages/tabBar/user/user'
			});
		},
		edit(id) {
			uni.navigateTo({
				url: 'edit/edit?id=' + id + '&type=edit'
			});
			//(id)
		},
		add() {
			uni.navigateTo({
				url: 'edit/edit?type=add'
			});
		},
		select(row) {
			//是否需要返回地址(从订单确认页跳过来选收货地址)
			if (!this.isSelect) {
				return;
			}
			uni.setStorage({
				key: 'selectAddress',
				data: row,
				success() {
					uni.navigateBack();
				}
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
					//(res)
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
	// background-color: pink;
	padding-bottom: 120upx;
}
view {
	display: flex;
}
.add {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 120upx;
	justify-content: center;
	align-items: center;
	.btn {
		box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
		width: 70%;
		height: 80upx;
		border-radius: 80upx;
		background-color: #ffd845;
		color: #fff;
		justify-content: center;
		align-items: center;
		.icon {
			height: 80upx;
			color: #fff;
			font-size: 30upx;
			justify-content: center;
			align-items: center;
		}
		font-size: 30upx;
	}
}
.list {
	flex-wrap: wrap;
	.row {
		width: 96%;
		padding: 20upx 2%;
		.left {
			width: 90upx;
			flex-shrink: 0;
			align-items: center;
			.head {
				width: 70upx;
				height: 70upx;
				background: linear-gradient(to right, #ccc, #aaa);
				color: #fff;
				justify-content: center;
				align-items: center;
				border-radius: 60upx;
				font-size: 35upx;
			}
		}
		.center {
			width: 100%;
			flex-wrap: wrap;
			.name-tel {
				width: 100%;
				align-items: baseline;
				.name {
					font-size: 34upx;
				}
				.tel {
					margin-left: 30upx;
					font-size: 24upx;
					color: #777;
				}
				.default {
					font-size: 22upx;
					background-color: #ffd845;
					color: #fff;
					padding: 0 18upx;
					border-radius: 24upx;
					margin-left: 20upx;
				}
			}
			.address {
				width: 100%;
				font-size: 24upx;
				align-items: baseline;
				color: #777;
			}
		}
		.right {
			flex-shrink: 0;
			align-items: center;
			margin-left: 20upx;
			.icon {
				justify-content: center;
				align-items: center;
				width: 80upx;
				height: 60upx;
				border-left: solid 1upx #aaa;
				font-size: 40upx;
				color: #777;
			}
		}
	}
}
</style>
