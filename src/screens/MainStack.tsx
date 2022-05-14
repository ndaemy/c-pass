import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function MainStack() {
  const [hasPermission, setHasPermission] = useState(null);
  const [barCode, setBarCode] = useState("");
  const [isReady, setReady] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ data }) => {
    if (!isReady) {
      return;
    }

    if (data === barCode) {
      Toast.show({
        type: "error",
        text1: `${data}는 이미 처리되었습니다.`,
      });
      return;
    }

    setReady(false);
    setBarCode(data);
    Toast.show({
      type: "info",
      text1: `${data}가 읽혔습니다.`,
      visibilityTime: 3000,
    });

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
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
