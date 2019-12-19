// pages/lookgoods/lookgoods.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    num: 1,
    goodsList: [],
    order: ""
  },

  // 获取商品
  getGoods() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.type === 1) {
      app.globalData.fly.get(`goods/goodsList?isNew=1&order=${this.data.order}`).then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            goodsList: res.data.data
          })
        }
        console.log(res, "新品首发")
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    } else {
      app.globalData.fly.get(`goods/goodsList?isHot=1&order=${this.data.order}`).then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            goodsList: res.data.data
          })
        }
        console.log(res, "人气推荐")
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    }
  },
  // 设置升降序
  setOrder(e) {
    this.setData({
      order: e.currentTarget.dataset.order,
      num: 0
    })
    this.getGoods()
  },
  // 设置选中
  setNum(e) {
    this.setData({
      num: e.currentTarget.dataset.num,
      order: ""
    })
    this.getGoods()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    this.setData({
      type: options.type * 1
    })
    this.getGoods()
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