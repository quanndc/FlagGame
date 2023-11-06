import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from "react-native";
import React, {useState, useEffect, setState} from 'react';
import { View, Text } from 'react-native';
import { SignIn, SignOut } from "../../utils/Auth";
export default function () {
    GoogleSignin.configure({
        // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '435780200080-grnfd4f6dkiq6qscp11rainghgb7sck6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

    });

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
                SignIn();}}
        />
    )
}
/// End of Auth.js