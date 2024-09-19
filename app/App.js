import { User } from "react-native-feather";
import Navigation from "./Navigation";
import { UserProvider } from "./src/data/userContext";
export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
