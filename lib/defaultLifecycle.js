import extend from "safe-extend"
const $ = require("@onface/ajax")
export default {
    // 必选项
    fetch: function(callback){
        /*
            {Object} callback
                {Object} net
                    {function} done
                    {function} fail
         */
        console.log('[base] fetch')
        // request 最后的通用处理
        // $.ajax(request,settings)
        console.log('\tcallback',this, callback)
        let settings = extend.clone(this.settings)
            settings.data = extend.clone(this.sourceRequest)
        return $.ajax(settings)
                .done(function(res){
                    console.log('[base] fetch done')
                    callback.net.done()
                    callback.output(res)
                })
                .fail(function(){
                    console.log('[base] fetch fail')
                    callback.net.fail()
                })
                .always(function(){
                    console.log('[base] fetch always')
                    callback.loading()
                })
    },
    matchResponse: function(response, responseMap){
        console.log('[base] matchResponse',response, responseMap)
        return responseMap[response.type].call(this,response)
    },
    // 非必须项
    settings: {
        dataType:'json'
    },
    netCallback: {
        done: function(){console.log('[base] netCallback done')},
        fail: function(){console.log('[base] netCallback fail')},
    },
    loading: function(value){
        console.log('[base] loading')
        // 所有函数的 this 都指向当前请求信息
        /*
          this = {
            settings: {type: 'get', url: '/news'},
            sourceRequest: { status: '1'}, // [middle]处理后数据
            request: { status: 'open' },  // [apply]提交数据
            sourceResponse: '{items:[...]}', // [middle]处理后数据
            response: {items: [...]},
          }
        */
    },
    input: function(request){
        console.log('[base] input')
        // 你可以使用 JSON-schema 校验 request
        return request
    },
    output: function(response){
        console.log('[base] output')
        // 你可以使用 JSON-schema 校验 response
        // TODO: 请求成功 无响应值 显示报错信息
        return response
    },
    outputMap: {
        pass: function(response){
            console.log('[base] outputMap pass')
            // 你可以使用 JSON-schema 校验 response
            return response
        }
    }
}
