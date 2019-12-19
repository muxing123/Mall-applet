// pages/search/search.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeywordList: [],
    keyword: "",
    keywords: [],
    historyData: []
  },

  // 获取搜索相关
  getRelative() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`search/indexaction?openId=${this.data.openId}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          hotKeywordList: res.data.hotKeywordList,
          historyData: res.data.historyData
        })
      }
      console.log(res, "搜索相关")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 获取关键字
  onChange(e) {
    this.setData({
      keyword: e.detail
    })
    if (this.data.keyword === '') {
      this.setData({
        keywords: []
      })
    }
  },
  // 设置关键字
  setKeyword(e) {
    this.setData({
      keyword: e.currentTarget.dataset.keyword
    })
  },
  // 关键字搜索
  onSearch(e) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`search/helperaction?keyword=${this.data.keyword}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          keywords: res.data.keywords
        })
      }
      console.log(res, "关键字搜索")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  // 添加搜索历史
  addHistory(e) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.post('search/addhistoryaction', {
      keyword: this.data.keyword,
      openId: this.data.openId
    }).then(res => {
      if (res.data) {
        wx.hideLoading()
      }
      console.log(res, "添加搜索历史")
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
    wx.navigateTo({
      url: `/pages/goodsdetail/goodsdetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 清空搜索历史
  del() {
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          app.globalData.fly.post('search/clearhistoryAction', {
            openId: this.data.openId
          }).then(res => {
            if (res.data) {
              wx.hideLoading()
              this.getRelative()
            }
            console.log(res, "清空搜索历史")
          }).catch(err => {
            wx.hideLoading()
            console.log(err)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 返回上一页
  onCancel() {
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '搜索',
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
    this.getRelative()
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