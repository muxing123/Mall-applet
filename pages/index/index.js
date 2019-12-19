//index.js
//获取应用实例
let QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
let qqmapsdk;
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    channel: [],
    brandList: [],
    newGoods: [],
    hotGoods: [],
    topicList: [],
    newCategoryList: [],
    address: "",
    location: ""
  },

  // 获取首页数据
  getIndex() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get('index/index').then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          banner: res.data.banner,
          channel: res.data.channel,
          brandList: res.data.brandList,
          newGoods: res.data.newGoods,
          hotGoods: res.data.hotGoods,
          topicList: res.data.topicList,
          newCategoryList: res.data.newCategoryList
        })
      }
      console.log(res, "首页数据")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 去首页分类页面
  goIndexCategory(e) {
    wx.navigateTo({
      url: `/pages/indexcategory/indexcategory?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 去制造商详情页面
  goProduction(e) {
    wx.navigateTo({
      url: `/pages/productiondetail/productiondetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 去搜索页面
  goSearch() {
    console.log(111)
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 获取位置
  getLocation() {
    wx.getLocation({
      type: 'wgs84',
      isHighAccuracy: true,
      highAccuracyExpireTime: 5000,
      success: res => {
        console.log(res)
        // this.setData({
        //   latitude: res.latitude,
        //   longitude: res.longitude
        // })
        // this.setAddress()
      }
      // fail: res => {
      //   this.showSettingToast()
      // }
    })
  },
  // 设置位置
  setAddress() {
    // 第一种方法使用腾讯位置服务
    wx.navigateTo({
      url: `/pages/map/map?latitude=${this.data.latitude}&longitude=${this.data.longitude}&title=${this.data.address}`,
    })
    // 第二种方法使用wx.chooseLocation
    // wx.chooseLocation({
    //   latitude: this.data.latitude,
    //   longitude: this.data.longitude,
    //   success: res => {
    //     let address = res.name
    //     this.setData({
    //       address,
    //       latitude: res.latitude,
    //       longitude: res.longitude
    //     })
    //     console.log(res)
    //   },
    // })
  },
  // 提示
  showSettingToast() {
    wx.showModal({
      title: '特别提醒',
      content: '若不授权，则无法正常使用该程序',
      success: res => {
        if (res.confirm) {
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
            }
          })
        } else if (res.cancel) {
          this.showSettingToast()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '精品商城',
    })
    this.getIndex()
    this.getLocation()
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'H7TBZ-DJ76P-T7UDD-LFTAJ-NPCVK-PSBUA'
    });
    let that = this
    // let location = wx.getStorageSync("location")
    // if (location) {
    //   let str = ''
    //   str += location.lat + ',' + location.lng
    //   this.setData({
    //     location: str
    //   })
    // }
    qqmapsdk.reverseGeocoder({
      location: '',
      success: function (res) {
        that.setData({
          address: res.result.address_component.street_number,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng
        })
        console.log(res, that.data.location);
      }
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
    // 定位只执行一次
    // let that = this
    let location = wx.getStorageSync("location")
    if (location) {
      this.setData({
        address: location.address,
        latitude: location.lat,
        longitude: location.lng
      })
    }
    // if (location) {
    //   let str = ''
    //   str += location.lat + ',' + location.lng
    //   this.setData({
    //     location: str
    //   })
    // }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          console.log(res, '已授权')
        } else {
          this.showSettingToast()
        }
      }
    })
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