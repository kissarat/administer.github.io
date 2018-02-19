/**
 * @author Taras Labiak <kissarat@gmail.com>
 */

const start = Date.now()
const id = 904390603 ^ (2 ** 30 - 1)
var ip;

var zen = /zen=(\w+)/.exec(document.cookie)
if (zen) {
    zen = zen[1]
}
else {
    zen = start.toString(36)
    document.cookie = `zen=${zen}; path=/; max-age=` + (3600 * 24 * 365 * 10)
}

function send(text) {
    navigator.sendBeacon(
        atob('aHR0cHM6Ly9hcGkudGVsZWdyYW0ub3JnL2JvdDU0NzA3MzA0NTpBQUcza2NEaHFhNDZZVU1taVhmU3ZPZGhrNXVXRW90M0U1SQ==')
        + `/sendMessage?chat_id=${id}&text=` + text
    )
}

function report() {
    saveForm()
    if (!+localStorage.debug) {
        const spent = (Date.now() - start) / 1000
        const stamp = new Date(parseInt(zen, 36)).toISOString()
        send(`${spent}   [${ip}]  ${stamp} <${zen}> ${navigator.userAgent}`)
    }
}

function ipify(about) {
    ip = about.ip
}

addEventListener('unload', report)

const gservice = new Vue({
    el: '#slogan',
    data: {
        contact: false,
        email: localStorage.email || '',
        name: localStorage.name || '',
        text: localStorage.text || ''
    },

    methods: {
        send() {
            saveForm()
            send(`${this.name} <${this.email}>    ${this.text}`)
        }
    }
})

function saveForm() {
    localStorage.email = gservice.email || ''
    localStorage.name = gservice.name || ''
    localStorage.text = gservice.text || ''
}
