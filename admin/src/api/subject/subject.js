import request from '@/utils/request'

export default {
  subjects() {
    return request({
      url: `/eduservice/subject/subjects`,
      method: 'get'
    })
  }
}
