import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const xhr = ({
  url,
  data = null
}) => {
  const promise = new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data
    }).then(res => {
      const {
        errno,
        data
      } = res.data
      if (errno !== 0) {
        return reject(new Error('请求失败'))
      }
      return resolve(data || {})
    }).catch(err => {
      console.error('request error: %s', err)
      reject(err)
    })
  })

  return promise
}

export default xhr
