import { useEffect, useState } from "react";
import { Outlet  , useNavigate} from "react-router-dom";
import { AppShell, Burger, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import NavbarNested from './components/NavbarNested';
import UserMenu from './components/UserMenu';
import {useUserContext} from "../../context/userContext";
import { guestApi } from "../../Services/Api/guest/guestApi";
import { LOGIN_ROUTE } from "../../Router";
import AppLogo from "../../components/AppLogo";
import LanguagePicker from "../../components/LanguagePicker";
import { ThemeToggle } from "../../components/ThemeToggle";
import { themeColorDark, themeColorLight } from "../../App";


export default function Layout() {
  
  const { DahboardOpend, setDahboardOpend , authenticated , logout  , setUser } = useUserContext() ;
  
  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === 'dark';

  // secure page if not login
  const [Loaded, setLoaded] = useState(false);
  const navigate = useNavigate()

  const fetchAdminInformation = async () => {
    if(authenticated){
        await guestApi.getUser('admin')
        .then(({data})=>{
            setUser(data.user)
            setLoaded(true)
        })
        .catch((error)=>{
            console.log(error)
            logout()
            navigate(LOGIN_ROUTE)
        })
    }else{
        logout()
        navigate(LOGIN_ROUTE)
    }
  } 

  useEffect(() => {
    fetchAdminInformation()
  }, []);
  // secure page if not login



  if(Loaded === false){
    return (
      <>
        {/* Loading.... */}
      </>
    )
  }

  return (
    
    <AppShell header={{ height: 60 , display: 'flex' }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !DahboardOpend },
      }}
      padding="md"
    >

      <AppShell.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <Burger
          opened={DahboardOpend}
          onClick={()=>setDahboardOpend(!DahboardOpend)}
          hiddenFrom="sm"
          size="sm"
          style={{ marginLeft: 10 }}
        />

        <div style={{  marginLeft: 20}}>
          <AppLogo /> 
        </div>

        <div style={{ marginLeft: 'auto', marginRight: 20, display: 'flex', gap: 20 }}>
          <ThemeToggle/>
          <LanguagePicker/>
          <UserMenu />
        </div>


      </AppShell.Header>



      <AppShell.Navbar >
          <NavbarNested />
      </AppShell.Navbar>

      
      <AppShell.Main style={{ backgroundColor: isDark ? themeColorDark[7] : themeColorLight[0] }}>
        <Outlet/>
      </AppShell.Main>


    </AppShell>
  );
}