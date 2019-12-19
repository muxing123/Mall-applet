// pages/indexcategory/indexcategory.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    categoryList: [],
    active: 1005000,
    currentNav: {},
    goodsList: []
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
  // 获取首页分类导航
  getCategoryNav() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`goods/goodsList?categoryId=${this.data.id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          currentNav: res.data.currentNav,
          goodsList: res.data.data
        })
      }
      console.log(res, "首页分类导航")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 选择分类
  setSel(e) {
    console.log(e)
    this.setData({
      id: e.detail.name
    })
    this.getCategoryNav()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '首页分类导航',
    })
    this.setData({
      id: options.id,
      active: options.id * 1
    })
    this.getCategory()
    this.getCategoryNav()
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