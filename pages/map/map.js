// pages/map/map.js
let QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
let qqmapsdk;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    addressList: [],
    title: ""
  },

  // 获取搜索关键字
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },
  // 获取搜索内容
  onSearch(e) {
    // 调用接口
    let that = this
    qqmapsdk.search({
      keyword: e.detail,
      success: function(res) {
        that.setData({
          addressList: res.data
        })
        console.log(res);
      }
    });
  },
  // 点击地图
  clickMap(e) {
    console.log(e)
    let that = this
    let str = e.detail.latitude + ',' + e.detail.longitude
    qqmapsdk.reverseGeocoder({
      location: str,
      success: function(res) {
        that.setData({
          title: res.result.address_component.street_number,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng
        })
        that.data.markers[0].callout.content = that.data.title + e.detail.latitude + ',' + e.detail.longitude
        console.log(res);
      }
    })
    this.data.markers[0].latitude = e.detail.latitude
    this.data.markers[0].longitude = e.detail.longitude
    this.setData({
      markers: this.data.markers
    })
    let obj = {}
    obj.lat = e.detail.latitude
    obj.lng = e.detail.longitude
    obj.address = this.data.title
    wx.setStorageSync("location", obj)
  },
  // 设置地址
  setLocation(e) {
    this.data.markers[0].latitude = e.currentTarget.dataset.location.lat,
      this.data.markers[0].longitude = e.currentTarget.dataset.location.lng,
      this.data.markers[0].callout.content = e.currentTarget.dataset.title + e.currentTarget.dataset.location.lat + ',' + e.currentTarget.dataset.location.lng
    this.setData({
      latitude: e.currentTarget.dataset.location.lat,
      longitude: e.currentTarget.dataset.location.lng,
      markers: this.data.markers,
      addressList: []
    })
    wx.setStorageSync("location", e.currentTarget.dataset.location)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '地图',
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'H7TBZ-DJ76P-T7UDD-LFTAJ-NPCVK-PSBUA'
    });
    this.setData({
      latitude: options.latitude,
      longitude: options.longitude,
      markers: [{
        id: 0,
        title: options.title,
        latitude: options.latitude,
        longitude: options.longitude,
        iconPath: '../../images/sign.png', //图标路径
        width: 20,
        height: 20,
        callout: { //可根据需求是否展示经纬度
          content: options.title + options.latitude + ',' + options.longitude,
          color: '#fff',
          display: 'ALWAYS',
          bgColor: '#00CCFF',
          padding: 4,
          borderRadius: 4
        }
      }]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})