// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.Content =='我发布失败了怎么办'||event.Content =='bug'){await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: '你好,这里是失与得小程序客服,您可以刷新或者等待人工客服哦亲',
    },
  })}else{
    await cloud.openapi.customerServiceMessage.send({
    touser: wxContext.OPENID,
    msgtype: 'text',
    text: {
      content: '你好,这里是失与得小程序客服',
    },
  })}
  

  return 'success'

}