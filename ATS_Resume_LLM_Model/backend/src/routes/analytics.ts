/**
 * Analytics Router - HR analytics and metrics
 */

import { Router, Request, Response } from 'express';
import mockData from '../data/mock-data.json';

const router = Router();

// Get dashboard overview
router.get('/overview', (req: Request, res: Response) => {
    const analytics = mockData.analytics;

    res.json({
        success: true,
        overview: {
            total_candidates: analytics.total_candidates,
            active_jobs: analytics.active_jobs,
            interviews_scheduled: analytics.interviews_scheduled,
            offers_extended: analytics.offers_extended,
            avg_ats_score: analytics.avg_ats_score,
            avg_time_to_hire: analytics.avg_time_to_hire
        }
    });
});

// Get hiring pipeline
router.get('/pipeline', (req: Request, res: Response) => {
    res.json({
        success: true,
        pipeline: mockData.analytics.pipeline
    });
});

// Get source breakdown
router.get('/sources', (req: Request, res: Response) => {
    const sources = Object.entries(mockData.analytics.source_breakdown).map(([source, count]) => ({
        source,
        count,
        percentage: Math.round((count as number / mockData.analytics.total_candidates) * 100)
    }));

    res.json({ success: true, sources });
});

// Get monthly applications trend
router.get('/trends/applications', (req: Request, res: Response) => {
    res.json({
        success: true,
        trend: mockData.analytics.monthly_applications
    });
});

// Get ATS score distribution
router.get('/scores/distribution', (req: Request, res: Response) => {
    const candidates = mockData.candidates;

    const distribution = {
        excellent: candidates.filter(c => c.ats_score >= 80).length,
        good: candidates.filter(c => c.ats_score >= 60 && c.ats_score < 80).length,
        fair: candidates.filter(c => c.ats_score >= 40 && c.ats_score < 60).length,
        poor: candidates.filter(c => c.ats_score < 40).length
    };

    res.json({ success: true, distribution });
});

// Get recommendation breakdown
router.get('/recommendations', (req: Request, res: Response) => {
    const candidates = mockData.candidates;

    const breakdown = {
        hire: candidates.filter(c => c.recommendation === 'Hire').length,
        review: candidates.filter(c => c.recommendation === 'Review').length,
        reject: candidates.filter(c => c.recommendation === 'Reject').length
    };

    res.json({ success: true, breakdown });
});

// Get department stats
router.get('/departments', (req: Request, res: Response) => {
    const jobs = mockData.jobs;
    const departments = [...new Set(jobs.map(j => j.department))];

    const stats = departments.map(dept => {
        const deptJobs = jobs.filter(j => j.department === dept);
        return {
            department: dept,
            active_jobs: deptJobs.filter(j => j.status === 'Active').length,
            total_applicants: deptJobs.reduce((sum, j) => sum + j.applicants, 0),
            shortlisted: deptJobs.reduce((sum, j) => sum + j.shortlisted, 0)
        };
    });

    res.json({ success: true, departments: stats });
});

// Get time-to-hire metrics
router.get('/time-to-hire', (req: Request, res: Response) => {
    res.json({
        success: true,
        metrics: {
            average_days: 18,
            by_department: {
                'Data Science': 21,
                'Engineering': 16,
                'Product': 20,
                'Infrastructure': 15
            },
            trend: [
                { month: 'Jul', days: 22 },
                { month: 'Aug', days: 20 },
                { month: 'Sep', days: 19 },
                { month: 'Oct', days: 18 },
                { month: 'Nov', days: 17 },
                { month: 'Dec', days: 18 }
            ]
        }
    });
});

// Get diversity metrics (anonymized)
router.get('/diversity', (req: Request, res: Response) => {
    res.json({
        success: true,
        note: 'Metrics are based on anonymized and aggregated data',
        metrics: {
            screening_pass_rate: 0.57,
            interview_to_offer_rate: 0.35,
            departments_with_diverse_candidates: 4,
            bias_free_screening_enabled: true
        }
    });
});

export default router;
