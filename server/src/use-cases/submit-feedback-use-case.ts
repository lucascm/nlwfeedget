import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from './../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?:string;
}

export class SubmitFeedbackUseCase {
    

    constructor(
        private feedbacksRepository:FeedbacksRepository,
        private mailAdapter: MailAdapter ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {

        const { type, comment, screenshot } = request;
        if (!type) throw new Error('Type is required');
        if (!comment) throw new Error('Comment is required');
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }
        await this.feedbacksRepository.create({
            type, comment, screenshot
        })
        await this.mailAdapter.send({
            subject: 'novo feedback',
            body: [
                '<div>',
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}`,
                screenshot ? `<img src="${screenshot}">`: '',
                '</div>'
                ].join('\n')
        })
    }
}
 // await transport.sendMail({
    //     from: 'Equipe feedback <oi@feedback.com>',
    //     to: 'Lucas <lucascm.frc@gmail.com',
    //     subject: 'Novo feedback', 
    //     html: [
    //         '<div>',
    //         `<p>Tipo do feedback: ${type}</p>`,
    //         `<p>Comentário: ${comment}`,
    //         '</div>'
    //     ].join('\n')
    // })