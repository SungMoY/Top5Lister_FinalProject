import './App.css';
import { React } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store';
import theme from './theme';
import { ThemeProvider} from '@mui/material';
import {
    AppBanner,
    LoginScreen,
    RegisterScreen,
    ScreenWrapper,
    AppScreen,
    SplashScreen
} from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/


const App = () => {
    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={SplashScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/app" exact component={AppScreen} />
                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
        </ThemeProvider>
    )
}
export default App
/*
    Switch
    StatusBar
GlobalStoreContextProvider
*/