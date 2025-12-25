/**
 * ATS Resume Checker - Express Backend Server
 * Core API server for HR workflows and data management
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import candidatesRouter from './routes/candidates';
import jobsRouter from './routes/jobs';
import interviewsRouter from './routes/interviews';
import analyticsRouter from './routes/analytics';
import hrUsersRouter from './routes/hrUsers';

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3002'],
    credentials: true
}));
app.use(express.json());

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/candidates', candidatesRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/interviews', interviewsRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/hr-users', hrUsersRouter);

// Health check
app.get('/', (req: Request, res: Response) => {
    res.json({
        status: 'healthy',
        service: 'ATS Resume Checker Backend',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.message);
    res.status(500).json({
        success: false,
        error: err.message
    });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 ATS Backend Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
});

export default app;
