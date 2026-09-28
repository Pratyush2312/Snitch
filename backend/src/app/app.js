import express from 'express';
import authRoutes from '../routes/auth.route.js';
import cookieParser from 'cookie-parser';
import productsRoutes from '../routes/product.route.js';
import cartRoutes from '../routes/cart.route.js';
import cors from 'cors'
import { config } from '../config/config.js';
export const app = express();
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.json({message:"Server Running"}));

app.use('/api/auth', authRoutes);
app.use('/api', productsRoutes);
app.use('/api/cart', cartRoutes);