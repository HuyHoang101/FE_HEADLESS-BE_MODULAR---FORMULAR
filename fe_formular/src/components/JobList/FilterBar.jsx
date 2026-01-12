import React from 'react';

const FilterBar = ({ filters, setFilters, onSearch }) => {
    const types = ['Full-time', 'Part-time', 'Internship', 'Contract'];

    return (
        <form onSubmit={onSearch} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Title */}
                <input 
                    type="text"
                    placeholder="Search job title..."
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
                {/* Location */}
                <input 
                    type="text"
                    placeholder="Location (City or Country)..."
                    className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
                {/* Search Button */}
                <button type="submit" className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                    Search Jobs
                </button>
            </div>
            
            {/* Employment Type Filter  */}
            <div className="flex flex-wrap gap-4 pt-2">
                {types.map(type => (
                    <label key={type} className="flex items-center space-x-2 text-sm text-gray-600">
                        <input 
                            type="checkbox"
                            className="w-4 h-4 text-blue-600"
                            checked={filters.type.includes(type)}
                            onChange={(e) => {
                                const newTypes = e.target.checked 
                                    ? [...filters.type, type]
                                    : filters.type.filter(t => t !== type);
                                setFilters({...filters, type: newTypes});
                            }}
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
        </form>
    );
};

export default FilterBar;