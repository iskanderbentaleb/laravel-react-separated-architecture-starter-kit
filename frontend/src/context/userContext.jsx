import { createContext, useContext, useState } from 'react';
import { guestApi } from '../Services/Api/guest/guestApi';

// inisial values context
export const UserStateContext = createContext({
    DahboardOpend: false, // this for the admin , seller dashborad when screen is small so we can close it 
    setDahboardOpend: () => { },
    User: '',
    setUser: () => {},
    UserRole : '',
    setUserRole : () => {},
    logout: () => {},
    login: () => {},
    register: () => {},
    forgotPassword: () => {},   
    resetPassword: () => {},
    setLanguage: () => {},
    authenticated: false,
    setAuthenticated: () => { },
    setToken: () => { },
});


export default function UserContext({ children }) {

    // tretment context values
    const [DahboardOpend, setDahboardOpend] = useState(false);

    const [User, setUser] = useState();
    const [authenticated, _setauthenticated] = useState('true' === window.localStorage.getItem('AUTH'));
    const [UserRole , _setUserRole] = useState(window.localStorage.getItem('Role') || '');

    const setToken = (Token) => {
        window.localStorage.setItem('Token', Token)
    }

    const setUserRole = (Role) => {
        _setUserRole(Role)
        window.localStorage.setItem('Role', Role)
    }   

    const setAuthenticated = (isAuth) => {
        _setauthenticated(isAuth)
        window.localStorage.setItem('AUTH', isAuth)
    }


    const login = async (email, password) => {
        await guestApi.getCsrfToken()
        return await guestApi.login(email, password)
    }

    const register = async (name, email, password, password_confirmation) => {
        await guestApi.getCsrfToken()
        return await guestApi.register(name, email, password, password_confirmation)
    }

    const forgotPassword = async (email) => {
        await guestApi.getCsrfToken()
        return await guestApi.forgotPassword(email)
    }

    const resetPassword = async ({ token, email, password , password_confirmation }) => {
        await guestApi.getCsrfToken()
        return await guestApi.resetPassword({ token, email, password , password_confirmation })
    }

    const logout = async () => {
        setAuthenticated(false)
        setUserRole('')
        window.localStorage.removeItem('AUTH') // remove local storage
        window.localStorage.removeItem('Token') // remove local storage
        window.localStorage.removeItem('Role') // remove local storage
        setUser({})
    }


    // this to save language of backend 
    // when u change the front language change the backend 
    const setLocale = (locale) => {
        localStorage.setItem('locale', locale);
    }


    // share context with All App
    return (
        <>
            <UserStateContext.Provider 
            value={{ 
                    DahboardOpend, 
                    setDahboardOpend, 
                    User, 
                    setUser, 
                    logout, 
                    login , 
                    register, 
                    forgotPassword,
                    resetPassword,
                    authenticated, 
                    setAuthenticated, 
                    setToken, 
                    setLocale , 
                    UserRole , 
                    setUserRole
                }}>
                {children}
            </UserStateContext.Provider>
        </>
    )

}

// export to other component that we need
// => we use it like this : const { User , setUser } = useUserContext()  the we retrive data
export const useUserContext = () => useContext(UserStateContext); // it shoub be inside function

