import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Gift, Upload, LogIn, LogOut, Settings, Signpost } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Gift className="mr-2" /> Toy Share
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-200">Home</Link>
            </li>
            <Link to="/register" className="hover:text-blue-200 flex items-center">
                  <Signpost className="mr-1" size={18} /> Register
            </Link>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/upload" className="hover:text-blue-200 flex items-center">
                    <Upload className="mr-1" size={18} /> Upload Toy
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="hover:text-blue-200 flex items-center">
                    <Settings className="mr-1" size={18} /> Admin
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="hover:text-blue-200 flex items-center">
                    <LogOut className="mr-1" size={18} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="hover:text-blue-200 flex items-center">
                  <LogIn className="mr-1" size={18} /> Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;