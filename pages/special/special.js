// pages/special/special.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    topicList: [],
    show: false
  },

  // 获取专题数据
  getSpecial() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.page === 1) {
      app.globalData.fly.get(`topic/listaction?page=${this.data.page}`).then(res => {
        if (res.data) {
          wx.hideLoading()
          this.setData({
            topicList: res.data.data
          })
        }
        console.log(res, "专题数据")
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    } else {
      app.globalData.fly.get(`topic/listaction?page=${this.data.page}`).then(res => {
        if (res.data) {
          if (res.data.data.length === 0) {
            this.setData({
              show: true
            })
          }
          wx.hideLoading()
          this.setData({
            topicList: this.data.topicList.concat(res.data.data)
          })
        }
        console.log(res, "专题数据")
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    }
  },
  // 去专题详情页面
  goSpecialDetail(e) {
    wx.navigateTo({
      url: `/pages/specialdetail/specialdetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '专题',
    })
    this.getSpecial()
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
    this.data.page += 1
    this.setData({
      page: this.data.page
    })
    if(this.data.show !== true) {
      this.getSpecial()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})