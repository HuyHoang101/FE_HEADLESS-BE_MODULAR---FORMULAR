import React from 'react';
import { useTabBar } from './useTabBar';

const TabBar = () => {
    const { navItems, currentPath, handleNav } = useTabBar();

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex space-x-8 h-16 items-center">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNav(item.path)}
                            className={`px-3 py-2 text-sm font-medium transition-colors ${
                                currentPath === item.path
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-blue-500'
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default TabBar;