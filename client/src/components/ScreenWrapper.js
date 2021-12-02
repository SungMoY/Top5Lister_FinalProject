import { React, useContext } from "react";
import AuthContext from '../auth'
import AppScreen from "./AppScreen";
import SplashScreen from "./SplashScreen";

export default function ScreenWrapper() {

    const { auth } = useContext(AuthContext);

    console.log("AUTH: ", auth)

    if (auth.guestMode || auth.loggedIn) {
        return (
            <AppScreen/>
        )
    } else {
        return (
        <SplashScreen/>
        )
    }
}