const { signup, login } = require('../controllers/AuthController')
const { authMiddleware } = require('../middlewares/Middleware')
const router = require('express').Router()


router.post('/signup', signup)
router.post('/login', login)

module.exports = router
