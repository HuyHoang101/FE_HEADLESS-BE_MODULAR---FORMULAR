import { useNavigate, useLocation } from 'react-router-dom';

export const useTabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Jobs', path: '/jobs' },
        { name: 'Companies', path: '/companies' },
    ];

    const handleNav = (path) => {
        navigate(path);
    };

    return { navItems, currentPath: location.pathname, handleNav };
};