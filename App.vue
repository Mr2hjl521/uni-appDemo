<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
			const userId = uni.getStorageSync('userId');
			if(userId) { //有userid就没问题
				// console.log("userId",userId)
				uni.switchTab({
					url: '/pages/tabBar/home/home'
				})
			}else { //没有userid 就去登录
				uni.navigateTo({
					url: '/pages/login/verificationcode'
				})
			}
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
</style>
