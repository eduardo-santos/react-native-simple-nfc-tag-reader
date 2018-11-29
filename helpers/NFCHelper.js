import NfcManager, { Ndef } from "react-native-nfc-manager";

let hasStartedNFC = false;

const decodeNdefRecord = record => {
  if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
    return ["text", Ndef.text.decodePayload(record.payload)];
  }
  if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
    return ["uri", Ndef.uri.decodePayload(record.payload)];
  }

  return ["unknown", "---"];
};

const registerTagEvent = (callback = null) => {
  NfcManager.registerTagEvent(tag => {
    let parsed = null;
    if (tag.ndefMessage && tag.ndefMessage.length > 0) {
      const ndefRecords = tag.ndefMessage;
      parsed = ndefRecords.map(decodeNdefRecord);
    }
    if (callback) {
      callback({ tagValue: parsed[0][1] });
    }
  });
};

const unregisterTagEvent = () => {
  NfcManager.unregisterTagEvent();
};

const startNFCManager = async () =>
  NfcManager.start()
    .then(result => ({
      Success: `Sucesso ${result}`
    }))
    .catch(error => ({ Error: error }));

const stopNFCManager = () => {
  NfcManager.stop();
};

export const isNFCSupported = async () => NfcManager.isSupported();

export const startNFC = async callback => {
  const isSupported = await isNFCSupported();

  if (isSupported) {
    const startResult = await startNFCManager();

    if (startResult.Success) {
      registerTagEvent(callback);
      hasStartedNFC = true;
      return true;
    }
    return callback({
      Error: {
        Title: "Ocorreu um erro ao iniciar o NFC Manager",
        Message: startResult.Error
      }
    });
  }
  return callback({
    Error: {
      Title: "Dispositivo sem suporte para NFC",
      Message:
        "O seu dispositivo não possui suporte para leitura da tag NFC. Tente outro dispositivo."
    }
  });
};

export const stopNFC = () => {
  if (hasStartedNFC) {
    unregisterTagEvent();
    stopNFCManager();
    hasStartedNFC = false;
  }
};
