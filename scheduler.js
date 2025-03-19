import {getDelay} from "./dateUtils.js";
import {getCurrencyMessage} from "./currency.js";

function scheduleMessage(timerMap, time, chatId, bot) {
    let delay = getDelay(time)
    let oldTimerId = timerMap[chatId]
    if (oldTimerId !== undefined) {
        clearTimeout(oldTimerId)
    }
    timerMap[chatId] = setTimeout(async () => {
        console.log(chatId, time, "messages")
        await bot.api.sendMessage(chatId, await getCurrencyMessage())
    }, delay)
    console.log({time, chatId})
}
function disableSchedule(timerMap, chatId, bot) {
    let oldTimerId = timerMap[chatId]
    if (oldTimerId !== undefined) {
        clearTimeout(oldTimerId)
    }
    delete timerMap[chatId]
}

export {scheduleMessage, disableSchedule}