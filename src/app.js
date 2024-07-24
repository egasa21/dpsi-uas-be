const express = require('express')
const logger = require('morgan')('dev')
const dotenv = require('dotenv')
const ClientError = require('./exception/ClientError');
const db = require('./models');

dotenv.config()
const app = express()

const authRouter = require('./routes/authRoutes');
const customerRouter = require('./routes/customerRoutes');
const doctorRouter = require('./routes/doctorRoutes');

app.use(logger);
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/auth', authRouter);
app.use('/api/customers', customerRouter);
app.use('/api/doctors', doctorRouter);

const syncDB = async () => {
    try {
        await db.sequelize.sync()
        console.log('Database synced successfully!')
    } catch (error) {
        console.log(error)
    }
}

// syncDB()

app.get('/', (req, res) => {
    res.json("/hello")
})

// Custom error handling

app.use((err, req, res, next) => {
    if (err instanceof ClientError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    // For unexpected errors
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})