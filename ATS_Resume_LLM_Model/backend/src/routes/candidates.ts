/**
 * Candidates Router - CRUD operations for candidate management
 */

import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import mockData from '../data/mock-data.json';

const router = Router();

// In-memory data store
let candidates = [...mockData.candidates];

// Get all candidates with filtering
router.get('/', (req: Request, res: Response) => {
    let result = [...candidates];

    // Filter by status
    if (req.query.status) {
        result = result.filter(c => c.status === req.query.status);
    }

    // Filter by recommendation
    if (req.query.recommendation) {
        result = result.filter(c => c.recommendation === req.query.recommendation);
    }

    // Filter by job
    if (req.query.job_id) {
        result = result.filter(c => c.applied_job_id === req.query.job_id);
    }

    // Search by name or skills
    if (req.query.search) {
        const search = (req.query.search as string).toLowerCase();
        result = result.filter(c =>
            c.name.toLowerCase().includes(search) ||
            c.skills.some(s => s.toLowerCase().includes(search))
        );
    }

    // Sort
    if (req.query.sort === 'ats_score') {
        result.sort((a, b) => b.ats_score - a.ats_score);
    } else if (req.query.sort === 'date') {
        result.sort((a, b) => new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime());
    }

    res.json({
        success: true,
        count: result.length,
        candidates: result
    });
});

// Get candidate by ID
router.get('/:id', (req: Request, res: Response) => {
    const candidate = candidates.find(c => c.id === req.params.id);

    if (!candidate) {
        return res.status(404).json({ success: false, error: 'Candidate not found' });
    }

    res.json({ success: true, candidate });
});

// Create new candidate
router.post('/', (req: Request, res: Response) => {
    const newCandidate = {
        id: `CAND-${uuidv4().slice(0, 8).toUpperCase()}`,
        ...req.body,
        applied_date: new Date().toISOString().split('T')[0],
        status: 'Applied',
        recommendation: 'Review',
        ats_score: req.body.ats_score || 0,
        match_score: req.body.match_score || 0
    };

    candidates.push(newCandidate);

    res.status(201).json({ success: true, candidate: newCandidate });
});

// Update candidate
router.put('/:id', (req: Request, res: Response) => {
    const index = candidates.findIndex(c => c.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Candidate not found' });
    }

    candidates[index] = { ...candidates[index], ...req.body };

    res.json({ success: true, candidate: candidates[index] });
});

// Update candidate status
router.patch('/:id/status', (req: Request, res: Response) => {
    const index = candidates.findIndex(c => c.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Candidate not found' });
    }

    candidates[index].status = req.body.status;
    if (req.body.notes) {
        candidates[index].notes = req.body.notes;
    }

    res.json({ success: true, candidate: candidates[index] });
});

// Delete candidate
router.delete('/:id', (req: Request, res: Response) => {
    const index = candidates.findIndex(c => c.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ success: false, error: 'Candidate not found' });
    }

    candidates.splice(index, 1);

    res.json({ success: true, message: 'Candidate deleted' });
});

// Get candidate rankings for a job
router.get('/rankings/:job_id', (req: Request, res: Response) => {
    const jobCandidates = candidates
        .filter(c => c.applied_job_id === req.params.job_id)
        .sort((a, b) => b.ats_score - a.ats_score)
        .map((c, index) => ({
            rank: index + 1,
            id: c.id,
            name: c.name,
            ats_score: c.ats_score,
            match_score: c.match_score,
            recommendation: c.recommendation,
            experience_years: c.experience_years,
            skills: c.skills.slice(0, 5)
        }));

    res.json({ success: true, rankings: jobCandidates });
});

export default router;
