// pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: [{
        name: "我的订单",
        icon: "balance-list-o"
      },
      {
        name: "优惠卷",
        icon: "award-o"
      },
      {
        name: "礼品卡",
        icon: "bill-o"
      },
      {
        name: "我的收藏",
        icon: "like-o"
      },
      {
        name: "我的足迹",
        icon: "eye-o"
      },
      {
        name: "会员福利",
        icon: "vip-card-o"
      },
      {
        name: "地址管理",
        icon: "location-o"
      },
      {
        name: "账号安全",
        icon: "chat-o"
      },
      {
        name: "联系客服",
        icon: "phone-circle-o"
      },
      {
        name: "帮助中心",
        icon: "question-o"
      },
      {
        name: "意见反馈",
        icon: "notes-o"
      }
    ],
    userInfo: {}
  },
  showSettingToast() {
    wx.showModal({
      title: '特别提醒',
      showCancel: false,
      content: '您已拒绝授权登录，可能无法正常使用该程序，请再次点击登录'
    })
  },
  // 获取用户信息
  getUserInfo(e) {
    console.log(e)
    let that = this;
    // 验证用户是否已经授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            userInfo: e.detail.userInfo
          })
          console.log('已授权')
        } else {
          that.showSettingToast()
        }
      }
    })
  },
  // 去其他页面
  goJump(e) {
    let index = e.currentTarget.dataset.index
    if (index === 3) {
      wx.navigateTo({
        url: '/pages/collection/collection',
      })
    } else if (index === 6) {
      wx.navigateTo({
        url: '/pages/address/address',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '我的',
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