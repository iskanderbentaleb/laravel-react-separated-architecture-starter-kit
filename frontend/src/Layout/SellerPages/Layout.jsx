import { useEffect, useState } from "react";
import { Outlet  , useNavigate} from "react-router-dom";
import { AppShell, Burger, useMantineColorScheme } from '@mantine/core';
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

  // secure page if not login
  const [Loaded, setLoaded] = useState(false);
  const navigate = useNavigate()

  const { colorScheme } = useMantineColorScheme();
  
  const isDark = colorScheme === 'dark';

  const fetchSellerInformation = async () => {
    if(authenticated){
        await guestApi.getUser('seller')
        .then((data)=>{
            setUser(data.data.user)
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
    fetchSellerInformation()
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

      <AppShell.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' , backgroundColor:'#188163' , }}>
        
        <Burger
          opened={DahboardOpend}
          onClick={()=>setDahboardOpend(!DahboardOpend)}
          hiddenFrom="sm"
          size="sm"
          style={{ marginLeft: 10 }}
        />

        <AppLogo /> 

        <div style={{ display: 'flex', gap: 10 , margin: '0 15px' }}>
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