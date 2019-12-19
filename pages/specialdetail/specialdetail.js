// pages/specialdetail/specialdetail.js
const app = getApp()
const WxParse = require('../../lib/wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    topicDetail: {},
    recommendList: []
  },

  // 获取专题详情
  getSpecialDetail() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`topic/detailaction?id=${this.data.id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          topicDetail: res.data.data,
          recommendList: res.data.recommendList
        })
        let that = this;
        WxParse.wxParse('courseDetail', 'html', this.data.topicDetail.content, that, 5)
      }
      console.log(res, "专题详情")
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
      title: '专题详情',
    })
    this.setData({
      id: options.id
    })
    this.getSpecialDetail()
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