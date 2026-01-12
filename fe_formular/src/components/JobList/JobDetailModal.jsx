import React from 'react';

const JobDetailModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b sticky top-0 bg-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img src={job.company.logo} alt="logo" className="w-12 h-12 rounded-lg border p-1" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                            <p className="text-blue-600 font-medium">{job.company.name}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-gray-500 uppercase text-xs font-bold mb-1">Salary</p>
                            <p className="text-gray-900 font-semibold">${job.salary} USD</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <p className="text-gray-500 uppercase text-xs font-bold mb-1">Location</p>
                            <p className="text-gray-900 font-semibold">{job.location}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-3">Perks & Benefits</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {job.perks.map((perk, i) => <li key={i}>{perk}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-3">Posted Date</h4>
                        <p className="text-gray-500 text-sm italic">
                            {new Date(job.date).toLocaleDateString('vi-VN')}
                        </p>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t bg-gray-50 flex justify-end">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailModal;