import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
const LoginButton = () => {
  const { authorize } = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log in" />
}

const LogoutButton = () => {
  const {clearSession} = useAuth0();

  const onPress = async () => {
      try {
          await clearSession();
      } catch (e) {
          console.log(e);
      }
  };

  return <Button onPress={onPress} title="Log out" />
}

export default function App() {
  return (
    <Auth0Provider domain={"dev-rk0fl88jinxofajt.us.auth0.com"} clientId={"FylS8wC7JHGPyfeCYaSeXhEp5q1HRzaI"}>
      {/* your application */}
      <View style={styles.container}>
        <LoginButton />
        <Text>Open up App.tsx to start working on your app! test</Text>
        <LogoutButton />
        <StatusBar style="auto" />
      </View>
    </Auth0Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
