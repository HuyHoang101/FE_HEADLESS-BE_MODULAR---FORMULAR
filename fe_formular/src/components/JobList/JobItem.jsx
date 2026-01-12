import React from 'react';

const JobItem = ({ job }) => (
    <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-3">
            <img src={job.company.logo} alt="logo" className="w-12 h-12 rounded object-contain border" />
            <span className="font-semibold text-gray-700">{job.company.name}</span>
        </div>
        <h3 className="text-xl font-bold text-blue-600 mb-2">{job.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">📍 {job.location} | 💰 {job.salary}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.map(skill => (
                <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
                    {skill}
                </span>
            ))}
        </div>
        
    </div>
);

export default JobItem;