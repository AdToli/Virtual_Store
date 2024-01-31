import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequiredUser = ({ allowedRoles }) => {
    const user = useSelector((state) => state.userState.user)
    const location = useLocation();

    return allowedRoles.includes(user?.role) ? (
        <Outlet />
    ) : user ? (
        <Navigate to='/unauthorized' state={{ from: location }} replace />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default RequiredUser;
