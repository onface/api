import extend from "safe-extend"
class API {
    constructor(props) {
        this.settings = extend.clone(props)
    }
}
export default API
module.exports = API
