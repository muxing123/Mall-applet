// components/index/goodslist/goodslist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    category: {
      type: Object,
      value: () => {}
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
    // 去首页分类导航页面
    goIndexCategory(e) {
      wx.navigateTo({
        url: `/pages/indexcategory/indexcategory?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
})