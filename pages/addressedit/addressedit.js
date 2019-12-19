// pages/addressedit/addressedit.js
import area from '../../lib/area.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    areaList: area,
    userName: "",
    address: "",
    detailadress: "",
    checked: false,
    openId: ""
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
  // 获取姓名
  onUserName(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  // 获取手机号
  onTelNumber(e) {
    this.setData({
      telNumber: e.detail.value
    })
  },
  // 选择省市区
  confirm(e) {
    console.log(e)
    let str = ""
    e.detail.values.map(item => {
      if (item !== undefined) {
        if (str.indexOf(item.name) === -1) {
          str += item.name
        }
      }
    })
    this.setData({
      address: str,
      show: false
    })
  },
  // 获取地址详情
  onDetailadress(e) {
    this.setData({
      detailadress: e.detail.value
    })
  },
  // 设置默认地址
  setChecked() {
    this.setData({
      checked: !this.data.checked
    })
  },
  // 新增地址或保存修改地址
  saveAddress() {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.id) {
      app.globalData.fly.post('address/saveAction', {
        address: this.data.address,
        addressId: this.data.id,
        checked: this.data.checked,
        detailadress: this.data.detailadress,
        openId: this.data.openId,
        telNumber: this.data.telNumber,
        userName: this.data.userName
      }).then(res => {
        if (res.data) {
          wx.hideLoading()
          wx.showToast({
            title: '修改成功',
          })
        }
        console.log(res, "修改地址")
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    } else {
      app.globalData.fly.post('address/saveAction', {
        address: this.data.address,
        checked: this.data.checked,
        detailadress: this.data.detailadress,
        openId: this.data.openId,
        telNumber: this.data.telNumber,
        userName: this.data.userName
      }).then(res => {
        if (res.data) {
          wx.hideLoading()
          wx.showToast({
            title: '保存成功',
          })
        }
        console.log(res, "新增地址")
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    }
  },
  // 获取单个地址详情
  getDetailAdress() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`address/detailAction?id=${this.data.id}`).then(res => {
      if (res.data) {
        wx.hideLoading()
        this.setData({
          userName: res.data.data.name,
          address: res.data.data.address,
          detailadress: res.data.data.address_detail,
          checked: res.data.data.is_default,
          telNumber: res.data.data.mobile
        })
      }
      console.log(res, "单个地址详情")
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
      title: '地址编辑',
    })
    if (options.id) {
      this.setData({
        id: options.id
      })
      this.getDetailAdress()
    }
    let openId = wx.getStorageSync("openId")
    this.setData({
      openId
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