const app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    fabu: false,
    login: false,
    right: "../../images/right.png",
    down: "../../images/down.png",
    biaobai: 0,
    xianzhi: 0,
    lost: 0,
    found: 0
  },
  about(){
    wx.navigateTo({
      url: './about/about',
    })
   },
  previewImg: function (e) {
    wx.navigateTo({
      url: '../sendContact/sendContact',
    })
    // wx.showLoading({
    //   title: '正在加载',
    // })
    // var img = ['cloud://cloud-nbiot.636c-cloud-nbiot-1259603003/13.png']
    // wx.previewImage({
    //   //当前显示图片
    //   current: 'cloud://cloud-nbiot.636c-cloud-nbiot-1259603003/13.png',
    //   //所有图片
    //   urls: img,
    //   success(){
    //     wx.hideLoading()
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          login: true
        })
        wx.setStorage({
          key: 'login',
          data: true,
        })
        console.log("userInfo: ", res.userInfo)
        wx.setStorage({
          key: 'userInfo',
          data: res.userInfo,
        })
        this.getOpenid()
      }
    })
  },

  getOpenid: function() {
    let that = this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result)
        var openid = res.result.openid;
        that.setData({
          openid: openid
        })
        wx.setStorage({
          key: 'openid',
          data: that.data.openid
        })
      }
    })
  },
  fabu: function() {
    var temp = this.data.fabu
    var a = !temp
    this.setData({
      fabu: a
    })
    this.getLost()
  },
  getLost: function() {
    var that = this
    db.collection('found').where({
      _openid: this.data.openid
    }).count({
      success: function(res) {
        that.setData({
          found: res.total
        })
      }
    })
    db.collection('lost').where({
      _openid: this.data.openid
    }).count({
      success: function(res) {
        that.setData({
          lost: res.total
        })
      }
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
    this.fabu();
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