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
    output: (response) => {
        console.log('[middle] output')
        return response
    },
    outputMap: {
        pass: (res) => {
            console.log('[middle] outputMap pass')
            var map = {
              '1': 'open',
              '2': 'close'
            }
            console.log('\tres',res)
            res.data.items = res.data.items.map((item) => {
              item.status = map[item.status]
              return item
            })
            return res
        }
    },
    net: {
        done: () => {
            console.log('[middle] net done')
        },
        fail: (jqXHR, textStatus) => {
            console.log('[middle] net fail')
            switch(textStatus) {
                case 'timeout':
                  console.log('\t网络超时')
                break
                case 'abort':
                break
                default:
                  console.log('\t网络错误')
            }
        }
    }
})

let request = {
  status: 'open'
}
getNews(
    request,
    {
        pass: (res) => {
            console.log('[apply] pass')
            // vm.items = res.items
            let items = res.data.items
            console.log('\titems', items)
        },
        fail: (res) => {
            console.log('[apply] fail')
            // vm.pageStatus = 'fail'
            let pageStatus = 'fail'
            console.log('\tpageStatus', pageStatus)
            // vm.pageFailMsg = res.msg
            let pageFailMsg = res.msg
            console.log('\tpageFailMsg', pageFailMsg)
        }
    },
    {
        loading: (value) => {
            console.log('[apply] loading')
            // vm.loading = value
            let loading = value
            console.log('\tloading', loading)
            if (value) {
              // before
            }
            else {
              // after
            }
        },
        net: {
            done: () => {
                console.log('[apply] net done')
            },
            fail: (jqXHR, textStatus) => {
                console.log('[apply] net fail')
                switch(textStatus) {
                    case 'timeout':
                      console.log('\t网络超时')
                    break
                    case 'abort':
                    break
                    default:
                      console.log('\t网络错误')
                }
            }
        }
    }
)
