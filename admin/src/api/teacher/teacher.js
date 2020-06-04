import request from '@/utils/request'

export default {
  getList(current, limit, query) {
    return request({
      url: `/eduservice/edu-teacher/teachers/${current}/${limit}`,
      method: 'post',
      data: query
    })
  }
}
