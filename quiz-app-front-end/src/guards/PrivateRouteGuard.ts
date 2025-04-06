import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JSX, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isLoggedIn } = useContext(AuthContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // If not logged in, return null or a loading state
  if (!isLoggedIn) {
    return null; // or you can return a loading spinner
  }

  return element; // Render the protected component
};

export default ProtectedRoute;