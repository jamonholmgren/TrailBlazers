import { createStackNavigator } from "react-navigation"
import { WelcomeScreen } from "../screens/welcome-screen"
import { DetailsScreen } from "../screens/details-screen"

export const PrimaryNavigator = createStackNavigator(
  {
    welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    details: { screen: DetailsScreen },
  },
  {
    headerMode: "screen",
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["welcome"]
