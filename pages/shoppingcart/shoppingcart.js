// pages/shoppingcart/shoppingcart.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: "",
    goodsList: [],
    count: 0,
    selAll: false,
    total: 0
  },
  // 获取购物车
  getCart() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`cart/cartList?openId=${this.data.openId}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        res.data.data.map(item => {
          item.sel = false
        })
        this.setData({
          goodsList: res.data.data
        })
      }
      console.log(res, "获取购物车")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 控制单选
  setSel(e) {
    let index = e.currentTarget.dataset.index
    this.data.goodsList[index].sel = !this.data.goodsList[index].sel
    this.data.selAll = this.data.goodsList.every(item => {
      return item.sel === true
    })
    let count = 0
    let total = 0
    let arr = []
    this.data.goodsList.map(item => {
      if (item.sel) {
        count += 1
        total += item.retail_price * item.number
        arr.push(item)
      }
    })
    wx.setStorageSync("total", total)
    wx.setStorageSync("goodsList", arr)
    this.setData({
      selAll: this.data.selAll,
      count,
      total,
      goodsList: this.data.goodsList
    })
  },
  // 控制全选
  setSelAll() {
    this.data.selAll = !this.data.selAll
    let count = 0
    let total = 0
    let arr = []
    this.data.goodsList.map(item => {
      item.sel = this.data.selAll
      if (item.sel) {
        count += 1
        total += item.retail_price * item.number
        arr.push(item)
      }
    })
    wx.setStorageSync("total", total)
    wx.setStorageSync("goodsList", arr)
    this.setData({
      selAll: this.data.selAll,
      count,
      total,
      goodsList: this.data.goodsList
    })
  },
  // 删除商品
  del(e) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`cart/deleteAction?id=${e.currentTarget.dataset.id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
      }
      console.log(res, "删除商品")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
    this.getCart()
  },
  // 去支付页面
  onSubmit() {
    wx.navigateTo({
      url: '/pages/payment/payment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '购物车',
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
    this.getCart()
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