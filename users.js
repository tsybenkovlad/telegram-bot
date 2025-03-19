import fs from "node:fs"
import {getDelay} from "./dateUtils.js";


const FILE_NAME = "users.json"

function loadUsers() {
    let arr = []
    if (fs.existsSync(FILE_NAME)) {
        const fileData = fs.readFileSync(FILE_NAME, "utf8");
        if (fileData) {
            arr = JSON.parse(fileData);
        }
    }
    return arr
}

function addUser(user, chatId) {
    let obj = {
        chatId,
        user
    }
    let arr = loadUsers()
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].chatId === obj.chatId) {
            return
        }
    }
    arr.push(obj);
    fs.writeFileSync(FILE_NAME, JSON.stringify(arr, null, 2), "utf8");
}

function timeOut(chatId, time) {
    try {
        if (time !== "" && isNaN(getDelay(time))) {
            throw new Error()
        }
    } catch (error) {
        throw new Error("Неправильний формат часу")
    }


    const fileData = fs.readFileSync(FILE_NAME, "utf8");
    let arr = JSON.parse(fileData);
    for (let i = 0; i < arr.length; i++) {
        if (chatId === arr[i].chatId) {
            arr[i].time = time
            fs.writeFileSync(FILE_NAME, JSON.stringify(arr, null, 2), "utf8");
            return
        }
    }
    throw new Error("chat not found")
}

export {addUser, timeOut, loadUsers}