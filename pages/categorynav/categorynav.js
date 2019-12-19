// pages/categorynav/categorynav.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: "",
    cid: "",
    currentOne: {},
    sel: 0,
    currentNav: {},
    goodsList: []
  },

  // 获取当前分类
  getCurrent() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`category/currentaction?id=${this.data.cid}`).then(res => {
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
  // 获取分类导航商品列表
  getCategoryNav() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`goods/goodsList?categoryId=${this.data.sid}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        let num = 0
        this.data.currentOne.subList.map((item, index) => {
          if (item.id === this.data.sid * 1) {
            num = index
          }
        })
        this.setData({
          currentNav: res.data.currentNav,
          goodsList: res.data.data,
          sel: num
        })
      }
      console.log(res, "分类导航商品列表")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 选择类型
  setSel(e) {
    this.setData({
      sel: e.currentTarget.dataset.index,
      sid: e.currentTarget.dataset.sid
    })
    this.getCategoryNav()
  },
  // 去商品详情页面
  goGoodsDetail(e) {
    wx.navigateTo({
      url: `/pages/goodsdetail/goodsdetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '商品列表',
    })
    this.setData({
      sid: options.sid,
      cid: options.cid
    })
    this.getCurrent()
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