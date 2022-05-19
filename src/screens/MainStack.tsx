import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

type ServerResponse = {
  result: "success" | "fail";
  message: string;
};

export default function MainStack() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [isReady, setReady] = useState(true);
  const [cameraDirection, setCameraDirection] = useState<"front" | "back">("back");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleCameraDirection = () => {
    if (cameraDirection === "back") {
      setCameraDirection("front");
    } else {
      setCameraDirection("back");
    }
  };

  const handleResponse = (res: ServerResponse) => {
    switch (res.result) {
      case "success":
        Toast.show({
          type: "success",
          text1: res.message,
        });
        break;
      case "fail":
        Toast.show({
          type: "error",
          text1: res.message,
        });
    }
  };

  const sendRequestToServer = (code: string) => {
    console.log(code);
    fetch(`${process.env.API_URI}?method=QRCheckIn&num=${code}`)
      .then(res => res.json())
      .then(handleResponse);
  };

  const handleBarCodeScanned: BarCodeScannedCallback = ({ data }) => {
    if (!isReady) {
      return;
    }

    setReady(false);

    sendRequestToServer(data);

    setTimeout(() => {
      setReady(true);
    }, 3000);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        type={cameraDirection}
        style={StyleSheet.absoluteFillObject}
      />
      <SafeAreaView style={styles.buttonContainer}>
        <Button title="카메라 전환" onPress={toggleCameraDirection} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: 12,
    right: 14,
  },
});
