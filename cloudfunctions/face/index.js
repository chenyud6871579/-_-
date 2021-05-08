// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs");

cloud.init(
  {env:'tavel-line'}
)

var synDetectFace = function (url, callback){
  // Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const IaiClient = tencentcloud.iai.v20200303.Client;
const clientConfig = {
 credential: {
   secretId: "AKIDd191giUxBAsJU8JfV5WiJgnfF8k0smGS",
   secretKey: "81e0NmwhChLjcEpjMNeMYVcUOqPffgOq",
 },
 region: "ap-beijing",
 profile: {
   httpProfile: {
     endpoint: "iai.tencentcloudapi.com",
   },
 },
};
const client = new IaiClient(clientConfig);
const params = {
  "Url":url
};

  return new Promise(function(resolve, reject) { //构造异步函数，把人脸识别内容返回
    client.DetectFace(params, function(errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  })

// const params = {
//   "Url":url
// };
// client.DetectFace(params).then(
//   (data) => {
//     console.log(1)
//     console.log(data);
//     console.log(1)
//     callback(data);
//   },
//   (err) => {
//     console.error("error", err);
//   }
// )
}
// 云函数入口函数
exports.main = async (event, context) => {
  const data =event
  const fileList = [data.myfileID]
  const result = await cloud.getTempFileURL({
    fileList,})
  const url = result.fileList[0].tempFileURL  
  datas = await synDetectFace(url)
  console.log(2)
  console.log(datas)
  console.log(2)
  return {datas,url}
}
