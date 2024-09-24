import { createTransport } from 'nodemailer'

const transporter = createTransport({
    service: "QQ",
    auth: {
        user: '1137725646',
        pass: 'piixnjtjhrfmbabh'
    },
})
const receiver = (to, html) => {
    return {
        from: `"Mail Track"<1137725646@qq.com>`,
        subject: `Mail Track`,
        to,
        html
    }
}
export const sendEmail = (to, html) => {
    return transporter.sendMail(receiver(to, html), (err) => {
        if (err) {
            console.log('Email error: ' + err);
        } else {
            console.log('Email sent: ' + to);
        }
    })
}

export const getEmail = (id, title, count) => {
    return `<p>您在<a href="http://localhost:3000">Mail Track</a>的邮件追踪ID为 <code>${id}</code> 的邮件，标题为 <b>${title}</b> 的邮件，被打开了 <span style="color: red;">${count}</span> 次。</p>`
}