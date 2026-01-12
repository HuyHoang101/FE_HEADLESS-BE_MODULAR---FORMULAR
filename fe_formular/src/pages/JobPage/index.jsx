import React from 'react';
import JobList from '../../components/JobList';

const JobPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <header className="mb-10 text-left">
                    <h1 className="text-3xl font-extrabold text-gray-900">Explore Opportunities</h1>
                    <p className="text-gray-600">Find your next role in the tech industry.</p>
                </header>

                {/* Gọi Component JobList đã tích hợp sẵn Filter và Search */}
                <JobList />
            </div>
        </div>
    );
};

export default JobPage;