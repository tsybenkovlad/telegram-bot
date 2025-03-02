import {parse} from "date-fns"

function getDelay(str) {
    let date = parse(str, 'HH:mm', new Date())
    let millisecond = date.getTime()
    let now = new Date().getTime()
    let dif = millisecond - now
    if (dif < 0) {
        let day = 24 * 60 * 60 * 1000
        return dif + day
    }
    return dif
}
export {getDelay}