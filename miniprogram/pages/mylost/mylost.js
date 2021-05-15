const db = wx.cloud.database()
Page({
  data: {
    page: 0, //预设当前项的值
    isSend: false,
    inputShowed: false,
    inputVal: "",
    myPosition: ""
  },
  mixins: [require('../util/themeChanged')],
  showInput: function () {
    this.setData({
        inputShowed: true
    });
},
hideInput: function () {
    this.setData({
        inputVal: "",
        inputShowed: false
    });
},
clearInput: function () {
    this.setData({
        inputVal: ""
    });
},

change_when_inputTyping: function() {
  var that = this
  const _ = db.command
  db.collection('lost').where(_.and([_.or([
    {
      position: db.RegExp({
        regexp: this.data.inputVal, //做为关键字进行匹配
        options: 'i', //不区分大小写
      })
    },
    {
      kind: db.RegExp({
        regexp: this.data.inputVal, //做为关键字进行匹配
        options: 'i', //不区分大小写
      })
    },
  {
    info: db.RegExp({
      regexp: this.data.inputVal, //做为关键字进行匹配
      options: 'i', //不区分大小写
    })
  },
  {
    name: db.RegExp({
      regexp: this.data.inputVal, //做为关键字进行匹配
      options: 'i', //不区分大小写
    })
  }
]),
{
  position: db.RegExp({
    regexp: this.data.myPosition, //做为关键字进行匹配
    options: 'i', //不区分大小写
  })
},
]))
    .orderBy('createTime', 'desc') //按发布时间排序
    .get({
      success(res) {
        that.setData({
          dataList_search: res.data
        })
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
},

inputTyping: function (e) {
  this.setData({
    inputVal: e.detail.value
});
  var that = this
  const _ = db.command
  db.collection('lost').where(_.and([_.or([
    {
      position: db.RegExp({
        regexp: this.data.inputVal, //做为关键字进行匹配
        options: 'i', //不区分大小写
      })
    },
    {
      kind: db.RegExp({
        regexp: this.data.inputVal, //做为关键字进行匹配
        options: 'i', //不区分大小写
      })
    },
  {
    info: db.RegExp({
      regexp: this.data.inputVal, //做为关键字进行匹配
      options: 'i', //不区分大小写
    })
  },
  {
    name: db.RegExp({
      regexp: this.data.inputVal, //做为关键字进行匹配
      options: 'i', //不区分大小写
    })
  }
]),
{
  position: db.RegExp({
    regexp: this.data.myPosition, //做为关键字进行匹配
    options: 'i', //不区分大小写
  })
},
]))
    .orderBy('createTime', 'desc') //按发布时间排序
    .get({
      success(res) {
        that.setData({
          dataList_search: res.data
        })
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
},

changePosition: function(e) {
  var p = e.currentTarget.dataset.p;
  if (p == 1)
  {
    this.setData({
      myPosition: "八里台"
  });
  }
  else if (p == 2)
  {
    this.setData({
      myPosition: "津南"
  });
  }
  else if (p == 3)
  {
    this.setData({
      myPosition: "泰达"
  });
  }
  else
  {
    this.setData({
      myPosition: ""
  });
  }
  this.getFound();
  this.getLost();
  this.change_when_inputTyping();
},

  onLoad: function(e) {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data
        })
      },
    })
    this.getLost()
    this.getFound()
  },
  onShow: function() {
    this.setData({
      isSend: false
    })
    this.onLoad()
  },
  delete: function(e) {
    var info = e.currentTarget.dataset.t
    console.log(info)
    db.collection('lost').doc(info._id).remove({
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          icon: 'success',
          title: '删除成功',
        })
        that.setData({
          contentlistn: res.data // 页面分配数据
        });
      }
    })
    this.onLoad()
  },
  delete1: function(e) {
    var info = e.currentTarget.dataset.t
    console.log(info)
    db.collection('found').doc(info._id).remove({
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          icon: 'success',
          title: '删除成功',
        })
      }
    })
    this.onLoad()
  },
  //联系方式
  call: function(e) {
    var temp = e.currentTarget.dataset.call
    wx.setClipboardData({
      data: temp.pCall,
      success(res) {
        wx.showToast({
          title: '电话已经复制',
        })
      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '该用户没有输入手机号码!',
        })
      }
    })
  },
  qq: function(e) {
    var temp = e.currentTarget.dataset.qq
    wx.setClipboardData({
      data: temp.pQQnum,
      success(res) {
        wx.showToast({
          title: 'QQ号已经复制',
        })
      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '该用户没有输入QQ号',
        })
      }
    })
  },
  wechat: function(e) {
    var temp = e.currentTarget.dataset.wechat
    wx.setClipboardData({
      data: temp.pWechat,
      success(res) {
        wx.showToast({
          title: '微信号已经复制',
        })
      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '该用户没有输入微信号',
        })
      }
    })
  },
  // 预览图片
  previewImg: function(e) {
    let imgData = e.currentTarget.dataset.img;
    wx.previewImage({
      //当前显示图片
      current: imgData[0],
      //所有图片
      urls: imgData[1]
    })
  },

  getLost: function() {
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid: res.data
        })
        console.log(that.data.openid)
        db.collection('lost')
      .orderBy('createTime', 'desc') //按发布视频排序
      .where({
        _openid: that.data.openid
      })
      .get({
        success(res) {
          that.setData({
            dataList: res.data
          })
        },
        fail(res) {
          console.log("请求失败", res)
        }
      })
      },
    })
  },
  getFound: function() {
    var that = this
    db.collection('found')
    .where({
      position: db.RegExp({
        regexp: this.data.myPosition, //做为关键字进行匹配
        options: 'i', //不区分大小写
      })
  })
      .orderBy('createTime', 'desc') //按发布时间排序
      .get({
        success(res) {
          that.setData({
            dataList1: res.data
          })
        },
        fail(res) {
          console.log("请求失败", res)
        }
      })
  }
})