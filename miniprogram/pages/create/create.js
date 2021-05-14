// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_src1: "../../images/lost_something.png",
    img_src2: "../../images/find_something.png",
    style: 'width: 300rpx; height: 300rpx;'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  find_create: function () {
    var that = this
    wx.getStorage({
      key: 'login',
      success: function(res) {
        if (res.data) {
          wx.navigateTo({
            url: 'find_create/find_create',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx.showToast({
            icon: "none",
            title: '您还未登录'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          icon: "none",
          title: '您还未登录'
        })
      }
    })
    },

    lost_create: function () {
      var that = this
      wx.getStorage({
        key: 'login',
        success: function(res) {
          if (res.data) {
            wx.navigateTo({
              url: 'lost_create/lost_create',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          } else {
            wx.showToast({
              icon: "none",
              title: '您还未登录'
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            icon: "none",
            title: '您还未登录'
          })
        }
      })
    },

})