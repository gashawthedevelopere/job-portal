import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkwebhooks } from './controller/Webhooks.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
// initialize express
const app=express()
// connect to database
await connectDB()
await connectCloudinary()
// middleware
app.use(cors())
app.use(express.json())
//Routes all
app.get('/',(req,res)=>res.send('API WORKING'))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  app.post('/webhooks',clerkwebhooks)
  app.use('/api/company',companyRoutes)
  

//port
const PORT=process.env.PORT|| 5000
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);

})
// Import necessary modules
// import express from 'express';
// import cors from 'cors';
// import * as Sentry from '@sentry/node';
// import connectDB from './config/db.js'; // Import your database configuration
// import { clerkwebhooks } from './controller/Webhooks.js'; // Import your webhook controller
// import 'dotenv/config'; // Load environment variables

// // Initialize express
// const app = express();

// // Connect to MongoDB database
// await connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize Sentry
// Sentry.init({
//   dsn: "", // Add your Sentry DSN here if needed
// });

// // API routes
// app.get('/', (req, res) => res.send('API WORKING'));
// app.get('/debug-sentry', function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });
// app.post('/webhooks', clerkwebhooks);

// // Set up error handling for Sentry
// app.use(Sentry.Handlers.errorHandler());

// // Server port
// const PORT = process.env.PORT || 5000;

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });