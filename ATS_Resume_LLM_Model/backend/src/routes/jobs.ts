/**
 * Jobs Router - CRUD operations for job postings
 */

import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import mockData from '../data/mock-data.json';

const router = Router();

let jobs = [...mockData.jobs];

// Get all jobs
router.get('/', (req: Request, res: Response) => {
    let result = [...jobs];

    if (req.query.status) {
        result = result.filter(j => j.status === req.query.status);
    }

    if (req.query.department) {
        result = result.filter(j => j.department === req.query.department);
    }

    res.json({ success: true, count: result.length, jobs: result });
});

// Get job by ID
router.get('/:id', (req: Request, res: Response) => {
    const job = jobs.find(j => j.id === req.params.id);
    if (!job) {
        return res.status(404).json({ success: false, error: 'Job not found' });
    }
    res.json({ success: true, job });
});

// Create job
router.post('/', (req: Request, res: Response) => {
    const newJob = {
        id: `JOB-${uuidv4().slice(0, 3).toUpperCase()}`,
        ...req.body,
        posted_date: new Date().toISOString().split('T')[0],
        status: 'Active',
        applicants: 0,
        shortlisted: 0
    };
    jobs.push(newJob);
    res.status(201).json({ success: true, job: newJob });
});

// Update job
router.put('/:id', (req: Request, res: Response) => {
    const index = jobs.findIndex(j => j.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Job not found' });
    }
    jobs[index] = { ...jobs[index], ...req.body };
    res.json({ success: true, job: jobs[index] });
});

// Close job
router.patch('/:id/close', (req: Request, res: Response) => {
    const index = jobs.findIndex(j => j.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Job not found' });
    }
    jobs[index].status = 'Closed';
    res.json({ success: true, job: jobs[index] });
});

// Delete job
router.delete('/:id', (req: Request, res: Response) => {
    const index = jobs.findIndex(j => j.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Job not found' });
    }
    jobs.splice(index, 1);
    res.json({ success: true, message: 'Job deleted' });
});

// Get job statistics
router.get('/:id/stats', (req: Request, res: Response) => {
    const job = jobs.find(j => j.id === req.params.id);
    if (!job) {
        return res.status(404).json({ success: false, error: 'Job not found' });
    }

    const candidates = mockData.candidates.filter(c => c.applied_job_id === job.id);

    res.json({
        success: true,
        stats: {
            total_applicants: candidates.length,
            avg_ats_score: candidates.length > 0
                ? Math.round(candidates.reduce((sum, c) => sum + c.ats_score, 0) / candidates.length)
                : 0,
            by_status: {
                shortlisted: candidates.filter(c => c.status === 'Shortlisted').length,
                interview: candidates.filter(c => c.status === 'Interview Scheduled').length,
                rejected: candidates.filter(c => c.status === 'Rejected').length
            },
            by_recommendation: {
                hire: candidates.filter(c => c.recommendation === 'Hire').length,
                review: candidates.filter(c => c.recommendation === 'Review').length,
                reject: candidates.filter(c => c.recommendation === 'Reject').length
            }
        }
    });
});

export default router;
