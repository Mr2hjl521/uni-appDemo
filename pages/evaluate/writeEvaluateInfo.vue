<template>
	<view class="body">
		<!-- 状态栏 -->
		<view class="status"></view>
		<view class="header">
			<img src="/static/img/evaluate/leftArr.png" class="return" @tap="toEvaluate()" />
			<view class="title">填写评估信息</view>
		</view>
		<!--  :style="{ position: headerPosition }" -->
		<view class="msg">选择结果与实际相符，将以最快速度收款</view>
		<view class="phoneType">当前估价机型： 小米9</view>
		<!-- 答题框 -->
		<!-- 1 -->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">1</view>
				<text class="fontC">使用情况</text>
			</view>
			<radio-group @change="radioChange">
				<label class="uni-list-cell" v-for="(item, index) in items1" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 2 -->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">2</view>
				<text class="fontC">边框背板</text>
			</view>
			<radio-group @change="radioChange2">
				<label class="uni-list-cell" v-for="(item, index) in items2" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 3 -->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">3</view>
				<text class="fontC">屏幕外观</text>
			</view>
			<radio-group @change="radioChange3">
				<label class="uni-list-cell" v-for="(item, index) in items3" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 4 -->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">4</view>
				<text class="fontC">屏幕显示</text>
			</view>
			<radio-group @change="radioChange4">
				<label class="uni-list-cell" v-for="(item, index) in items4" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 5-->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">5</view>
				<text class="fontC">型号</text>
			</view>
			<radio-group @change="radioChange5">
				<label class="uni-list-cell" v-for="(item, index) in items5" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 6-->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">6</view>
				<text class="fontC">存储容量</text>
			</view>
			<radio-group @change="radioChange6">
				<label class="uni-list-cell" v-for="(item, index) in items6" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 7-->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">7</view>
				<text class="fontC">购买渠道</text>
			</view>
			<radio-group @change="radioChange7">
				<label class="uni-list-cell" v-for="(item, index) in items7" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 8-->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">8</view>
				<text class="fontC">机身颜色</text>
			</view>
			<radio-group @change="radioChange8">
				<label class="uni-list-cell" v-for="(item, index) in items8" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 9-->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">9</view>
				<text class="fontC">保修期时长</text>
			</view>
			<radio-group @change="radioChange9">
				<label class="uni-list-cell" v-for="(item, index) in items9" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 10-->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">10</view>
				<text class="fontC">账户</text>
			</view>
			<radio-group @change="radioChange10">
				<label class="uni-list-cell" v-for="(item, index) in items10" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>
		<!-- 11-->
		<view class="problemBox">
			<view class="tit">
				<view class="yuan">11</view>
				<text class="fontC">维修情况</text>
			</view>
			<radio-group @change="radioChange11">
				<label class="uni-list-cell" v-for="(item, index) in items11" :key="item.value">
					<view class="boxx">
						<radio :value="item.value" color="#25A6E0" class="yuan"/>
						<view>{{ item.name }}</view>
					</view>
				</label>
			</radio-group>
		</view>

		<!-- 是否存在以下问题 -->
		<view class="problems">
			<view class="tit">是否存在以下问题(多选或不选)</view>

			<view class="option-list">
				<checkbox-group @change="checkboxChange" class="groups" >
					<label v-for="item in items" :key="item.value" class="gg">
						<view class="jj">
							<checkbox :value="item.value" :checked="item.checked" class="kuang"/></view>
						<view>{{ item.name }}</view>
					</label>
				</checkbox-group>
			</view>
		</view>

		<!-- 马上估价 -->
		<view class="ok" @tap="ok()">马上估价</view>
	</view>
