// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.Content =='发布'||event.Content =='失败'||event.Content =='bug'){await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: '您好，在发布信息时，若未对照片等个人隐私信息进行模糊处理，则此次发布将会被阻止。在发布过程中，若长时间无响应，您可以尝试刷新或者重新打开微信小程序。',
    },
  })}else{
    await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: '您好，这里是失与得小程序客服。',
    },
  })}
  return 'success'
}