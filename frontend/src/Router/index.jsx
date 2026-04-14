import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../Layout/guestPages/pages/NotFound'
import LandingPage from '../Layout/guestPages/pages/LandingPage'
import Login from '../Layout/guestPages/pages/Login'
import Register from '../Layout/guestPages/pages/Register'
import ForgetPassword from '../Layout/guestPages/pages/ForgetPassword'
import LayoutGuest from '../Layout/guestPages/Layout'
import LayoutAdmin from '../Layout/AdminPages/Layout'
import Dashboard from '../Layout/AdminPages/pages/Dashboard'
import Categories from '../Layout/AdminPages/pages/Categories'
import ResetPassword from '../Layout/guestPages/pages/ResetPassword'
import VerifyEmail from '../Layout/guestPages/pages/VerifyEmail'
import TwoFactorChallenge from '../Layout/guestPages/pages/TwoFactorChallenge'
import UserSettings from '../Layout/AdminPages/pages/settings'
import LayoutSeller from '../Layout/SellerPages/Layout'
import SellerDashboard from '../Layout/SellerPages/pages/Dashboard'
import SellerSettings from '../Layout/SellerPages/pages/settings'



// guest routes 
export const LANDING_ROUTE = '/'
export const LOGIN_ROUTE = '/login'
export const REGISTER_ROUTE = '/register'
export const FORGET_PASSWORD_ROUTE = '/forget-password'
export const RESET_PASSWORD_ROUTE = '/password-reset/:token'
export const VERIFY_EMAIL_ROUTE = '/verify-email'
export const TWO_FACTOR_CHALLENGE_ROUTE = '/two-factor-challenge'
// guest routes


// admin routes
export const ADMIN_BASE_ROUTE = '/admin'
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + '/dashboard'
export const ADMIN_SETTINGS_ROUTE = ADMIN_BASE_ROUTE + '/settings'
export const ADMIN_CATEGORIES_ROUTE = ADMIN_BASE_ROUTE + '/categories'
// admin routes


// sellers routes
export const SELLER_BASE_ROUTE = '/seller'
export const SELLER_DASHBOARD_ROUTE = SELLER_BASE_ROUTE + '/dashboard/'
export const SELLER_SETTINGS_ROUTE = SELLER_BASE_ROUTE + '/settings'
// sellers routes


export const router = createBrowserRouter([

    // shared with all => users / guest
    {
        element: <LayoutGuest />,
        children: [
            {
                path: '*',
                element: <NotFound />
            },
            {
                path: LANDING_ROUTE,
                element: <LandingPage />
            },
            {
                path: LOGIN_ROUTE,
                element: <Login />
            },
            {
                path: REGISTER_ROUTE,
                element: <Register />
            },
            {
                path: FORGET_PASSWORD_ROUTE,
                element: <ForgetPassword />
            },
            {
                path: RESET_PASSWORD_ROUTE,
                element: <ResetPassword />
            },
            {
                path: VERIFY_EMAIL_ROUTE,
                element: <VerifyEmail />
            },
            {
                path: TWO_FACTOR_CHALLENGE_ROUTE,
                element: <TwoFactorChallenge />
            },
        ]
    },

    // shared with all => users
    {
        element: <LayoutAdmin />,
        children: [
            {
                path: ADMIN_DASHBOARD_ROUTE,
                element: <Dashboard />
            },
            {
                path: ADMIN_SETTINGS_ROUTE,
                element: <UserSettings />
            },
            {
                path: ADMIN_CATEGORIES_ROUTE,
                element: <Categories />
            },
        ]
    },

    // shared with all =>  seller
    {
        element: <LayoutSeller />,
        children: [
            {
                path: SELLER_DASHBOARD_ROUTE,
                element: <SellerDashboard />
            },
            {
                path: SELLER_SETTINGS_ROUTE,
                element: <SellerSettings />
            },
        ]
    },

])
