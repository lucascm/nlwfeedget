import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { send: sendMailSpy }
)
describe('Submit feedback', ()=>{
    
    
    it('should be able to submit a feedback', async ()=>{

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple',
            screenshot: 'data:image/png;base64,84848484'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()

    })
    it('should not be able to submit a feedback without type', async ()=>{

        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemple',
            screenshot: 'data:image/png;base64,84848484'
        })).rejects.toThrow();

    })
    it('should not be able to submit a feedback without comment', async ()=>{

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,84848484'
        })).rejects.toThrow();

    })
    it('should not be able to submit a feedback if not base64 image', async ()=>{

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemple',
            screenshot: 'teste.jpg'
        })).rejects.toThrow();

    })

});