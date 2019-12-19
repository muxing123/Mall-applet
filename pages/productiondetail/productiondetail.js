// pages/productiondetail/productiondetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    production: {},
    goodsList: []
  },

  // 获取制造商详情
  getProduction() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`brand/detailaction?id=${this.data.id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          production: res.data.data,
          goodsList: res.data.goodsList
        })
      }
      console.log(res, "制造商详情")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '制造商详情',
    })
    this.setData({
      id: options.id
    })
    this.getProduction()
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