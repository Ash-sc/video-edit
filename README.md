# video-edit


1. 根据输入的url获取视频片段信息

req: {
  url: xxxx
}

res: {
  errno: 0 // 0代表成功
  data: [
    { id: xx, image: 'xxxx', video: 'xxxxx' } // id 唯一标识   image 显示图片   video  片段视频地址
    ...
  ]
}


2. 根据编辑后选择的视频，拼接成新的视频并下载

req: {
  list: [xx, xx, xx] // id 数组
}

res: {
  errno: 0,
  data: 'xxxxxxx' // 视频下载url
}