import { useContext } from "react";
import AuthContext from "./AuthContext";
import Tabs from "./src/screens/Tabs";

function ProtectedWrapper(props) {
  const auth = useContext(AuthContext);
  console.log("====================================");
  console.log(auth);
  console.log("====================================");

  if (!auth.user) {
    return props.navigation.navigate("Login");
  }

  return <Tabs />;
}

export default ProtectedWrapper;