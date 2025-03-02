import { mande } from "mande";
async function currency() {
    let api = mande("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    let currency = await api.get()
    let arr = currency.filter(el => ["USD", "EUR", "PLN"].includes(el.cc));
    return arr
}
async function getCurrencyMessage() {
    let arr = await currency()
    let str = "Курс на сьогодні:\r\n"
    for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        str += `${el.cc}: ${el.rate}\r\n`;
    }
    return str
}
export {currency, getCurrencyMessage}