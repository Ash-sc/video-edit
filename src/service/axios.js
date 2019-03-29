import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const xhr = ({
  url,
  method = 'post',
  data = null
}) => {
  const promise = new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data
    }).then(res => {
      const {
        code,
        msg
      } = res.data
      if (code !== 200) {
        return reject(new Error('请求失败'))
      }
      return resolve(msg || {})
    }).catch(err => {
      console.error('request error: %s', err)
      reject(err)
    })
  })

  return promise
}

export default xhr
