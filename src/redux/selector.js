export const getContact = state => state.contacts.items;
export const getFilter = state => state.filter.filter;
export const getState = ({ contacts }) => ({
  isLoading: contacts.isLoading,
  error: contacts.error,
});

export const selectLoading = state => state.contacts.loading;

export const getIsLoggedIn = ({ auth }) => auth.isLoggedIn;
export const getUserName = ({ auth }) => auth.user.name;
export const getIsRefreshing = ({ auth }) => auth.isRefreshing;
export const getAuthError = ({ auth }) => auth.error;
