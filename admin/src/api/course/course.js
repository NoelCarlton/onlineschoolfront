import request from '@/utils/request'

export default {
  add(courseInfo) {
    return request({
      url: `/eduservice/edu-course/add`,
      method: 'POST',
      data: courseInfo
    })
  }
}
