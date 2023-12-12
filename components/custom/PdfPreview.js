import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import WebView from "react-native-webview";

const PDFPreloader = ({ pdfUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      <WebView
        source={{ uri: pdfUrl }}
        onLoadEnd={handleLoadEnd}
        style={{ flex: isLoading ? 0 : 1, opacity: isLoading ? 0 : 1 }}
      />
    </View>
  );
};

export default PDFPreloader;
