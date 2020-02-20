# Getting started

Follow the instructions [here]() to install Android Studio and React Native.

Start the app with 

    react-native start&
    react-native run-android

This will install the dev version of the app on any connected device or simulator. WARNING: You
have to run `start` *before* running `run-android`. If you do it the other way, the app will
get stuck on a white screen (see [react-native#26605](https://github.com/facebook/react-native/issues/26605))

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

The app should load match data on start, but you can also reload the data from Settings -> Load Data.

To push the sample match data to the device, run

    adb push sample_match_list.csv /sdcard/match_list.csv

# Versions

React Native: 0.61.5
MobX: 5.0

React Native includes a faster JS engine, called Hermes. Unfortunately, Hermes is
incompatible with MobX 5.0 ([see this](https://github.com/facebook/hermes/issues/28)).
Instead, we're using v8 with https://github.com/Kudo/react-native-v8

IMPORTANT: Because we're doing something nonstandard and using v8 instead of JSCore,
it's possible we could have weird issues.

# TODO
- Convert eventList to flatlist, or at least to a fixed list
- debounce button inputs
- Separate undo/redo button?

- benchmark AsyncStorage vs https://github.com/FidMe/react-native-fast-storage
- add confirmation to delete events
- add option for lifted events
- alter back button behavior
    - Use https://github.com/vonovak/react-navigation-backhandler for example

- set up tslint and clang formatting
- set up circle CI
