# react-native-simple-nfc-tag-reader
A simple project to show how to read a NFC tag value and print it on the device screen.

The idea of this project is to show how easy is to read a NFC tag with react native. I've written a helper class [`NFCHelper.js`](https://gist.github.com/eduardo-santos/99cfab9cbf951aca5b3038ad6c8d70c9)
to simplify the use of the the awesome [react-native-nfc-manager](https://github.com/whitedogg13/react-native-nfc-manager) library. 

The main ideas of the NFCHelper class are:
1. Easy manage the startNFC listener with error handling.
2. Pass a reading function callback to the startNFC, so you are able to handle the reading return value the way you want.
3. Stop the NFC listener easily.

I've written a [medium post](https://medium.com/@eduardo.hensantos/leitura-de-tags-nfc-com-react-native-4bb015e8d718) (in portuguese language) to show more detailed information about NFC and this project. Check it out.

## Run The Project
Clone this repository and run the command:
```shell
npm install
```
and then link the `react-native-nfc-manager` library with the command:
```shell
react-native link react-native-nfc-manager
```

## Use Case Example
```javascript
componentWillMount() {
  startNFC(this.handleNFCTagReading);
}

componentWillUnmount() {
  stopNFC();
}

handleNFCTagReading = nfcResult => {
  if (nfcResult.Error) {
    console.log(`Error title: ${nfcResult.Error.Title}`);
    console.log(`Error description: ${nfcResult.Error.Message}`);
  } else {
    console.log(`Tag value found: ${nfcResult.tagValue}`);
  }
};
```
