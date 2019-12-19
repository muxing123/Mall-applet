// pages/address/address.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: "",
    addressList: []
  },

  // 获取全部地址
  getAddress() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`address/getListAction?openId=${this.data.openId}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          addressList: res.data.data
        })
      }
      console.log(res, "全部地址")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 去地址编辑页面
  goAddressEdit(e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: `/pages/addressedit/addressedit?id=${e.currentTarget.dataset.id}`,
      })
    } else {
      wx.navigateTo({
        url: '/pages/addressedit/addressedit',
      })
    }
  },
  // 去支付页面
  goPayment(e) {
    wx.navigateTo({
      url: `/pages/payment/payment?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 删除地址
  del(e) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`address/deleteAction?id=${e.currentTarget.dataset.id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        // this.setData({
        //   addressList: res.data.data
        // })
      }
      console.log(res, "删除地址")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
    this.getAddress()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '地址管理',
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
    let openId = wx.getStorageSync("openId")
    this.setData({
      openId
    })
    this.getAddress()
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