</template>
<script>
//高德SDK
import amap from '@/common/SDK/amap-wx.js';
export default {
	data() {
		return {
			showCategoryIndex: 0,
			headerPosition: 'fixed',
			city: '北京',
			//左侧菜单分类列表
			categoryList: ['华为', 'vivo', '小米', '魅族', 'OPPO'],
			// 右侧显示的具体机型
			smallCategory: [
				{ name: '机型1', img: '/static/img/goods/p1.jpg' },
				{ name: '机型2', img: '/static/img/goods/p2.jpg' },
				{ name: '机型3', img: '/static/img/goods/p3.jpg' },
				{ name: '机型4', img: '/static/img/goods/p4.jpg' },
				{ name: '机型5', img: '/static/img/goods/phone1.jpg' },
				{ name: '机型6', img: '/static/img/goods/phone2.jpg' },
				{ name: '机型7', img: '/static/img/goods/phone3.jpg' },
				{ name: '机型8', img: '/static/img/goods/phone4.jpg' }
			],
			title: 'radio',
			items1: [
				{
					value: '1',
					name: '正常进入桌面'
				},
				{
					value: '4',
					name: '全新包装未拆封'
				},
				{
					value: '0',
					name: '无法开机/无法进入桌面'
				}
			],

			items2: [
				{
					value: '4',
					name: '完美无任何瑕疵'
				},
				{
					value: '3',
					name: '明显划痕/磕碰/掉漆'
				},
				{
					value: '2',
					name: '外壳裂痕/变形/刻字'
				},
				{
					value: '1',
					name: '全新包装未拆封'
				}
			],
			items3: [
				{
					value: '4',
					name: '屏幕无任何划痕'
				},
				{
					value: '3',
					name: '屏幕少量细微划痕'
				},
				{
					value: '1',
					name: '明显划痕/缺角/裂碎'
				}
			],
			items4: [
				{
					value: '4',
					name: '显示完美几乎全新'
				},
				{
					value: '3',
					name: '显示细微色素/泛黄'
				},
				{
					value: '2',
					name: '明显色斑/漏液/老化'
				},
				{
					value: '1',
					name: '屏幕无法正常显示'
				}
			],
			items5: [
				{
					value: '2',
					name: 'A1864-全网通'
				},
				{
					value: '1',
					name: '其他'
				}
			],
			items6: [
				{
					value: '2',
					name: '256G'
				},
				{
					value: '1',
					name: '64G'
				}
			],
			items7: [
				{
					value: '1',
					name: '大陆国行'
				},
				{
					value: '3',
					name: '国航官换机'
				},
				{
					value: '2',
					name: '香港行货'
				},
				{
					value: '4',
					name: '国航显示机'
				},
				{
					value: '5',
					name: '非国航港行-无锁'
				},
				{
					value: '6',
					name: '非国航港行-有锁'
				}
			],
			items8: [
				{
					value: '1',
					name: '金色'
				},
				{
					value: '2',
					name: '黑色'
				},
				{
					value: '3',
					name: '白色'
				},
				{
					value: '4',
					name: '红色'
				}
			],
			items9: [
				{
					value: '2',
					name: '保修期剩余一个月以上'
				},
				{
					value: '1',
					name: '过保/保修期不足一个月'
				}
			],
			items10: [
				{
					value: '2',
					name: '账户可退出'
				},
				{
					value: '1',
					name: '账户无法退出'
				}
			],
			items11: [
				{
					value: '3.3',
					name: '无维修情况'
				},
				{
					value: '2',
					name: '屏幕维修'
				},
				{
					value: '1',
					name: '屏幕和主板均有维修'
				}
			],
			all: '', //单选总分
			choices:'', //多选总分
			current: 0,
			option1: '',
			option2: '',
			option3: '',
			option4: '',
			option5: '',
			option6: '',
			option7: '',
			option8: '',
			option9: '',
			option10: '',
			option11: '',
			items: [
				{
					value: '触摸失灵/延迟',
					name: '触摸失灵/延迟'
				},
				{
					value: '机身进水或受潮',
					name: '机身进水或受潮',
					// checked: 'true'
				},
				{
					value: '机身弯曲',
					name: '机身弯曲'
				},
				{
					value: '更换过电池/摄像头/外壳/尾插',
					name: '更换过电池/摄像头/外壳/尾插'
				},
				{
					value: '通话功能不正常',
					name: '通话功能不正常'
				},
				{
					value: '指纹无法完成录入和解锁',
					name: '指纹无法完成录入和解锁'
				},
				{
					value: '拍照模糊/有斑/功能异常',
					name: '拍照模糊/有斑/功能异常'
				},
				{
					value: '无线无法打开/无法连接',
					name: '无线无法打开/无法连接'
				},
				{
					value: '光线/距离感应不正常',
					name: '光线/距离感应不正常'
				},
				{
					value: '充电无反应/充电接触不良',
					name: '充电无反应/充电接触不良'
				},
				{
					value: '震动不正常',
					name: '震动不正常'
				},
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
	onLoad() {
		this.amapPlugin = new amap.AMapWX({
			//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
			key: '7c235a9ac4e25e482614c6b8eac6fd8e'
		});
		//定位地址
		this.amapPlugin.getRegeo({
			success: data => {
				this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); //把"市"去掉
			}
		});
		// 获取所有产品分类信息
		// this.getProducts();
		// 页面初始化的时候默认查分类1
		// this.queryFirstCategory();
	},
	methods: {
		// 返回首页
		toEvaluate() {
			uni.navigateTo({
				url: './evaluate'
			});
		},

		//消息列表
		toMsg() {
			uni.navigateTo({
				url: '../../msg/msg'
			});
		},

		// 单选1
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = parseFloat(evt.target.value);
			this.option1 = eValue;
			 //('点击的是', evt.target.value);
			 //('data里面的1是' + this.option1);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选2
		radioChange2: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = parseFloat(evt.target.value);
			this.option2 = eValue;
			 //('点击的是', evt.target.value);
			 //('data里面的1是' + this.option1);
			 //('data里面的2是' + this.option2);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选3
		radioChange3: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = parseFloat(evt.target.value);
			this.option3 = eValue;
			 //('点击的是', evt.target.value);
			 //('data里面的3是' + this.option3);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选4
		radioChange4: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = parseFloat(evt.target.value);
			this.option4 = eValue;
			 //('点击的是', evt.target.value);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选5
		radioChange5: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue =evt.target.value;
			this.option5 = parseFloat(eValue);
			 //('点击的是', evt.target.value);
			 //('点击的是', this.option5);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选6
		radioChange6: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = evt.target.value;
			this.option6 = parseFloat(eValue);
			 //('点击的是', evt.target.value);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选7
		radioChange7: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = parseFloat(evt.target.value);
			this.option7 = eValue;
			 //('点击的是', evt.target.value);
			 //('点击的是', this.option7);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选8
		radioChange8: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = parseFloat(evt.target.value);
			this.option8 = eValue;
			 //('点击的是', evt.target.value);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选9
		radioChange9: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = parseFloat(evt.target.value);
			this.option9 = eValue;
			 //(this.option9)
			 //('点击的是', evt.target.value);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选10
		radioChange10: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = parseFloat(evt.target.value);
			this.option10 = eValue;
			 //('点击的是', evt.target.value);
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},
		// 单选11
		radioChange11: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			var eValue = parseFloat(evt.target.value);
			this.option11 = eValue;
			
			 //('点击的是', evt.target.value);
			 //('点击的1是', this.option1);
			 //('点击的2是', this.option2);
			 //('点击的3是', this.option3);
			 //('点击的4是', this.option4);
			 //('点击的5是', this.option5);
			 //('点击的6是', this.option6);
			 //('点击的7是', this.option7);
			 //('点击的8是', this.option8);
			 //('点击的9是', this.option9);
			 //('点击的10是', this.option10);
			 //('点击的11是', this.option11);
			
			var oneAll = this.option1+this.option2+this.option3+this.option4+this.option5+this.option6+this.option7+this.option8+this.option9+this.option10+this.option11;
			this.all=oneAll
			 //("all",this.all)
		},

		// 多选
		checkboxChange: function(e) {
			var items = this.items,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				const item = items[i]; 
				if (values.includes(item.value)) {
					this.$set(item, 'checked', true);
					 //("已选")
				} else {
					this.$set(item, 'checked', false);
				}
			}

			 //(values)
			 //(values.length)
			var count = values.length
			this.choices = count*-1
			 //(this.choices)
		},
		// "马上评估"按钮
		ok() {
			 //("点击了马上评估")
			//  把机型+单选总数+多选总数发送给后端
// 			this.Get('评估信息的接口', {    型+单选总数+多选总数   }, data => {
// 				 //("发送成功")
// 			});

			// 跳转页面至"评估结果"页面
			uni.navigateTo({
				url: '../evaluate/evaluateResult'
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
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}

.header {
	text-align: center;
	width: 100%;
	padding: 0 4%;
	height: 50px;
	line-height: 50px;
	box-sizing: border-box;
	position: relative;
	z-index: 10;
	background-color: #35a6e0;
	color: #fff;
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
.msg {
	width: 100%;
	height: 28px;
	line-height: 28px;
	font-size: 12px;
	text-align: center;
	background-color: #f5f5f5;
}
.phoneType {
	height: 35px;
	line-height: 35px;
	padding-left: 20px;
	// background-color: red;
	font-size: 12.5px;
}
// 答题框
.problemBox {
	width: 85%;
	border: 1px solid #555555;
	margin: 0 auto;
	box-sizing: border-box;
	border-radius: 10px;
	margin-top: 10px;
	margin-bottom: 20px;
	padding: 20px 10px;
	padding-top: 10px;
	.tit {
		// background-color: pink;
		font-weight: 600;
		height: 23px;
		line-height: 23px;
		display: flex;
		flex-direction: row;
		.yuan {
			width: 20px;
			height: 20px;
			line-height: 20px;
			border: 1px solid #c0c0c0;
			border-radius: 50%;
			text-align: center;
			color: #c0c0c0;
			font-size: 12.5px;
			margin-right: 6px;
		}
		.fontC {
			color: #666;
		}
	}
	.boxx {
		display: flex;
		flex-direction: row;
		margin: 10px 0;
		color: #666;
		font-size: 15px;
		height: 25px;
		line-height: 25px;
		.yuan {
			transform:scale(0.7); 
		}
	}
}

// 多选
.problems {
	width: 100%;
	box-sizing: border-box;
	.tit {
		height: 40px;
		line-height: 40px;
		background-color: #f5f5f5;
		padding-left: 20px;
		margin-bottom: 10px;
	}
	.option-list {
		display: flex;
		flex-direction: row !important;
		flex-wrap: wrap !important;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
		
		.groups {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			.gg {
				display: flex;
				flex-direction: row;
				// width: 45%;
				border-radius: 10px;
				margin: 10px;
				font-size: 15px;
				color: #666;
			}
			.jj {
				background-color: #fff;
				.kuang {
					transform:scale(0.7); 
				}
			}
		}
	}
}
// 马上评估按钮
.ok {
	background-color: red;
	width: 80%;
	height: 40px;
	line-height: 40px;
	border-radius: 10px;
	color: #fff;
	text-align: center;
	margin: 20px auto;
}
</style>

