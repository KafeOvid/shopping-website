import { Link } from 'react-router-dom';
import '../assets/notFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="back-home-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
 