import React, { useState } from 'react';
import { useJobList } from './useJobList';
import JobItem from './JobItem';
import FilterBar from './FilterBar';
import JobForm from './JobForm';
import JobDetailModal from './JobDetailModal'; // Component mới để xem detail

const JobList = () => {
    const { 
        jobs, loading, filters, setFilters, fetchJobs, 
        handleDelete, handleSave, editingJob, setEditingJob,
        selectedJob, handleViewDetail, closeDetail
    } = useJobList();

    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Header & Add Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Available Opportunities</h2>
                <button 
                    onClick={() => { setEditingJob(null); setIsFormOpen(true); }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
                >
                    + Post a Job
                </button>
            </div>

            {/* Filter Section  */}
            <FilterBar 
                filters={filters} 
                setFilters={setFilters} 
                onSearch={(e) => { e.preventDefault(); fetchJobs(); }} 
            />

            {/* Form Create/Edit  */}
            {(isFormOpen || editingJob) && (
                <JobForm 
                    initialData={editingJob} 
                    onSave={(data) => { handleSave(data); setIsFormOpen(false); }} 
                    onCancel={() => { setIsFormOpen(false); setEditingJob(null); }} 
                />
            )}

            {/* Detail Modal  */}
            {/* Sử dụng selectedJob và closeDetail để hiển thị chi tiết [cite: 179] */}
            {selectedJob && (
                <JobDetailModal 
                    job={selectedJob} 
                    onClose={closeDetail} 
                />
            )}

            {/* Job Grid Display */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    jobs.map(job => (
                        <div key={job.id} className="relative group">
                            {/* Click vào vùng bao quanh để xem chi tiết  */}
                            <div onClick={() => handleViewDetail(job)} className="cursor-pointer">
                                <JobItem job={job} />
                            </div>

                            {/* Nút điều khiển Edit/Delete - Tách biệt để không trigger xem detail  */}
                            <div className="absolute top-4 right-4 flex gap-2 z-10">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setEditingJob(job); }} 
                                    className="p-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-xs font-bold"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }} 
                                    className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-bold"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default JobList;