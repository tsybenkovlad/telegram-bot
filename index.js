import {getCurrencyMessage} from "./currency.js";
import {addUser, timeOut, loadUsers} from "./users.js";
import {scheduleMessage} from "./scheduler.js";
import {Bot} from "grammy";
import {conversations, createConversation} from "@grammyjs/conversations"

const timerMap = {};

const bot = new Bot("7926259652:AAGmeyWdLp-bz9z5ageK6lWYPGbmarj6E8Q");
bot.use(conversations());
bot.api.setMyCommands([
    {
        command: "start",
        description: "Запустити бота"
    },
    {
        command: "time",
        description: "Обрати час коли буде надсилатись курс валют"
    },
    {
        command: "rate",
        description: "Показати поточний курс"
    }
])

async function hello(conversation, ctx) {
    await ctx.reply("Введіть час у форматі HH:MM (наприклад, 13:00), коли ви хочете отримувати повідомлення");
    const {message} = await conversation.waitFor("message:text");
    const response = await conversation.external(() => {
        try {
            let time = message.text
            timeOut(ctx.chatId, time)
            scheduleMessage(timerMap, time, ctx.chatId, bot)
            return `Повідомлення з курсом буде надсилатись кожного дня о ${message.text}`
        } catch (error) {
            console.error(error)
            return `Помилка: ${error.message}, викличте команду /time повторно`
        }
    })
    await ctx.reply(response);
}

bot.use(createConversation(hello));

bot.command("start", (ctx) => {
    ctx.reply("Ласкаво просимо! Використовуйте команди для керування ботом")
    let id = ctx.chatId
    let user = ctx.from
    addUser(user, id)
    console.log(user)
    console.log(id)
});
bot.command("time", async (ctx) => {
    await ctx.conversation.enter("hello");
})
bot.command("rate", async (ctx) => {
    await ctx.reply(await getCurrencyMessage());
})
bot.on("message", async (ctx) => {
    await ctx.reply("Використовуйте команди для роботи з чатом!")
});
bot.start();

// ----------------
let userArr = loadUsers()
for (let i = 0; i < userArr.length; i++) {
    scheduleMessage(timerMap, userArr[i].time, userArr[i].chatId, bot)
}