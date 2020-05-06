<template>
	<view class="body">
		<view class="p10">
			
			<view class="serviceBox" @tap="bookingTime()">
				<view class="serviceBox_left"><img :src="serviceStaff.suAvatarUrl" class="pic" /></view>
				<view class="serviceBox_right">
					<view class="right_a">
						<view class="name">{{ serviceStaff.suName }}</view>
					</view>
					<view class="right_b">{{ serviceStaff.suSchool }}</view>
					<view class="right_c">{{ serviceStaff.suDesc }}</view>
				</view>
			</view>
		</view>
		<view class="test">
			<view class="date" @tap="openrili()">点击选择日期</view>
			<view class="box" :class="['box', box == true ? 'show' : 'unshow']">
				<view class="worktime">
					<text>当前选择的日期：</text>
					{{ time }}
				</view>
				<view class="worktime">
					<text>服务人员的工作时间：</text>
					{{ openTime }}-{{ closeTime }}
				</view>
			</view>
			<view class="tabcard">
				<view class="boxTit">
					<view class="write" @tap="toWrite()">
						<view class="picBox"><img src="/static/img/help/pp2.png" class="pic" /></view>
						<view>填写信息</view>
					</view>
					<view class="write"><view class="addressBtn" @tap="importMyAddress()">导入我的地址</view></view>
				</view>
				<view class="kuang">
					<view class="content">
						<view class="cfBox">
							<view class="box_b">
								<view>姓名：</view>
								<input type="text" class="inputBox" placeholder="请输入姓名" v-model="userInfo.name" />
							</view>
						</view>
						<view class="cfBox">
							<view class="box_b school">
								<view>所在学校：</view>
								<!-- <view class="picker" @tap="openSearch()">
									<input type="text" placeholder="输入关键字进行检索" v-model="userInfo.schoolData" class="inputbox" v-if="serachFlag==1" :focus="show1"/>
									<view class="inputbox ceshi"  v-if="serachFlag==0"> {{ newSchoolData }} </view>
									<img src="/static/img/sousuo.png" class="down" @tap='showSinglePicker()' />
								</view> -->
								
								<view class="schoolbtn" style="position: relative;" @tap="openSearch()">
									<input type="text" placeholder="输入关键字进行检索" v-model="userInfo.campusName" class="inputbox" v-if="serachFlag==1" :focus="show1"/>
									<view class="inputbox ceshi"  v-if="serachFlag==0"> {{ newSchoolData }} </view>
									<img src="/static/img/sousuo.png" class="down" @tap='showSinglePicker()' style='height: 30px;width: 30px;position: absolute;top: -5px;left: 150px;z-index: 99;'/>
								</view>
							</view>
						</view>
						<view class="cfBox">
							<view class="box_b">
								<view>详细地址：</view>
								<input type="text" @tap="showBuilding()" placeholder="请选择" v-model="userInfo.floorNumber" class="inputBox3" disabled="disabled"/>
								号楼
								<input type="text" class="inputBox3" placeholder="几零几" v-model="userInfo.doorNumber" :focus="show5"/>
								宿舍
							</view>
						</view>
					</view>
				</view>
				<view class="tips">服务人员默认拨打您注册账号时的手机号，如需修改，请在"我的"->"设置"->"账户与安全"->"更改手机号"修改。</view>
			</view>
		</view>
		<view class="book" @tap="toBook()">立即预约</view>
		<!-- 确认地址的弹窗 -->
		<view class="windows" :class="['windows', show == true ? 'show' : 'unshow']">
			<view class="title">确定地址:</view>
			<view class="addressBox">
				<view>姓名： {{ userInfo.name }}</view>
				<view>所在学校： {{ userInfo.campusName }}</view>
				<view>详细地址： {{ userInfo.floorNumber }}号楼{{ userInfo.doorNumber }}宿舍</view>
			</view>
			<view class="ok" @tap="closeWindows()">保存并使用</view>
		</view>
		<!-- 选择多个导入地址的弹窗 -->
		<view class="addressWindows" :class="['addressWindows', arddressWindows == true ? 'show' : 'unshow']">
			<view class="title">
				<view>选择地址:</view>
				<view><image src="/static/img/close2.png" class="close" @tap="closeAddressWindows()"></image></view>
			</view>
			<radio-group @change="radioChange">
				<label class="addressBox" v-for="(item, index) in items" :key="item.value">
					<view class="boxLeft">
						<view>
							姓名：{{ item.name }}
							<text class="default" :class="[item.isDefault == 1 ? 'default' : 'nodefault']">默认</text>
						</view>
						<view>所在学校：{{ item.campusName }}</view>
						<view>详细地址: {{ item.floorNumber }}号楼{{ item.doorNumber }}宿舍</view>
					</view>
					<view class="boxRight"><radio :value="item.value" :checked="index === current" :color="'#FFD845'" /></view>
				</label>
			</radio-group>
			<view class="ok" @tap="saveAndCloseAddressWindows()">使用</view>
		</view>
		<!-- 遮挡用的弹出层 -->
		<view class="kongWindows" :class="['kongWindows', kongWindows == true ? 'show' : 'unshow']"></view>
		<view class="dark" :class="['dark', show == true ? 'show' : 'unshow']"></view>
		<view class="dark" :class="['dark', arddressWindows == true ? 'show' : 'unshow']"></view>
		<!-- 日历 -->
		<view class="calendarWindows" :class="['windows', openCalendar == true ? 'show' : 'unshow']">
			<!--用法四,价格日历模式-->
			<Calendar :priceList="priceList" @callback="getDate" :themeColor="'#FFDE03'" />
			<view class="btnBox">
				<view @tap="close()" class="ojbk">取消</view>
				<view @tap="closerili()" class="ojbk ojbk2">确定</view>
			</view>
		</view>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@=""
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpbuilding"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onBuilding"
			@=""
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
	</view>
