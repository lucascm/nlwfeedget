import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

export const routes = express.Router();



routes.post('/feedback', async (req, res) => {

    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodeMailerAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodeMailerAdapter)

    await submitFeedbackUseCase.execute({ type, comment, screenshot });

   
    res.status(201).send();
})