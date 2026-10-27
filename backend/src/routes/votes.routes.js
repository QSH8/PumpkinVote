import { Router } from 'express'
import { votesController } from '../controllers/votes.controller.js'

const router = Router()
router.get('/categories', votesController.getCategories)
router.get('/teams', votesController.getTeams)
router.get('/teams-by-category', votesController.getTeamsByCategory)

router.post('/submit', votesController.submitVotes)

router.get('/results', votesController.getResults)

export default router;