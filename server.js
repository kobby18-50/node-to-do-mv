import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import 'express-async-errors'

import connectDB from './db/connect.js'

// routes import
import todoroutes from './routes/taskRoutes.js'
import authRoutes from './routes/authRoutes.js'

// middleware imports
import notFoundMiddleWare from './middleware/not-found.js'
import errorHandlerMiddleWare from './middleware/error-handler.js'
import authenticatedUser from './middleware/authentication.js'
dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

// routes
app.get('/', (req,res) => {
    res.send('Homepage')
})


app.use('/api/v1/todo', authenticatedUser, todoroutes )
app.use('/api/v1/auth', authRoutes )

// middleware
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3000

const start = async () => {
   try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
   } catch (error) {
    console.log(error)
   }
}

start()