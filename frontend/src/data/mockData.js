// Mock Data for AI Outbound Sales Dashboard

export const metricsData = {
    qualifiedLeads: { value: 1245, trend: '+15.2%', isPositive: true },
    salesEffortSaved: { value: '320h', trend: '+5.4%', isPositive: true },
    emailsSent: { value: 8740, trend: '+22.1%', isPositive: true },
    conversionRate: { value: '8.4%', trend: '+1.2%', isPositive: true },
};

export const segmentationData = [
    { id: 1, segment: 'Enterprise SaaS', size: 450, maturity: 'High', relevantUseCase: 'Cloud Cost Optimization', aiScore: 92 },
    { id: 2, segment: 'FinTech Startups', size: 320, maturity: 'Medium', relevantUseCase: 'Fraud Detection API', aiScore: 88 },
    { id: 3, segment: 'Healthcare IT', size: 210, maturity: 'Low', relevantUseCase: 'HIPAA Compliant Data Lake', aiScore: 76 },
    { id: 4, segment: 'E-commerce Platforms', size: 550, maturity: 'High', relevantUseCase: 'Predictive Inventory', aiScore: 95 },
    { id: 5, segment: 'Logistics SMEs', size: 180, maturity: 'Medium', relevantUseCase: 'Route Optimization AI', aiScore: 82 },
];

export const campaignData = [
    { id: 101, name: 'Q3 Enterprise Cost Optimization', status: 'Active', sent: 1200, opened: 450, replied: 85, progress: 65 },
    { id: 102, name: 'FinTech API Upsell', status: 'Scheduled', sent: 0, opened: 0, replied: 0, progress: 0 },
    { id: 103, name: 'E-commerce Inventory Prediction', status: 'Completed', sent: 550, opened: 320, replied: 110, progress: 100 },
    { id: 104, name: 'Healthcare Data Lake Intro', status: 'Drafting', sent: 0, opened: 0, replied: 0, progress: 15 },
];

export const recentLeads = [
    { id: 1, name: 'Sarah Jenkins', company: 'GlobalTech Solutions', role: 'CTO', industry: 'SaaS', matchScore: 98 },
    { id: 2, name: 'David Chen', company: 'FinSecure Inc', role: 'VP Engineering', industry: 'FinTech', matchScore: 94 },
    { id: 3, name: 'Elena Rodriguez', company: 'Medidata Systems', role: 'Chief Data Officer', industry: 'Healthcare', matchScore: 89 },
    { id: 4, name: 'Michael O\'Brien', company: 'NextGen Retail', role: 'Director of Operations', industry: 'E-commerce', matchScore: 87 },
    { id: 5, name: 'James Wilson', company: 'Swift Logistics', role: 'Head of IT', industry: 'Logistics', matchScore: 85 },
];

export const dataSources = [
    { id: 1, type: 'CRM', name: 'Salesforce', status: 'Connected', lastSync: '2 hours ago' },
    { id: 2, type: 'CRM', name: 'HubSpot', status: 'Connected', lastSync: '5 mins ago' },
    { id: 3, type: 'Repository', name: 'SharePoint (Case Studies)', status: 'Connected', lastSync: '1 day ago' },
    { id: 4, type: 'Repository', name: 'Confluence (Solution Architecture)', status: 'Syncing', lastSync: 'In Progress' },
];
