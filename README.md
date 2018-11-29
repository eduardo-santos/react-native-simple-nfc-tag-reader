# react-native-simple-nfc-tag-reader
A simple project to show how to read a NFC tag value and print it on the device screen.

The idea of this project is to show how easy is to read a NFC tag with react native. I've written a helper class [`NFCHelper.js`](https://gist.github.com/eduardo-santos/99cfab9cbf951aca5b3038ad6c8d70c9)
to simplify the use of the the awesome [react-native-nfc-manager](https://github.com/whitedogg13/react-native-nfc-manager) library. 

The main idea of the NFCHelper class is:
1. Manage the startNFC listener with error handling.
2. Pass a reading function callback to the startNFC, so you are able to handle the reading return value the way you want.
3. Stop the NFC listener.
