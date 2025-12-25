/**
 * HR Users Router - HR user management
 */

import { Router, Request, Response } from 'express';
import mockData from '../data/mock-data.json';

const router = Router();

let hrUsers = [...mockData.hr_users];

// Get all HR users
router.get('/', (req: Request, res: Response) => {
    res.json({ success: true, users: hrUsers });
});

// Get HR user by ID
router.get('/:id', (req: Request, res: Response) => {
    const user = hrUsers.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, user });
});

// Get current user (mock auth)
router.get('/me/profile', (req: Request, res: Response) => {
    res.json({
        success: true,
        user: hrUsers[0],
        permissions: ['view_candidates', 'manage_jobs', 'schedule_interviews', 'view_analytics']
    });
});

export default router;
