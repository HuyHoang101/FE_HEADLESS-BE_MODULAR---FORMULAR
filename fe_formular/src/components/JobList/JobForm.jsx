import React, { useState, useEffect } from 'react';

const JobForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '', location: '', salaryMin: 0, salaryMax: 0, employmentType: 'Full-time'
    });

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
                <h2 className="text-xl font-bold">{initialData ? 'Edit Job' : 'Create New Job'}</h2>
                <input 
                    className="w-full p-2 border rounded" 
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                />
                <input 
                    className="w-full p-2 border rounded" 
                    placeholder="Location"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    required
                />
                <div className="flex gap-2">
                    <input 
                        type="number" className="w-1/2 p-2 border rounded" placeholder="Min Salary"
                        value={formData.salaryMin} onChange={e => setFormData({...formData, salaryMin: e.target.value})}
                    />
                    <input 
                        type="number" className="w-1/2 p-2 border rounded" placeholder="Max Salary"
                        value={formData.salaryMax} onChange={e => setFormData({...formData, salaryMax: e.target.value})}
                    />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
            </form>
        </div>
    );
};

export default JobForm;