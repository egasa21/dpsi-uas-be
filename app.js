const express = require('express')
const logger = require('morgan')('dev')
const dotenv = require('dotenv')
const ClientError = require('./src/exception/ClientError');
const db = require('./src/models');

dotenv.config()
const app = express()

const authRouter = require('./src/routes/AuthRoutes');
const customerRouter = require('./src/routes/CustomerRoutes');
const doctorRouter = require('./src/routes/DoctorRoutes');
const petShopRouter = require('./src/routes/PetShopRoutes');
const openingHoursRouter = require('./src/routes/OpeningHourRoutes');
const productRouter = require('./src/routes/ProductRoutes');
const consultationRouter = require('./src/routes/ConsultationRoutes');
const treatmentRouter = require('./src/routes/TreatmentRoutes');

app.use(logger);
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/auth', authRouter);
app.use('/api/customers', customerRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/petshops', petShopRouter);
app.use('/api/opening-hours', openingHoursRouter);
app.use('/api/products', productRouter);
app.use('/api/consultations', consultationRouter);
app.use('/api/treatments', treatmentRouter);

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
        return res.status(err.statusCode).json({error: err.message});
    }

    // For unexpected errors
    console.error(err);
    res.status(500).json({error: 'Internal Server Error'});
});


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})