<template>
	<view class="body">
		
		<view class="p10">
			<view class="box">
				<view class="tabcard">
					<view class="boxTit">
						<view class="write" @tap="toWrite()">
							<!-- <view class="picBox"><img src="/static/img/help/pp2.png" class="pic" /></view> -->
							<view class="addressBtn2">填写信息</view>
						</view>
						<view class="write"><view class="addressBtn" @tap="importMyAddress()">导入我的地址</view></view>
					</view>
					<view class="kuang">
						<view class="content">
							<view class="cfBox">
								<view class="box_b">
									<view>姓名：</view>
									<view class="picker">
										<input type="text" class="inputBox fontbig" placeholder="请输入姓名" v-model="userInfo.name" :focus="show1"/>
									</view>
								</view>
							</view>
							<view class="cfBox">
								<view class="box_b school">
									<view>所在学校：</view>
									<view class="picker" @tap="openSearch()">
										<input type="text" placeholder="输入关键字进行检索" v-model="userInfo.schoolData" class="inputbox" v-if="serachFlag==1" :focus="show1"/>
										<view class="inputbox ceshi"  v-if="serachFlag==0"> {{ newSchoolData }} </view>
										<img src="/static/img/sousuo.png" class="down" @tap='showSinglePicker()' />
									</view>
								</view>
							</view>
							<view class="cfBox">
								<view class="box_b">
									<view>详细地址：</view>
									<span @tap="showBuilding()" class="inputBox3 floorSpan">{{ floorNumber }}</span>号楼 
									<input type="text" class="inputBox3 fontbig" placeholder="几零几" v-model="userInfo.doorNumber" :focus="show5"/>
									宿舍
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="" style="padding: 0 15px;color: orange;font-size: 14px;">
					<checkbox-group  @tap="changechecked()">
						<label>
							<checkbox value="" :checked="key"/>
							不是本人取件请勾选此项，并留下姓名手机号
						</label>
					</checkbox-group>
				</view>
				<view class="myBox" v-for="(item, index) in list" :key="index">
					<view class="titBox">
						<view class="white">快递公司：</view>
						<view class="white">快递网点：</view>
						<view class="white">取货码：</view>
						<img src="/static/img/shanchu.png" class="shanchu" @tap="shanchu(index)" />
					</view>
					<view class="content">
						<view class="point">
							<picker @change="bindbrandChangelft" :value="item.index" :range="item.brand" class="select">
								<view @tap="checkIndex(index)" class="ffbox">
									{{ item.brand[item.index] }}
									<img src="/static/img/down.png" class="down" />
								</view>
							</picker>
						</view>
						<view class="point">
							<picker @change="bindbrandChangectr" :value="item.indexa" :range="item.type" class="select">
								<view @tap="checkIndex(index)" class="ffbox">
									{{ item.type[item.indexa] }}
									<img src="/static/img/down.png" class="down" />
								</view>
							</picker>
						</view>
						<view class="point"><input type="text" class="inputBox" placeholder="输入取货码" v-model="item.pickCode" /></view>
					</view>
					<view style="display: flex;justify-content: space-around;" v-if="key">
						<view class="point" style="width: 45%;"><input type="text" class="inputBox" placeholder="输入姓名" v-model="item.name" /></view>
						<view class="point" style="width: 45%;"><input type="text" class="inputBox" placeholder="输入手机号" v-model="item.phone" /></view>
					</view>
				</view>
			</view>
			<view class="add" @tap="addCheck">
				<img src="/static/img/add.png" class="pic" />
				<view class="tit">新增包裹</view>
			</view>
			<view class="payBox" @tap="toOrder()">确定订单</view>
		</view>
		<!-- 确认地址的弹窗 -->
		<view class="windows" :class="['windows', show == true ? 'show' : 'unshow']">
			<view class="title">
				<text>确定地址:</text>
				<image src="/static/img/close2.png" class="close" @tap="close()"></image>
			</view>
			<view class="addressBox">
				<view>姓名： {{ userInfo.name }}</view>
				<view>所在学校： {{ userInfo.schoolData }}</view>
				<view>详细地址： {{ userInfo.floorNumber }}号楼 {{ userInfo.doorNumber }}宿舍</view>
				<view>所在学校： {{ userInfo.schoolData }}</view>
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
						<view>姓名：{{ item.name }}</view>
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
import xflSelect from '../../components/xfl-select/xfl-select.vue';
import MxDatePicker from '../../components/mx-datepicker/mx-datepicker.vue';
export default {
	components: {
		mpvuePicker,
		xflSelect,
		MxDatePicker
	},
	data() {
		return {
			show1:  false,
			show5:  false,
			newSchoolData: '',
			serachFlag: 1,
			floorNumber:'几号楼',
			buildingIdArr:[],
			buildingId: '', //最终选择的楼号id
			pickerBuilding:[],
			key: false,
			flagAddress: '', //
			price: '',
			userId: '',
			schoolIdArr: [], //存放所有学校ID
			ss: [], //存多选择地址的学数校id
			schoolId: '', //最终选择的学校id
			pickerSingleArray: [],
			themeColor: '#007AFF',
			pickerText: '',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray: [],
			addressId: '', //导入地址的id
			userInfo: {
				name: '',
				schoolData: '',
				floorNumber: '',
				doorNumber: ''
			},
			importUserInfo: {},
			items: [],
			arddressWindows: false, //控制导入地址的弹窗开关
			show: false, //控制确认地址弹框的开关
			kongWindows: false, //空弹出层 遮挡用
			pickupAddress: ['请选择'], //存所有的地址网点
			logisticsName: ['请选择'], //存所有的快递公司

			pickupAddressIds: [''], //存所有的地址网点id
			logisticsNameIds: [''], //存所有的快递公司id
			list: [
				{
					index: 0, //brand的下标
					indexa: 0, //type的下标
					brand: ['请选择'], //存所有的快递公司
					type: ['请选择'], //存所有的地址网点
					pickupId: '', //最终选择的快递网点Id:
					logisticsId: '', //最终选择的快递公司Id:
					pickCode: '' ,//取货码
					name:'',//姓名，选填
					phone:'',//手机号，选填
				}
			],

			cityPickerValue: [0, 0, 1],
			isSelect: false,
			index: 0,
			region: { label: '请点击选择地址', value: [], cityCode: '' },
			showPicker: false,
			schoolData: '',
			src: '',
			current: ''
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
		uni.getStorage({
			key: 'userId',
			success: function(res) {
				//(res.data);
				that.userId = Number(res.data);
				// 获取所有可导入的地址
				that.Get('http://39.99.137.77:8081/projects/serviceUserTime/selectAddressById', { clientUserId: res.data }, data => {
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
							that.ss.push(cc[i].campusId);
						}
						//(that.items);
						//(that.ss);
					} else {
						//一个地址
						//('导入的地址只有一个');
						that.importUserInfo = data.clientUserAddressList;
						//(data.clientUserAddressList);
						that.addressId = data.clientUserAddressList[0].campusId;
						//(that.addressId)
					}
				});

				that.Get('http://39.99.137.77:8081/projects/campus/findAll', { clientUserId: res.data }, data => {
					//(data);
					var mm = data.list;
					for (var i = 0; i < mm.length; i++) {
						that.pickerSingleArray.push({
							label: mm[i].campusName,
							value: mm[i].status
						});
						that.schoolIdArr.push(mm[i].id);
					}
				});
			}
		});
	},

	methods: {
		openSearch() {
			this.serachFlag=1;
			this.newSchoolData=this.userInfo.schoolData;
			this.show1=true;
		},
		//12.30胡仁杰在修改----------------------------------------------------------
		// 确认楼号
		onBuilding(e){
			uni.hideKeyboard()
			this.show1=false;
			var buildingIndex = Number(e.index);
			this.buildingId = this.buildingIdArr[buildingIndex];
			this.floorNumber = e.label;
			this.show5=true;
		},
		// 选择楼号
		showBuilding(){
			uni.hideKeyboard();
			this.show6=false;
			if(this.newSchoolData==''){
				this.schoolId=""
				uni.showModal({
					title: '提示',
					content: '请确保您已选择学校',
				});
				return
			}else{
				uni.hideKeyboard();
				this.pickerBuilding=[]
				this.buildingIdArr=[]
				this.Get('http://39.99.137.77:8081/projects/floor/findFloorByCampusId',{campusId:this.schoolId},(data)=>{
					// console.log(data)
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
						// console.log(this.floorNumber)
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
		changechecked() {
			// console.log("11")
			if(this.key==false){
				for(var i=0;i<this.list.length;i++){
					this.list[i].name=''
					this.list[i].phone=''
					// console.log(i)
				}
			}
			this.key = !this.key;
		},
		// 关闭保存地址的弹窗
		close() {
			this.show = false;
		},
		//删除
		shanchu(index) {
			//(index)
			this.list.splice(index, 1);
		},
		// 点击"导入我的地址"
		importMyAddress() {
			uni.hideKeyboard();
			this.kongWindows = true;
			if (this.importUserInfo.length == 1) {
				//导入1个地址  直接把内容抄写过去
				//(this.importUserInfo);
				this.addressId = this.importUserInfo[0].id;
				var name = this.importUserInfo[0].name;
				this.userInfo.name = name;
				var campusName = this.importUserInfo[0].campusName;
				this.userInfo.schoolData = campusName;
				var floorNumber = this.importUserInfo[0].floorNumber;
				this.userInfo.floorNumber = floorNumber;
				this.floorNumber = floorNumber;
				console.log(this.floorNumber)
				var doorNumber = this.importUserInfo[0].doorNumber;
				this.userInfo.doorNumber = doorNumber;
				//(this.userInfo);
				//(this.userInfo.schoolData);

				//("学校id",this.importUserInfo[0].campusId);
				var campusId = this.importUserInfo[0].campusId;
				var that = this;
				that.Get(
					//查该学校所有的快递网点
					'http://39.99.137.77:8081/projects/pickup/findPickupByCampusId',
					{
						campusId: campusId
					},
					data => {
						//(data); //该学校所有的快递网点地址
						for (var r = 0; r < data.length; r++) {
							that.list[0].type.push(data[r].pickupAddress);
							that.pickupAddressIds.push(data[r].id);
							that.pickupAddress.push(data[r].pickupAddress); //存所有的地址网点
						}
						// istics/findAll
						that.Get(
							//查该学校所有的快递公司
							'http://39.99.137.77:8081/projects/logistics/findAll',
							{},
							data => {
								//(data); //该学校所有的快递网点地址
								for (var r = 0; r < data.length; r++) {
									that.list[0].brand.push(data[r].logisticsName);
									that.logisticsNameIds.push(data[r].id);
									that.logisticsName.push(data[r].logisticsName); //存所有的快递公司
								}
							}
						);
					}
				);
			} else {
				//多个地址  弹框
				this.arddressWindows = true;
			}
		},
		// 点击"填写信息"
		toWrite() {
			this.floorNumber='几号楼';
			this.userInfo.name = '';
			this.userInfo.schoolData = '';
			this.userInfo.floorNumber = '';
			this.userInfo.doorNumber = '';
			this.kongWindows = false;
			this.addressId = '';
			//(this.importUserInfo[0]);
			//(this.userInfo);
		},
		closeWindows() {
			console.log("看这里")
			//自己填写的地址信息【保存并使用】
			// 先判断该填写的信息都填了吗
			this.userInfo.floorNumber=this.floorNumber
			var that = this;
			if (that.userId == '' || that.userInfo.name == '' || that.schoolId == '' || that.userInfo.floorNumber == '' || that.userInfo.doorNumber == '') {
				// 没填完整，提示用户
				uni.showModal({
					title: '提示',
					content: '信息未填写完整,请继续填写',
					success: function(res) {
						if (res.confirm) {
							//('用户点击确定');
						} else if (res.cancel) {
							//('用户点击取消');
						}
					}
				});
			} else {
				// 地址信息都填全了
				//(that.list)
				//(that.list.length)
				//  向后端发请求 （新增地址）
				
				var num = Number(that.list.length);
				that.price = Number(num) * 1; //一块一个
				that.show = false;
				// 判断flagAddress
				if (that.flagAddress !== '') {
					// 已经拿到地址id了，不走添加地址的接口，直接拿着flagAddress下单
					//下单
					that.Post(
						'http://39.99.137.77:8081/projects/takeDeliveryOrder',
						{
							clientUserId: that.userId,
							clientUserAddressId: that.flagAddress,
							price: that.price,
							list: that.list
						},
						data => {
							//(data);
							if (data.code == 400) {
								// 信息没填写全
								uni.showModal({
									title: '提示',
									content: '包裹信息未填写完整,请继续填写',
									success: function(res) {
										if (res.confirm) {
											//('用户点击确定');
										} else if (res.cancel) {
											//('用户点击取消');
										}
									}
								});
							}
							if (data.code == 200) {
								//("订单提交成功")
								uni.navigateTo({
									url: './pay?orderId=' + data.data
								});
							}
						}
					);
				} else if (that.flagAddress == '') {
					// 走添加
					that.Post(
						// 'http://192.168.3.135:8082/clientUserAddress/add',
						'http://39.99.137.77:8081/projects/clientUserAddress/add',
						{
							isDefault: 0,
							clientUserId: that.userId,
							name: that.userInfo.name,
							campusId: that.schoolId,
							floorNumber: that.floorNumber,
							doorNumber: that.userInfo.doorNumber
						},
						data => {
							//(data); //地址id
							that.flagAddress = data; //先把拿到地址id存起来
							// if ()
							//(that.list); //地址id
							//下单
							that.Post(
								'http://39.99.137.77:8081/projects/takeDeliveryOrder',
								{
									clientUserId: that.userId,
									clientUserAddressId: data,
									price: that.price,
									list: that.list
								},
								data => {
									//(data);
									if (data.code == 400) {
										// 信息没填写全
										uni.showModal({
											title: '提示',
											content: '包裹信息未填写完整,请继续填写',
											success: function(res) {
												if (res.confirm) {
													//('用户点击确定');
												} else if (res.cancel) {
													//('用户点击取消');
												}
											}
										});
									}
									if (data.code == 200) {
										//("订单提交成功")
										uni.navigateTo({
											url: './pay?orderId=' + data.data
										});
									}
								}
							);
						}
					);
				}
			}
		},
		// 关闭导入多个地址的弹窗
		closeAddressWindows() {
			this.arddressWindows = false;
		},
		// 保存并关闭窗口
		saveAndCloseAddressWindows() {
			uni.hideKeyboard();
			//('addressId========', this.addressId);
			// 把信息导入到填写的框
			var i = this.current;
			this.userInfo.name = this.items[i].name;
			//('多选选择的下标', this.current);
			var campusName = this.items[i].campusName;
			//(campusName);
			this.userInfo.schoolData = campusName;
			//('sjsj', this.items[i].campusName);
			this.userInfo.floorNumber = this.items[i].floorNumber;
			this.floorNumber=this.items[i].floorNumber;
			this.userInfo.doorNumber = this.items[i].doorNumber;
			// 关闭窗口
			this.arddressWindows = false;
			// 打开遮挡层
			this.kongWindows = true;

			//  //(this.schoolIds[i])
			this.schoolId = this.ss[i];
			//(this.schoolId);
		},
		onShowDatePicker(type) {
			//显示
			this.type = type;
			this.showPicker = true;
			this.value = this[type];
		},
		// "支付"
		toOrder() {
			uni.hideKeyboard();
			// 点击支付的时候判断是自己填写的信息还是导入的地址
			this.userInfo.floorNumber=this.floorNumber
			var that = this;
			if (that.kongWindows == true) {
				// 是导入的地址
				//('是导入的');
				var that = this;
				//  向后端发请求 （导入的地址）
				var time = that.time;
				var addressId = Number(that.addressId);
				//(addressId);
				var num = Number(that.list.length);
				that.price = num * 1; //一块一个
				// 判断包裹信息填写全了没有
				//(that.list)
				//(that.list.length)
				var list = that.list;
				//下单
				// debugger
				that.Post(
					'http://39.99.137.77:8081/projects/takeDeliveryOrder',
					{
						clientUserId: that.userId,
						clientUserAddressId: addressId,
						price: that.price,
						list: that.list
					},
					data => {
						//(data);  //返回代取快递的订单id
						if (data.code == 400) {
							// 信息没填写全
							uni.showModal({
								title: '提示',
								content: '包裹信息未填写完整,请继续填写',
								success: function(res) {
									if (res.confirm) {
										//('用户点击确定');
									} else if (res.cancel) {
										//('用户点击取消');
									}
								}
							});
						}
						if (data.code == 200) {
							//("订单提交成功")
							uni.navigateTo({
								url: './pay?orderId=' + data.data
							});
							 uni.hideKeyboard();
						}
					}
				);
			} else if (that.kongWindows == false) {
				//('是自己填写的');
				// 判断自己填写的信息都填写完整了吗

				that.show = true;
				//(that.list);
			}
		},

		// 单选地址
		radioChange: function(evt) {
			uni.hideKeyboard();
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			//(evt.target.value);
			this.addressId = evt.target.value;
			//('addressId========', this.addressId);
			//('下标========', this.current);
			this.schoolId = this.ss[this.current];

			var that = this;
			//("学校id",that.schoolId);
			that.Get(
				//查该学校所有的快递网点
				'http://39.99.137.77:8081/projects/pickup/findPickupByCampusId',
				{
					campusId: that.schoolId
				},
				data => {
					//(data); //该学校所有的快递网点地址
					for (var r = 0; r < data.length; r++) {
						that.list[0].type.push(data[r].pickupAddress);
						that.pickupAddressIds.push(data[r].id);
						that.pickupAddress.push(data[r].pickupAddress); //存所有的地址网点
					}
					// istics/findAll
					that.Get(
						//查该学校所有的快递公司
						'http://39.99.137.77:8081/projects/logistics/findAll',
						{},
						data => {
							//(data); //该学校所有的快递网点地址
							for (var r = 0; r < data.length; r++) {
								that.list[0].brand.push(data[r].logisticsName);
								that.logisticsNameIds.push(data[r].id);
								that.logisticsName.push(data[r].logisticsName); //存所有的快递公司
							}
						}
					);
				}
			);
		},

		bindbrandChange: function(e) {
			//('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
		},
		bindbrandChangelft: function(e) {
			//('picker发送选择改变，携带值为', e.target.value);
			this.list[this.indexl].index = e.target.value;
			var r = e.target.value;
			//(this.list[this.indexl].brand[r]); //输出选的文字
			//(this.logisticsNameIds[r]); //输出的是当前选中的值
			this.list[this.indexl].logisticsId = this.logisticsNameIds[r];
			var i = this.list[this.index].logisticsId;
			//('最终选择的快递公司id=', i);
		},
		bindbrandChangectr: function(e) {
			//('picker发送选择改变，携带值为', e.target.value);
			this.list[this.indexl].indexa = e.target.value;
			var r = e.target.value;
			//(this.list[this.indexl].type[this.list[this.indexl].indexa]); //输出的是当前选中的值
			//(this.pickupAddressIds[this.list[this.indexl].indexa]); //输出的是当前选中的值
			this.list[this.indexl].pickupId = this.pickupAddressIds[this.list[this.indexl].indexa];
			var i = this.list[this.indexl].pickupId;
			//('最终选择的快递网点id=', i);
		},
		// 新增包裹
		addCheck: function() {
			if (this.list.length < 5) {
				this.list.push({
					index: 0, //brand的下标
					indexa: 0, //type的下标
					brand: this.logisticsName, //存所有的快递公司
					type: this.pickupAddress, //存所有的地址网点
					pickupId: '', //最终选择的快递网点Id:
					logisticsId: '', //最终选择的快递公司Id:
					pickCode: '' ,//取货码
					name:'',//姓名
					phone:'',//手机号
				});
			} else {
				uni.showModal({
					title: '提示',
					content: '一个订单最多添加五个包裹',
					success: function(res) {
						if (res.confirm) {
							//('用户点击确定');
						} else if (res.cancel) {
							//('用户点击取消');
						}
					}
				});
			}
			//("现在的list",this.list)
			//(this.list.length);
		},
		checkIndex: function(e) {
			this.indexl = e;
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
		},
		// 选择学校
		showSinglePicker() {
			uni.hideKeyboard();
			this.show6=false;
			this.pickerSingleArray=[]
			this.schoolIdArr=[]
			this.Get('http://39.99.137.77:8081/projects/campus/keyWordsSeach',{campusName:this.userInfo.schoolData},(data)=>{
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
			var that = this;
			uni.hideKeyboard();
			var shchoolIndex = Number(e.index);
			that.schoolId = that.schoolIdArr[shchoolIndex];
			that.newSchoolData=e.label;
			that.userInfo.schoolData = e.label;
			that.serachFlag=0;
			that.show1=false;
			console.log("serachFlag",that.serachFlag)
			that.Get(
				//查该学校所有的快递网点
				'http://39.99.137.77:8081/projects/pickup/findPickupByCampusId',
				{
					campusId: that.schoolId
				},
				data => {
					//(data); //该学校所有的快递网点地址
					for (var r = 0; r < data.length; r++) {
						that.list[0].type.push(data[r].pickupAddress);
						that.pickupAddressIds.push(data[r].id);
						that.pickupAddress.push(data[r].pickupAddress); //存所有的地址网点
					}
					// istics/findAll
					that.Get(
						//查该学校所有的快递公司
						'http://39.99.137.77:8081/projects/logistics/findAll',
						{},
						data => {
							//(data); //该学校所有的快递网点地址
							for (var r = 0; r < data.length; r++) {
								that.list[0].brand.push(data[r].logisticsName);
								that.logisticsNameIds.push(data[r].id);
								that.logisticsName.push(data[r].logisticsName); //存所有的快递公司
							}
							uni.hideKeyboard();
						}
					);
				}
			);
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
	// padding: 10px;
	.box {
		.tabcard {
			padding: 0 15px;
			.boxTit {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 10px;
				// padding: 0 20px;
				.write {
					// text-align: center;
					// padding-left: 10px;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
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
						text-align: center;
					}
					.addressBtn2 {
						height: 35px;
						line-height: 35px;
						width: 130px;
						border-radius: 5px;
						background-color: #ffd845;
						color: #000;
						margin-top: 25px;
						text-align: center;
					}
				}
			}
			.kuang {
				margin: 10px auto;
				border: 1px solid #e5e5e5;
				padding: 0 10px 15px 10px;
				box-sizing: border-box;
				margin-bottom: 30px;
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
						height: 30px;
						line-height: 30px;
						// background-color: pink;
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
							}
							.inputBox2 {
								padding-left: 3px;
								font-size: 15px;
								color: #8f8080;
							}
							.inputBox3 {
								margin-top: 2px;
								width: 50px;
								// background-color: pink;
								padding-left: 3px;
								font-size: 15px;
								color: #8f8080;
							}
							.fontbig {
								// background-color: red;
								font-size: 16px;
								margin-top: 0;
							}
							.floorSpan {
								width: 60px;
								// background-color: yellow;
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
		}

		.box_b {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 15px;
			height: 35px;
			line-height: 35px;
			// background-color: pink;
			.inputBox {
				padding-left: 3px;
				font-size: 17px;
				margin-top: 6px;
			}
		}
		.time {
			margin: 10px 0 0 0;
			height: 30px;
			display: flex;
			flex-direction: row;
			.ttext {
				width: 42%;
			}
			.btn {
				width: 57%;
				line-height: 30px;
				// background-color: pink;
				margin-left: 10px;
				text-align: center;
			}
		}
		.myBox {
			width: 100%;
			margin-top: 10px;
			margin-bottom: 15px;
			.titBox {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				background-color: #ffd845;
				height: 45px;
				line-height: 45px;
				position: relative;
				.white {
					color: #000;
					text-align: center;
					width: 33.3%;
				}
				.shanchu {
					height: 25px;
					width: 25px;
					position: absolute;
					right: 2px;
					top: -6px;
					z-index: 99;
				}
			}
			.content {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: 6px 0;
				// background-color: pink;
				.point {
					text-align: center;
					width: 33.3%;
					.select {
						padding: 0 10px;
						text-align: center;
						border: 1px solid #c8ccd3;
						border-radius: 5px;
						overflow: hidden;
						.ffbox {
							height: 30px;
							line-height: 30px;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							.down {
								width: 15%;
							}
						}
					}
					.inputBox {
						height: 30px;
						line-height: 30px;
						width: 88%;
						border: 1px solid #c8ccd3;
						border-radius: 5px;
						color: #666;
					}
				}
			}
		}
	}
}
.point {
	text-align: center;
	width: 33.3%;
	.select {
		padding: 0 10px;
		text-align: center;
		border: 1px solid #c8ccd3;
		border-radius: 5px;
		overflow: hidden;
		.ffbox {
			height: 30px;
			line-height: 30px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.down {
				width: 15%;
			}
		}
	}
	.inputBox {
		height: 30px;
		line-height: 30px;
		width: 88%;
		border: 1px solid #c8ccd3;
		border-radius: 5px;
		color: #666;
		
	}
}
.payBox {
	width: 66%;
	height: 35px;
	line-height: 35px;
	text-align: center;
	background-color: #ffd845;
	color: #000;
	margin: 0 auto;
	margin-top: 40px;
	margin-bottom: 10px;
	border-radius: 5px;
	font-size: 20px;
}
//增加模块
.add {
	height: 100px;
	width: 88%;
	margin: 20px auto;
	border: 1px dashed #dadce1;
	border-radius: 5px;
	text-align: center;
	.pic {
		width: 35px;
		height: 35px;
		vertical-align: middle;
		margin-top: 30px;
	}
	.tit {
		font-size: 15px;
		color: #b0b1b3;
	}
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
		color: #000;
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
//遮挡用空弹出窗
.kongWindows {
	height: 120px;
	width: 100%;
	background-color: #fff;
	opacity: 0.1;
	position: fixed;
	top: 97px;
	left: 0;
	z-index: 99;
}
.picker {
	// background-color: skyblue;
	padding-bottom: 20px;
	width: 65%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	position: relative;
	.inputbox {
		font-size: 16px;
		height: 30px;
		line-height: 30px;
	}
	.down {
		margin-left: 10%;
		width: 30px;
		height:30px;
		// background-color: pink;
	}
		
	}
</style>
