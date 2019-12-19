// pages/goodsdetail/goodsdetail.js
const app = getApp()
const WxParse = require('../../lib/wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    openId: "",
    gallery: [],
    info: {},
    attribute: [],
    issue: [],
    productList: [],
    show: false,
    value: 1,
    collected: false
  },

  // 获取商品详情
  getGoodsDetail() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`goods/detailaction?id=${this.data.id}&openId=${this.data.openId}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          gallery: res.data.gallery,
          info: res.data.info,
          attribute: res.data.attribute,
          issue: res.data.issue,
          productList: res.data.productList,
          collected: res.data.collected
        })
        let that = this;
        WxParse.wxParse('courseDetail', 'html', this.data.info.goods_desc, that, 5)
      }
      console.log(res, "商品详情")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 打开弹出层
  setShow() {
    this.setData({
      show: true
    })
  },
  // 关闭弹出层
  onClose() {
    this.setData({
      show: false
    })
  },
  // 获取数量
  onChange(e) {
    this.setData({
      value: e.detail,
      allPrise: e.detail * this.data.info.retail_price
    })
  },
  // 加入购物车
  onCart() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.post('cart/addCart', {
      goodsId: this.data.id,
      number: this.data.value,
      openId: this.data.openId
    }).then(res => {
      if (res.data) {
        wx.hideLoading()
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
      }
      console.log(res, "加入购物车")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 立即购买
  onBuy() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.post('order/submitAction', {
      allPrise: this.data.allPrise,
      goodsId: this.data.id,
      openId: this.data.openId
    }).then(res => {
      if (res.data) {
        wx.hideLoading()
      }
      console.log(res, "立即购买")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 加入收藏
  addcollect() {
    this.setData({
      collected: !this.data.collected
    })
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.post('collect/addcollect', {
      goodsId: this.data.id,
      openId: this.data.openId
    }).then(res => {
      if (res.data) {
        wx.hideLoading()
        if (this.data.collected) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '取消收藏',
            icon: 'cancel',
            duration: 2000
          })
        }
      }
      console.log(res, "加入收藏")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 去购物车
  goCart() {
    wx.switchTab({
      url: '/pages/shoppingcart/shoppingcart',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    let openId = wx.getStorageSync("openId")
    this.setData({
      id: options.id,
      openId
    })
    this.getGoodsDetail()
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