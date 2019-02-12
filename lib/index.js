import extend from "safe-extend"
import defaultProps from './defaultLifecycle.js'
class API {
    constructor(props) {
        let finalProps = extend(true,defaultProps,props)
        for(let key in finalProps){
            this[key] = finalProps[key]
        }
    }
}
API.prototype.create = function (options) {
    /*
        options.prototype
            {Object} settings
            {function} input
            {function} output
            {Object} outputMap
            {Object} net
                {function} done
                {function} fail
     */
    const self = this
    console.log('\tbase',self)
    let settings = extend(
        true,
        self.settings,
        options.settings
    )
    console.log('create')
    console.log('\tsettings',settings)
    return function (request, callback, xhrCallback) {
        console.log('apply')
        /*
            [apply] request
            [base] input
            [middle] input => sourceRequest

            [apply] loading(true)
            [base] loading(true)

            [base] fetch

            [base] net.callback done || fail
            [middle] net.callback done || fail
            [apply] net.callback done || fail

            [base] ouput&outputMap => sourceResponse
            [middle] ouput&outputMap => response
            [apple] outputMap


            [apply] loading(false)
            [base] loading(false)
         */
        let xhrInfo = {
            settings: settings,
            request: request
        }
        self.input.call(xhrInfo, xhrInfo.request)
        xhrInfo.sourceRequest = options.input.call(xhrInfo, extend.clone(xhrInfo.request) )

        let runBaseLoading = xhrCallback.loading.call(xhrInfo, true)
        if(typeof runBaseLoading == 'undefined'){
            runBaseLoading = true
        }
        if(runBaseLoading){
            self.loading.call(xhrInfo, true)
        }

        self.fetch.call(xhrInfo,{
            output:(res)=>{
                // response 首次处理 => sourceResponse
                xhrInfo.sourceResponse = self.output.call(xhrInfo, res)
                xhrInfo.sourceResponse = self.matchResponse.call(
                    xhrInfo,
                    extend.clone(xhrInfo.sourceResponse),
                    self.outputMap
                )
                xhrInfo.response = options.output.call(xhrInfo, res)
                xhrInfo.response = self.matchResponse.call(
                    xhrInfo,
                    extend.clone(xhrInfo.response),
                    options.outputMap
                )
                self.matchResponse.call(
                    xhrInfo,
                    extend.clone(xhrInfo.response),
                    callback
                )
            },
            net:{
                done:()=>{
                    self.netCallback.done()
                    options.net.done()
                    xhrCallback.net.done()
                },
                fail:()=>{
                    self.netCallback.fail()
                    options.net.fail()
                    xhrCallback.net.fail()
                }
            },
            loading:()=>{
                xhrCallback.loading.call(xhrInfo, false)
                if(runBaseLoading){
                    self.loading.call(xhrInfo, false)
                }
            }
        })
    }
}
export default API
module.exports = API