</template>

<script>
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import Calendar from '@/components/Calendar/Calendar.vue';
export default {
	components: {
		mpvuePicker,
		Calendar
	},
	data() {
		return {
			show1:  false,
			show5:  false,
			newSchoolData: '',
			serachFlag: 1,
			floorNumber:'几号楼',
			isToday: false,
			schoolIdArr: [], //存放所有学校ID
			schoolId: '', //最终选择的学校id
			box: false,
			openTime: '',
			closeTime: '',
			serviceUserId: '',
			time: '', //选择的日期
			openCalendar: false,
			timeArr: [],
			disabledList: ['2019-6-25', '2019-6-26'], //不可操作的日期
			priceList: [],
			addressId: '', //导入地址的id
			items: [],
			current: '',
			arddressWindows: false, //控制导入地址的弹窗开关
			show: false, //控制确认地址弹框的开关
			kongWindows: false, //空弹出层 遮挡用
			result: {},
			userInfo: {
				name: '',
				campusName: '',
				floorNumber: '',
				doorNumber: ''
			},
			importUserInfo: {
				name: '',
				campusName: '',
				floorNumber: '',
				doorNumber: ''
			},
			campusName: '',
			themeColor: '#FFD845', //选择学校的主题色
			pickerSingleArray: [], //保存可选学校的数组
			pickerText: '',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			schoolData: '',
			serviceStaff: [] //服务人员信息
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
		var that = this;
		// 从缓存拿服务人员id
		const serviceUserId = uni.getStorageSync('serviceUserId');
		if (serviceUserId) {
			 //('可以');
			that.serviceUserId = Number(serviceUserId);
			 //('this.serviceUserId', that.serviceUserId);
			// 查询服务人员信息
			that.Get('http://39.99.137.77:8081/projects/serviceUserTime/selectServiceUserByUserId?serviceUserId=' + that.serviceUserId, {}, data => {
				 //(data.serviceUserInfoBo); //服务人员基本信息哦
				 //(data.boList); //服务人员的服务时间哦
				that.serviceStaff = data.serviceUserInfoBo;
				//  //(that.serviceStaff); //服务人员基本信息哦
				var mm = data.boList;
				// 可选日期
				let timeNow = new Date().getHours(); //取得当前时间的小时
				//判断当前时 是否大于16
				 //(timeNow);
				if (timeNow > 16) {
					// 说明过了下午五点了
					 //('预约明天把');
					let date = new Date();
					let year = date.getFullYear(); //获取年
					let month = date.getMonth(); //获取月
					let day = date.getDate(); //获取当日
					var myYear = year + '-';
					var myMonth = month + 1 + '-';
					var myDay = day;
					var today = myYear + myMonth + myDay;
					 //('today' + today);

					for (var i = 0; i < mm.length; i++) {
						that.timeArr.push(mm[i]);
					}
					var timeArr = that.timeArr;
					 //(that.timeArr);
					if (timeArr.includes(today)) {
						 //('可选');
						var yy = timeArr.indexOf(today);
						 //(yy);
						if (yy != -1) {
							 //('能找到');
							timeArr.splice(yy, 1);
							 //(that.timeArr);
							var mm = that.timeArr;
							//  //(newTimeArr)
							for (var i = 0; i < mm.length; i++) {
								that.priceList.push({
									date: mm[i],
									price: '可选'
								});
							}
						} else {
							 //('不能找到');
						}
					} else {
						 //('没有今天');
						// 在可预订的时间范围内  ok
						for (var i = 0; i < mm.length; i++) {
							that.priceList.push({
								date: mm[i],
								price: '可选'
							});
						}
						for (var i = 0; i < mm.length; i++) {
							that.timeArr.push(mm[i]);
						}
						 //(that.timeArr);
					}
				} else {
					// 在可预订的时间范围内  ok
					for (var i = 0; i < mm.length; i++) {
						that.priceList.push({
							date: mm[i],
							price: '可选'
						});
					}
					for (var i = 0; i < mm.length; i++) {
						that.timeArr.push(mm[i]);
					}
					 //(that.timeArr);
				}
			});
		}
		// 从缓存拿userid
		const userId = uni.getStorageSync('userId');
		if (userId) {
			 //('可以');
			that.userId = Number(userId);
			 //('this.userid', that.userId);
			// 获取所有的服务人员信息
			that.Get('http://39.99.137.77:8081/projects/serviceUserTime/selectAddressById?clientUserId=' + that.userId, {}, data => {
				 //(data);
				var cc = data.clientUserAddressList;
				// 判断是几个地址
				if (cc.length > 1) {
					 //('导入的地址有多个');
					for (var i = 0; i < cc.length; i++) {
						that.items.push({
							value: cc[i].id.toString(),
							name: cc[i].name,
							campusName: cc[i].campusName,
							doorNumber: cc[i].doorNumber,
							floorNumber: cc[i].floorNumber,
							index: i,
							isDefault: cc[i].isDefault
						});
					}
					 //(that.items);
				} else {
					//一个地址
					 //('导入的地址只有一个');
					that.importUserInfo = data.clientUserAddressList;
					 //(that.importUserInfo);
					that.addressId=that.importUserInfo[0].id
				}
			});
			// 查所有的学校
			that.Get('http://39.99.137.77:8081/projects/campus/findAll?clientUserId=' + that.userId, {}, data => {
				 //(data);
				var mm = data.list;
				for (var i = 0; i < mm.length; i++) {
					that.pickerSingleArray.push({
						label: mm[i].campusName,
						value: mm[i].status
					});
					that.schoolIdArr.push(mm[i].id);
				}
				that.name = data.clientUserName;
			});
		}
	},
	methods: {
		openSearch() {
			this.serachFlag=1;
			this.newSchoolData=this.userInfo.campusName;
			this.show1=true;
		},
		//12.30胡仁杰在修改----------------------------------------------------------
		onBuilding(e){
			uni.hideKeyboard()
			this.show1=false;
			var buildingIndex = Number(e.index);
			this.buildingId = this.buildingIdArr[buildingIndex];
			 //('所选学校id', this.buildingId);
			this.userInfo.floorNumber = e.label;
			uni.hideKeyboard()
			console.log("确认")
			this.show5=true
		},
		showBuilding(){
			uni.hideKeyboard();
			this.show6=false;
			// if(this.userInfo.schoolData==''){
			if(this.newSchoolData==''){
				this.schoolId=""
				uni.showModal({
					title: '提示',
					content: '请确保您已选择学校',
				});
				return
			}else {
				uni.hideKeyboard();
				this.pickerBuilding=[]
				this.buildingIdArr=[]
				this.Get('http://39.99.137.77:8081/projects/floor/findFloorByCampusId',{campusId:this.schoolId},(data)=>{
					console.log(data)
					var mm = data;
					if( mm.length>0 ) {
						// 	//查所有的学校
						for (var i = 0; i < mm.length; i++) {
							this.pickerBuilding.push({
								'label': mm[i].floorNumber,
								'value': mm[i].campusId
							});
							this.buildingIdArr.push(mm[i].campusId);
						}
						this.pickerValueArray = this.pickerBuilding;
						this.mode = 'selector';
						this.deepLength = 1;
						this.pickerValueDefault = [0];
						this.$refs.mpbuilding.show();
					}else {
						this.floorNumber="几号楼"
						console.log(this.floorNumber)
						if(this.schoolId=="") {
							uni.showModal({
								title: '提示',
								content: '请确保您已选择学校，并且学校是由搜索得来',
							});
						}else {
							uni.showModal({
								title: '提示',
								content: '当前所选学校暂无楼号可选，请选择其他学校',
							});
						}
					}
				})
			}
			
		},
		//获取回调的日期数据
		getDate(date) { 
			this.time = date.dateStr;
		},
		// 选择学校
		showSinglePicker() {
			uni.hideKeyboard();
			this.show6=false;
			this.pickerSingleArray=[]
			this.schoolIdArr=[]
			this.Get('http://39.99.137.77:8081/projects/campus/keyWordsSeach',{campusName:this.userInfo.campusName},(data)=>{
				console.log(data)
				var mm = data;
				// 	//查所有的学校
				for (var i = 0; i < mm.length; i++) {
					this.pickerSingleArray.push({
						'label': mm[i].campusName,
						'value': mm[i].status
					});
					this.schoolIdArr.push(mm[i].id);
				}
			})
			this.pickerValueArray = this.pickerSingleArray;
			this.mode = 'selector';
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
		},
		// 确认学校
		onConfirm(e) {
			uni.hideKeyboard();
			var shchoolIndex = Number(e.index);
			this.schoolId = this.schoolIdArr[shchoolIndex];
			 //('所选学校id', this.schoolId);
			this.userInfo.campusName = e.label;
			this.newSchoolData=e.label;
			this.serachFlag=0;
			this.show1=false;
		},

		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
			if (this.$refs.mpbuilding.showPicker) {
				this.$refs.mpbuilding.pickerCancel();
				return true;
			}
		},
		up() {
			uni.chooseImage({
				count: 6, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					 //(JSON.stringify(res.tempFilePaths));
					this.src = JSON.stringify(res.tempFilePaths);
				}
			});
		},
		// 打开日历
		openrili() {
			this.openCalendar = true;
		},
		// 关闭日历
		close() {
			this.openCalendar = false;
		},
		// 【确认】判断是不是可选日期
		closerili() {
			this.time = this.timeArr[0];
			var time = this.time;
			var tt = this.timeArr;
			 //(time);
			 //(tt);
			if (tt.includes(time)) {
				 //('可选');
				this.openCalendar = false;
				 //('最终选择了', this.time);

				var that = this;
				uni.getStorage({
					key: 'serviceUserId',
					success: function(res) {
						 //(res.data);
						// 获取所有的服务人员工作时间
						that.Get('http://39.99.137.77:8081/projects/serviceUserTime/selectTimeById?serviceUserId=' + res.data + '&times=' + that.time, {}, data => {
							 //(data);
							that.closeTime = data.closeTime;
							that.openTime = data.openTime;
							that.box = true;
						});
					}
				});
			} else {
				 //('不可选');
				uni.showModal({
					title: '提示',
					content: '请您重新选择标记为"可选"的日期',
					success: function(res) {
						if (res.confirm) {
							 //('用户点击确定');
						} else if (res.cancel) {
							 //('用户点击取消');
						}
					}
				});
			}
		},
		// 返回
		goBack() {
			uni.navigateTo({
				url: '../evaluate/bookingServiceStaff'
			});
		},
		onShowDatePicker(type) {
			//显示
			this.type = type;
			this.showPicker = true;
			this.value = this[type];
		},
		onSelected(e) {
			//选择
			this.showPicker = false;
			if (e) {
				this[this.type] = e.value;
			}
		},
		// 点击"导入我的地址"
		importMyAddress() {
			uni.hideKeyboard()
			this.kongWindows=true;
			if (this.importUserInfo.length == 1) {
				//导入1个地址  直接把内容抄写过去
				 //(this.importUserInfo);
				var name = this.importUserInfo[0].name;
				this.userInfo.name = name;
				var campusName = this.importUserInfo[0].campusName;
				this.userInfo.campusName = campusName;
				var floorNumber = this.importUserInfo[0].floorNumber;
				this.userInfo.floorNumber = floorNumber;
				this.floorNumber = floorNumber;
				var doorNumber = this.importUserInfo[0].doorNumber;
				this.userInfo.doorNumber = doorNumber;
				 //(this.userInfo);
				 //(this.userInfo.campusName);
			} else {
				//多个地址  弹框
				this.arddressWindows = true;
			}
		},
		// 点击"填写信息"
		toWrite() {
			this.userInfo.name = '';
			this.userInfo.campusName = '';
			this.userInfo.floorNumber = '';
			this.userInfo.doorNumber = '';
			this.kongWindows = false;
			this.addressId = '';
		},
		// "马上预约"
		toBook() {
			uni.hideKeyboard();
			// this.userInfo.floorNumber=this.floorNumber
			var that = this;
			if (that.kongWindows == true ) {
				
				// 是导入的地址
				 //('是导入的');
				 
				if (that.time == '') {
					//('信息没有填全');
					uni.showModal({
						title: '提示',
						content: '请您确保选择了时间以及信息都填写齐全',
						success: function(res) {
							if (res.confirm) {
								 //('用户点击确定');
							} else if (res.cancel) {
								 //('用户点击取消');
							}
						}
					});
				} else {
					//  向后端发请求 （导入的地址）
					var time = that.time;
					var addressId = Number(that.addressId);
					 //(time);
					 //(addressId);
					//都填写全了
					uni.getStorage({
						key: 'serviceUserId',
						success: function(res) {
							 //('serviceUserId', res.data);
							// 获取所有的服务人员工作时间
							var serviceUserId = res.data;
							uni.getStorage({
								key: 'ppcId',
								success: function(res) {
									 //('ppcId', res.data);
									// 获取所有的服务人员工作时间
									var ppcId = res.data;
									uni.getStorage({
										key: 'userId',
										success: function(res) {
											 //('userId', res.data);
					
											var clientUserId = Number(res.data);
											 //('大礼包', ppcId, serviceUserId, clientUserId);
											that.Post(
												'http://39.99.137.77:8081/projects/testPhoneOrder/addOrder',
												{
													serviceUserId: serviceUserId,
													ppcId: ppcId,
													clientUserId: clientUserId,
													times: time,
													cuserAddId: addressId
												},
												data => {
													 //(data);
													// 跳转页面
													 //(data);
													uni.navigateTo({
														url: '/pages/evaluate/checkOrder?testPhoneOrderId=' + data + '&times=' + time
													});
													 uni.hideKeyboard();
												}
											);
										}
									});
								}
							});
						}
					});
				}
				
				
				
			}else if(that.kongWindows == false) {
				 //('是自己填写的');
				// 判断自己填写的信息都填写完整了吗
				if (that.time == '' || that.userInfo.name == '' || that.userInfo.floorNumber == '' || that.userInfo.doorNumber == '' || that.userInfo.campusName == '') {
					//判断该填写的信息都填了吗
					 //('信息没有填全');
					uni.showModal({
						title: '提示',
						content: '请您确保选择了时间以及信息都填写齐全',
						success: function(res) {
							if (res.confirm) {
								 //('用户点击确定');
							} else if (res.cancel) {
								 //('用户点击取消');
							}
						}
					});
				} else {
					//都填写好了
					that.show = true;
				}
				
			}
		},

		// 关闭保存并使用地址的弹窗
		closeWindows() {
			uni.hideKeyboard();
			var that = this;
			that.show = false;
			//  向后端发请求 （新增地址）
			var time = that.time;
			var cuaFloorNumber = that.userInfo.floorNumber;
			var cuaDoorNumber = that.userInfo.doorNumber;
			var cuaCampusId = that.schoolId;
			var cuaName = that.userInfo.name;
			 //(cuaName);
			 //(cuaCampusId);
			 //(time);
			uni.getStorage({
				key: 'serviceUserId',
				success: function(res) {
					 //('serviceUserId', res.data);
					// 获取所有的服务人员工作时间
					var serviceUserId = res.data;
					uni.getStorage({
						key: 'ppcId',
						success: function(res) {
							 //('ppcId', res.data);
							// 获取所有的服务人员工作时间
							var ppcId = res.data;
							uni.getStorage({
								key: 'userId',
								success: function(res) {
									 //('userId', res.data);
									// 获取所有的服务人员工作时间
									var clientUserId = Number(res.data);
									 //('大礼包', ppcId, serviceUserId, clientUserId);
									that.Post(
										'http://39.99.137.77:8081/projects/serviceUserTime/insertServiceOrderNewAddress',
										{
											serviceUserId: serviceUserId,
											ppcId: ppcId,
											clientUserId: clientUserId,
											times: time,
											cuaName: cuaName,
											cuaFloorNumber: cuaFloorNumber,
											cuaDoorNumber: cuaDoorNumber,
											cuaCampusId: cuaCampusId
											// 改成学校id
										},
										data => {
											uni.hideKeyboard()
											uni.navigateTo({
												url: '/pages/evaluate/checkOrder?testPhoneOrderId=' + data.data + '&times=' + time
											});
										}
									);
								}
							});
						}
					});
				}
			});
		},
		// 关闭导入多个地址的弹窗
		closeAddressWindows() {
			this.arddressWindows = false;
		},
		// 保存并关闭窗口
		saveAndCloseAddressWindows() {
			uni.hideKeyboard()
			 //('addressId========', this.addressId);
			// 把信息导入到填写的框
			var i = this.current;
			this.userInfo.name = this.items[i].name;
			 //(this.items[i].name);
			 //('多选选择的下标', this.current);
			this.userInfo.campusName = this.items[i].campusName;
			this.userInfo.floorNumber = this.items[i].floorNumber;
			this.userInfo.doorNumber = this.items[i].doorNumber;
			// 关闭窗口
			this.arddressWindows = false;
			this.kongWindows = true;
		},
		// 单选地址
		radioChange: function(evt) {
			uni.hideKeyboard()
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			 //(evt.target.value);
			 //(this.current);
			this.addressId = evt.target.value;
			 //('addressId========', this.addressId);
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
.body {
	position: relative;
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
	background-color: #ffd845;
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
	.serviceBox {
		height: 100px;
		width: 100%;
		padding: 10px 10px;
		box-sizing: border-box;
		// background-color: pink;
		border-bottom: 1px solid #e5e5e5;
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
				}
				.remark {
					font-size: 13px;
					color: #c0c0c0;
				}
			}
			.right_b,
			.right_c {
				margin-top: 3px;
			}
		}
	}
}
.test {
	.date {
		background-color: #ffd845;
		width: 88%;
		height: 45px;
		line-height: 45px;
		margin: 10px auto;
		text-align: center;
		border-radius: 5px;
		.btn1 {
			font-size: 16px;
			margin-bottom: 5px;
		}
	}
	.box {
		.worktime {
			padding-left: 20px;
			height: 30px;
			line-height: 30px;
		}
	}
	.time {
		margin: 25px 20px;

		.btn {
			height: 40px;
			line-height: 40px;
			text-align: center;
			background-color: #f8f8f8;
			border: 1px solid #dfdfdf;
			margin-bottom: 5px;
		}
	}
	.tabcard {
		// background-color: pink;
		.boxTit {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 10px;
			padding: 0 20px;
			.write {
				text-align: center;
				padding-left: 10px;
				.pic {
					width: 30px;
					height: 30px;
					margin: 0 auto;
					margin-top: 2px;
				}
				.addressBtn {
					height: 35px;
					line-height: 35px;
					width: 130px;
					border-radius: 5px;
					background-color: red;
					color: #fff;
					margin-top: 25px;
				}
			}
		}
		.kuang {
			width: 88%;
			margin: 10px auto;
			border: 1px solid #e5e5e5;
			padding: 0 10px 15px 10px;
			box-sizing: border-box;
			position: relative;

			.list {
				flex-wrap: wrap;
				.row {
					width: 96%;
					padding: 20upx 2%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
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

								background-color: #f06c7a;
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
			.content {
				.cfBox {
					dispaly: flex;
					flex-direction: row;
					justify-content: space-between;
					.schoolname {
						text-align: center;
					}
					.btn {
						margin-top: 10px;
						.school {
							color: #8a8a8a;
							font-size: 17px;
							padding-left: 5px;
						}
					}
					.box_b {
						display: flex;
						flex-direction: row;
						margin-top: 15px;
						height: 24px;
						line-height: 24px;
						.inputBox {
							padding-left: 3px;
							font-size: 15px;
							padding-bottom: 8px;
						}
						.inputBox2 {
							padding-left: 3px;
							font-size: 15px;
							color: #8f8080;
						}
						.inputBox3 {
							width: 50px;
							// background-color: pink;
							padding-left: 3px;
							font-size: 15px;
							color: #8f8080;
						}
					}
					// 选择学校
					.school {
						.schoolbtn {
							width: 60%;
							color: #808080;
							font-size: 16px;
							.schoolname {
								margin-top: -10px;
								text-align: left;
							}
						}
					}
				}
				.btnBox {
					text-align: center;
					.btn {
						width: 100px;
						height: 25px;
						line-height: 25px;
						background-color: #35a6e0;
						color: #fff;
						margin: 0 auto;
						border-radius: 5px;
						margin-top: 10px;
					}
				}
			}
		}
		.tips {
			background-color: #f3f3f3;
			padding: 10px 20px;
			font-size: 14px;
			color: #a5a5a5;
		}
	}
	.address {
		// background-color: pink;
		height: 30px;
		line-height: 30px;
		padding: 0 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.tex {
			width: 30%;
		}
		.inputBox {
			border: 1px solid #dfdfdf;
			// margin-top: 3px;
			height: 30px;
			width: 70%;
			padding-left: 3px;
		}
	}
}
.book {
	height: 45px;
	line-height: 45px;
	width: 80%;
	background-color: #ffd845;
	color: #000;
	margin: 0 auto;
	text-align: center;
	border-radius: 10px;
	margin-top: 20px;
	font-size: 17px;
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
// 导入多个地址弹窗
.addressWindows {
	overflow-y:scroll;
	width: 100%;
	height: 60%;
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.close {
			width: 30px;
			height: 30px;
		}
	}
	.addressBox {
		padding: 5px;
		border-radius: 5px;
		background-color: #eeeeee;
		opacity: 0.7;
		margin-bottom: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.default {
			margin-left: 15px;
			width: 40px;
			padding: 0 5px;
			height: 25px;
			line-height: 25px;
			border: 1px solid #ffd845;
			color: #ffd845;
			text-align: center;
			border-radius: 5px;
		}

		.nodefault {
			display: none;
		}
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
.picker {
	padding-bottom: 20px;
	width: 60%;
		height: 50px;
		line-height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		.inputbox {
			height: 30px;
			line-height: 30px;
		}
		.down {
			margin-left: 10%;
			width: 15%;
			height: 60%;
		}
		.souInput {
			width: 15px;
			height: 15px;
			position: absolute;
			right: 10px;
			top: 5px;
			z-index: 9;
			font-size: 1px !important;
			color: #fff;
		}
	}
//遮挡用空弹出窗
.kongWindows {
	height: 130px;
	width: 100%;
	background-color: #fff;
	opacity: 0.1;
	position: fixed;
	top: 355px;
	left: 0;
	z-index: 99;
}
.calendarWindows {
	height: 100%;
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 998;
	.btnBox {
		height: 50px;
		width: 100%;
		position: fixed;
		bottom: 10px;
		left: 0;
		z-index: 999;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-right: 10px;
		.ojbk {
			width: 66px;
			text-align: center;
			height: 40px;
			line-height: 40px;
			border-radius: 5px;
			background-color: #ffd845;
			margin-left: 10px;
		}
		.ojbk2 {
			width: 66px;
			text-align: center;
			height: 40px;
			line-height: 40px;
			border-radius: 5px;
			background-color: #ffd845;
			margin-right: 10px;
		}
	}
}
</style>
