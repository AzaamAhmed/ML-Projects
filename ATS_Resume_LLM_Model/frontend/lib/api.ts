/**
 * API Client for connecting frontend to backend services
 */

const ML_SERVICE_URL = process.env.NEXT_PUBLIC_ML_SERVICE_URL || 'http://localhost:8000';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

// Generic fetch wrapper with error handling
async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// ML Service API
export const mlApi = {
    // Resume endpoints
    parseResume: (resumeText: string, anonymize = true) =>
        fetchAPI(`${ML_SERVICE_URL}/api/resume/parse`, {
            method: 'POST',
            body: JSON.stringify({ resume_text: resumeText, anonymize }),
        }),

    analyzeResume: (resumeText: string, jobDescription?: string) =>
        fetchAPI(`${ML_SERVICE_URL}/api/resume/analyze`, {
            method: 'POST',
            body: JSON.stringify({
                resume_text: resumeText,
                job_description: jobDescription,
                anonymize: true,
            }),
        }),

    // Scoring endpoints
    getATSScore: (resumeText: string, jobDescription?: string) =>
        fetchAPI(`${ML_SERVICE_URL}/api/scoring/score`, {
            method: 'POST',
            body: JSON.stringify({
                resume_text: resumeText,
                job_description: jobDescription,
            }),
        }),

    // Matching endpoints
    matchResumeToJob: (resumeText: string, jobDescription: object) =>
        fetchAPI(`${ML_SERVICE_URL}/api/matching/match`, {
            method: 'POST',
            body: JSON.stringify({
                resume_text: resumeText,
                job_description: jobDescription,
            }),
        }),

    // Suggestions endpoints
    getSuggestions: (resumeText: string, jobDescription?: string) =>
        fetchAPI(`${ML_SERVICE_URL}/api/suggestions/generate`, {
            method: 'POST',
            body: JSON.stringify({
                resume_text: resumeText,
                job_description: jobDescription,
            }),
        }),

    // Sample data
    getSampleResumes: () => fetchAPI(`${ML_SERVICE_URL}/api/resume/samples`),
    getSampleJobs: () => fetchAPI(`${ML_SERVICE_URL}/api/matching/sample-jobs`),
};

// Backend API
export const backendApi = {
    // Candidates
    getCandidates: (params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return fetchAPI(`${BACKEND_URL}/api/candidates${queryString}`);
    },

    getCandidate: (id: string) =>
        fetchAPI(`${BACKEND_URL}/api/candidates/${id}`),

    createCandidate: (data: object) =>
        fetchAPI(`${BACKEND_URL}/api/candidates`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateCandidate: (id: string, data: object) =>
        fetchAPI(`${BACKEND_URL}/api/candidates/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    updateCandidateStatus: (id: string, status: string, notes?: string) =>
        fetchAPI(`${BACKEND_URL}/api/candidates/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, notes }),
        }),

    // Jobs
    getJobs: (params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return fetchAPI(`${BACKEND_URL}/api/jobs${queryString}`);
    },

    getJob: (id: string) =>
        fetchAPI(`${BACKEND_URL}/api/jobs/${id}`),

    createJob: (data: object) =>
        fetchAPI(`${BACKEND_URL}/api/jobs`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getJobStats: (id: string) =>
        fetchAPI(`${BACKEND_URL}/api/jobs/${id}/stats`),

    // Interviews
    getInterviews: (params?: Record<string, string>) => {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return fetchAPI(`${BACKEND_URL}/api/interviews${queryString}`);
    },

    scheduleInterview: (data: object) =>
        fetchAPI(`${BACKEND_URL}/api/interviews`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getAvailableSlots: (date: string) =>
        fetchAPI(`${BACKEND_URL}/api/interviews/slots/${date}`),

    // Analytics
    getAnalyticsOverview: () =>
        fetchAPI(`${BACKEND_URL}/api/analytics/overview`),

    getPipeline: () =>
        fetchAPI(`${BACKEND_URL}/api/analytics/pipeline`),

    getSources: () =>
        fetchAPI(`${BACKEND_URL}/api/analytics/sources`),

    getApplicationTrends: () =>
        fetchAPI(`${BACKEND_URL}/api/analytics/trends/applications`),

    getScoreDistribution: () =>
        fetchAPI(`${BACKEND_URL}/api/analytics/scores/distribution`),

    // HR Users
    getCurrentUser: () =>
        fetchAPI(`${BACKEND_URL}/api/hr-users/me/profile`),
};

export default { mlApi, backendApi };
