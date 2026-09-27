import express from 'express';
import authRoutes from '../routes/auth.route.js';
import cookieParser from 'cookie-parser';
import productsRoutes from '../routes/product.route.js';
import cartRoutes from '../routes/cart.route.js';
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api', productsRoutes);
app.use('/api/cart', cartRoutes);