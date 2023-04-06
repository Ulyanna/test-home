import { useSelector } from 'react-redux';
import { getIsLoggedIn, getUserName, getIsRefreshing } from '../redux/selector';

export const useAuth = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);
  const user = useSelector(getUserName);

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};
