import { createTransport } from 'nodemailer'

const transporter = createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASSWORD
    },
})
const receiver = (to, html) => {
    return {
        from: `"Mail Track"<${process.env.MAIL_AUTH_USER}>`,
        subject: `Mail Track`,
        to,
        html
    }
}
export const sendEmail = (to, html) => {
    return transporter.sendMail(receiver(to, html), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + to);
        }
    })
}

export const getEmail = (id, title, count) => {
    return `<p>您在 <a href="https://track.tuguobin.site/">Mail Track</a> 的邮件追踪ID为 <code>${id}</code> 的邮件，标题为 <b>${title}</b> 的邮件，被打开了 <span style="color: red;">${count}</span> 次。</p>`
}