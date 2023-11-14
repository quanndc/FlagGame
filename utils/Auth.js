import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import { ToastAndroid } from "react-native";
import React, {useState, useEffect, setState} from 'react';
import {createUser} from './Database';
GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '435780200080-grnfd4f6dkiq6qscp11rainghgb7sck6.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

});

export const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        // setState({ userInfo });
        const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

        ToastAndroid.show("Welcome " + userInfo.user.name, ToastAndroid.SHORT);
        console.log(userInfo.user);
        // console.log(userInfo.user.uid);
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log("error occured SIGN_IN_CANCELLED");
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log("error occured IN_PROGRESS");
            // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log("error occured PLAY_SERVICES_NOT_AVAILABLE");
        } else {
            console.log(error)
            console.log("error occured unknow error");
        }
    };
};

export const signOut = async () => {
    try {
        // await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        ToastAndroid.show("Logged Out", ToastAndroid.SHORT);
        return auth().signOut();
    } catch (error) {
        console.error(error);
    };
};