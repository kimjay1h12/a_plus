import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import GlobalProvider, { GlobalContext } from "./context";
import ScreenSwicher from "./screens/ScreenSwitcher";
export default function App({ loggedIn }) {
  const RootStack = createNativeStackNavigator();
  const { themeState, themeDispatch } = useContext(GlobalContext);

  return (
    <GlobalProvider>
      <ScreenSwicher />
    </GlobalProvider>
  );
}
