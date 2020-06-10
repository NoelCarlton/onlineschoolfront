import request from '@/utils/request'

export default {
  getList(current, limit, query) {
    return request({
      url: `/eduservice/edu-teacher/teachers/${current}/${limit}`,
      method: 'post',
      data: query
    })
  },
  deleteById(id){
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  saveTeacher(teacher){
    return request({
      url: '/eduservice/edu-teacher/add',
      data: teacher,
      method: "post"
    })
  },
  getTeacher(id){
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'get'
    })
  },
  update(teacher){
    return request({
      url: `/eduservice/edu-teacher/update`,
      method: 'post',
      data: teacher
    })
  }
}
