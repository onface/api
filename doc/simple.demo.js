var API = require('@onface/api')
var api = new API({

})

var getNews = api.create({
  settings: {
    type: 'get',
    url: '/news'
  },
  input: (req) => {
    var map = {
      'open': '1',
      'close': '2'
    }
    req.status = map[req.status]
    return req
  },
  outputMap: {
    pass: (res) => {
      var map = {
        '1': 'open',
        '2': 'close'
      }
      res.items = res.items.map((item) => {
        item.status = map[item.status]
        return item
      })
      return res
    }
  }
})

let request = {
  status: this.search.status
}
getNews(request, {
  pass: () => {
    vm.items = res.items
  },
  fail: (res) => {
    vm.pageStatus = 'fail'
    vm.pageFailMsg = res.msg
  }
}, {
  loading: (value) => {
    vm.loading = value
    if (value) {
      // before
    }
    else {
      // after
    }
  },
  net: {
    done: () => {

    },
    fail: (jqXHR, textStatus) => {
      switch(textStatus) {
        case 'timeout':
          alert('网络超时')
        break
        case 'abort':
        break
        default:
          alert('网络错误')
      }
    }
  }
})
