export default {
  // 必选项
  fetch: (request, settings, callback) => {
    
  },
  matchResponse: (response, responseMap) => {
    return responseMap[response.type]
  },
  // 非必须项
  settings: {

  },
  callback: {

  },
  loading: (value) => {
    // 所以函数的 this 都指向当前请求信息
    /*
      this = {
        settings: {type: 'get', url: '/news'},
        sourceRequest: { status: '1'},
        request: { status: 'open' },
        sourceResponse: '{items:[...]}',
        response: {items: [...]},
      }
    */
  },
  input: (request) => {
    // 你可以使用 JSON-schema 校验 request
    return request
  },
  output: (response) => {
    // 你可以使用 JSON-schema 校验 response
    return response
  },
  outputMap: {
    pass: (response) => {
      // 你可以使用 JSON-schema 校验 response
      return response
    }
  }
}
