const path = '/api/v1';

export default {
    loginPath: () => [path, 'login'].join('/'),
    signupPath: () => [path, 'signup'].join('/'),
    dataPath: () => [path, 'data'].join('/'),
    chatPagePath: () => '/',
    loginPagePath: () => '/login',
    signupPagePath: () => '/signup',
};