import { Router } from 'express';
import { votesController } from '../controllers/votes.controller.js';

const router = Router();

router.post('/submit', votesController.submitVotes);
router.get('/results', votesController.getResults);

export default router;