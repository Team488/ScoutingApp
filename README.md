# Getting started

Follow the instructions here to install Android Studio and React Native.

Start the app with 

    react-native run-android

This will install the dev version of the app on any connected device or simulator.

# Building the release apk

Follow the instructions in the React Native docs on [building](https://facebook.github.io/react-native/docs/signed-apk-android).

Edit `~/.gradle/gradle.properties` and add the folling (replace **** with the keystore password)

    MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
    MYAPP_RELEASE_KEY_ALIAS=my-key-alias
    MYAPP_RELEASE_STORE_PASSWORD=*****
    MYAPP_RELEASE_KEY_PASSWORD=*****

Then, do this

    cd android
    ./gradlew assembleRelease
    cd ..
    react-native run-android --variant=release

If you already have the dev version of the app installed, you might need to uninstall it with

    cd android 
    ./gradlew uninstallRelease

# TODO

- add events to log
- scoring modal
- debounce button inputs
- timer component
- delete events with confirm
- add option for lifted events
- screen that shows event log as qr code
- screen that shows summary as qr code
- alter back button behavior
    - Use https://github.com/vonovak/react-navigation-backhandler for example

- set up tslint and clang formatting
- set up circle CI
