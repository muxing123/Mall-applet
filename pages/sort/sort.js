// pages/sort/sort.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sel: 0,
    categoryList: [],
    id: 1005000,
    currentOne: {}
  },

  // 获取分类列表
  getCategory() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get('category/indexaction').then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          categoryList: res.data.categoryList
        })
      }
      console.log(res, "分类列表")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 获取当前分类
  getCurrent() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`category/currentaction?id=${this.data.id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          currentOne: res.data.data.currentOne
        })
      }
      console.log(res, "当前分类")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 选择分类
  setSel(e) {
    this.setData({
      sel: e.currentTarget.dataset.index,
      id: e.currentTarget.dataset.id
    })
    this.getCurrent()
  },
  // 去分类导航页面
  goCategoryNav(e) {
    wx.navigateTo({
      url: `/pages/categorynav/categorynav?sid=${e.currentTarget.dataset.sid}&cid=${e.currentTarget.dataset.cid}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '分类',
    })
    this.getCategory()
    this.getCurrent()
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