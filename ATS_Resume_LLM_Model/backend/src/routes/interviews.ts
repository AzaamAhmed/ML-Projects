/**
 * Interviews Router - Interview scheduling and management
 */

import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import mockData from '../data/mock-data.json';

const router = Router();

let interviews = [...mockData.interviews];

// Get all interviews
router.get('/', (req: Request, res: Response) => {
    let result = [...interviews];

    if (req.query.status) {
        result = result.filter(i => i.status === req.query.status);
    }

    if (req.query.candidate_id) {
        result = result.filter(i => i.candidate_id === req.query.candidate_id);
    }

    if (req.query.date) {
        result = result.filter(i => i.date === req.query.date);
    }

    // Sort by date
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.json({ success: true, count: result.length, interviews: result });
});

// Get interview by ID
router.get('/:id', (req: Request, res: Response) => {
    const interview = interviews.find(i => i.id === req.params.id);
    if (!interview) {
        return res.status(404).json({ success: false, error: 'Interview not found' });
    }

    // Enrich with candidate and job info
    const candidate = mockData.candidates.find(c => c.id === interview.candidate_id);
    const job = mockData.jobs.find(j => j.id === interview.job_id);

    res.json({
        success: true,
        interview: {
            ...interview,
            candidate_name: candidate?.name,
            job_title: job?.title
        }
    });
});

// Schedule interview
router.post('/', (req: Request, res: Response) => {
    const newInterview = {
        id: `INT-${uuidv4().slice(0, 3).toUpperCase()}`,
        ...req.body,
        status: 'Scheduled'
    };
    interviews.push(newInterview);
    res.status(201).json({ success: true, interview: newInterview });
});

// Update interview
router.put('/:id', (req: Request, res: Response) => {
    const index = interviews.findIndex(i => i.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Interview not found' });
    }
    interviews[index] = { ...interviews[index], ...req.body };
    res.json({ success: true, interview: interviews[index] });
});

// Update interview status
router.patch('/:id/status', (req: Request, res: Response) => {
    const index = interviews.findIndex(i => i.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Interview not found' });
    }
    interviews[index].status = req.body.status;
    res.json({ success: true, interview: interviews[index] });
});

// Cancel interview
router.delete('/:id', (req: Request, res: Response) => {
    const index = interviews.findIndex(i => i.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Interview not found' });
    }
    interviews.splice(index, 1);
    res.json({ success: true, message: 'Interview cancelled' });
});

// Get available time slots (mock)
router.get('/slots/:date', (req: Request, res: Response) => {
    const slots = [
        { time: '09:00 AM', available: true },
        { time: '10:00 AM', available: false },
        { time: '11:00 AM', available: true },
        { time: '01:00 PM', available: true },
        { time: '02:00 PM', available: false },
        { time: '03:00 PM', available: true },
        { time: '04:00 PM', available: true }
    ];
    res.json({ success: true, date: req.params.date, slots });
});

// Get upcoming interviews
router.get('/upcoming/:days', (req: Request, res: Response) => {
    const days = parseInt(req.params.days) || 7;
    const today = new Date();
    const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

    const upcoming = interviews.filter(i => {
        const interviewDate = new Date(i.date);
        return interviewDate >= today && interviewDate <= futureDate && i.status === 'Scheduled';
    });

    res.json({ success: true, count: upcoming.length, interviews: upcoming });
});

export default router;
