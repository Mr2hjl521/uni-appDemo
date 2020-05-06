<template>
	<view class="page">
		<view class="section">
			<fl-signin :date="date" :list="list" @signin_fun="signin_fun" :repair="repair" :rule="rule" @repair_fun="repair_fun"
			 :choose_date="choose_date" @date_change="date_change"></fl-signin>
		</view>
	</view>
</template>
<script>
	import flSignin from '../../../components/fl-signin/fl-signin.vue'
	export default {
		components: {
			flSignin,
		},
		data() {
			return {
				// 是否可以选择日期
				choose_date: true,
				// 当前日期
				date: "2019-10",
				// 签到成功列表
				list: ["02"],
				// 是否开启补签
				repair: false,
				// 是否开启补签规则
				rule: false,
			}
		},
		methods: {
			// 签到时触发
			signin_fun(res) {
				this.list.push(res.day)
				uni.showToast({
					title: "签到成功",
					icon: "none"
				})
			},
			// 补签成功时触发
			repair_fun(res) {
				this.list.push(res.day)
				uni.showToast({
					title: "补签成功",
					icon: "none"
				})
			},
			// 当月份改变时触发
			date_change(date) {
				// 更新当前日期
				this.date = date;
				// 更新签到列表
				let list = ["01", "02"];
				this.list = list;
			},
		}
	}
</script>

<style scoped>
	.footer {
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin: 40upx auto 0;
	}

	.footer .repair {
		margin: 20upx auto 0;
		padding: 20upx 50upx;
		border: 1px solid #ccc;
		border-radius: 10upx;
	}
</style>
