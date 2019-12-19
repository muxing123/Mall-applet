// pages/payment/payment.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: "",
    addressList: {},
    goodsList: []
  },

  // 获取购买详情
  getOrderDetail() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`order/detailAction?openId=${this.data.openId}&addressId=${this.data.addressId}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        // this.setData({
        //   goodsList: res.data.data
        // })
      }
      console.log(res, "购买详情")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 获取默认地址
  getAddress() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`address/getListAction?openId=${this.data.openId}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        res.data.data.map(item => {
          if (this.data.id) {
            if (item.id === this.data.id) {
              this.setData({
                addressList: item,
                addressId: item.id
              })
              this.getOrderDetail()             
            }
          } else if (item.is_default === 1) {
            this.setData({
              addressList: item,
              addressId: item.id
            })
            this.getOrderDetail()
          }
        })
      }
      console.log(res, "全部地址")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 去地址页面
  goAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let openId = wx.getStorageSync("openId")
    this.setData({
      openId
    })
    if (options.id) {
      this.setData({
        id: options.id * 1
      })
    }
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
    this.getAddress()
    let total = wx.getStorageSync("total")
    let goodsList = wx.getStorageSync("goodsList")
    if (goodsList) {
      this.setData({
        goodsList,
        total
      })
    }
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