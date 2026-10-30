import { Router } from 'express'
import { votesController } from '../controllers/votes.controller.js'
import multer from 'multer'
import path from 'path'
const router = Router()

// TODO ВЫНЕСТИ!
// Настройка хранилища Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'team-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage });


router.get('/categories', votesController.getCategories)
router.get('/teams', votesController.getTeams)
router.get('/teams-by-category', votesController.getTeamsByCategory)
router.get('/total', votesController.getTotalVotes)
router.get('/voted-users', votesController.getVotedUsers)

router.post('/teams/:id/upload', upload.single('photo'), votesController.uploadTeamPhoto)
router.get('/photos/:teamId', votesController.getTeamPhoto);
router.post('/submit', votesController.submitVotes)

router.get('/results', votesController.getResults)

export default router;