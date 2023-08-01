import {useContext} from 'react';

import {ApiContext, AuthContext} from '../contexts';

export const useAuth = () => useContext(AuthContext);

export const useApi = () => {
    return useContext(ApiContext);
};
