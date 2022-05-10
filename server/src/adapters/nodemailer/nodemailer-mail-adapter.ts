import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from './../mail-adapter';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "22818511a5ec41",
      pass: "06e32de4b61d91"
    }
});

export class NodemailerMailAdapter implements MailAdapter {

    async send ({subject, body}: SendMailData) {

        await transport.sendMail({
            from: 'Equipe feedback <oi@feedback.com>',
            to: 'Lucas <lucascm.frc@gmail.com',
            subject, 
            html: body
        })

    }
}