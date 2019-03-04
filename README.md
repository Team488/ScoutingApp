# Getting started

Follow the instructions [here]() to install Android Studio and React Native.

Start the app with 

    react-native run-android

This will install the dev version of the app on any connected device or simulator.
With the app running, you can run 

    adb shell input keyevent 82

to open the context menu. This will let you reload or start JS debugging.

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

# Loading match data

Create a match list with the time and a the team list in a CSV:

    Time, Red 1,Red 2,Red 3,Blue 1,Blue 2,Blue 3

Use the QR Code generator here: https://keremerkan.net/qr-code-and-2d-code-generator/

Go to Settings > Load Match and scan the code to load match data for each tablet.

# TODO

- Set which position the tablet is for and surface that in the header 
- 
- debounce button inputs
- add confirmation to delete events
- add option for lifted events
- alter back button behavior
    - Use https://github.com/vonovak/react-navigation-backhandler for example

- set up tslint and clang formatting
- set up circle CI
