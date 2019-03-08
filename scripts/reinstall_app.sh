for dev in `adb devices | grep -v List | cut -f1`; do
  echo "Updating ${dev}"
  adb -s ${dev} uninstall com.scoutingapp
  adb -s ${dev} install ./android/app/build/outputs/apk/release/app-release.apk
  adb -s ${dev} push sample_match_list.csv /sdcard/match_list.csv
done
