// components/index/infeedgoods/infeedgoods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newGoods: {
      type: Array,
      value: () => []
    },
    type: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去查看页面
    goLook(e) {
      wx.navigateTo({
        url: `/pages/lookgoods/lookgoods?type=${e.currentTarget.dataset.type}&title=${e.currentTarget.dataset.title}`,
      })
    }
  }
})