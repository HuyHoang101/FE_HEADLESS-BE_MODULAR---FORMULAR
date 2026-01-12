import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TabBar from './components/TabBar';
import HomePage from './pages/HomePage';
import JobPage from './pages/JobPage';
import CompanyPage from './pages/CompanyPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                {/* TabBar xuất hiện ở mọi trang */}
                <TabBar />
                
                <main className="max-w-7xl mx-auto">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/jobs" element={<JobPage />} />
                        <Route path="/companies" element={<CompanyPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;