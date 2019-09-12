import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, TouchableOpacity } from "react-native"
import { NavigationScreenProps, FlatList } from "react-navigation"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"
import { blazersLogo } from "./"
import { useStores } from "../../models/root-store"
import { observer } from "mobx-react"

const FULL: ViewStyle = { flex: 1, backgroundColor: "#232323" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const PLAYER_ROW: ViewStyle = {
  flexDirection: "row",
}
const PLAYER_IMAGE = {
  width: 50,
  height: 50,
}
const PLAYER_NAME = {
  flex: 1,
  fontSize: 20,
  padding: 15,
}

export interface WelcomeScreenProps extends NavigationScreenProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = observer(props => {
  const rootStore = useStores()

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Trail Blazers Roster" />
        </Text>
        <Image source={blazersLogo} style={BOWSER} />
        <FlatList
          data={rootStore.playersByFav}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={PLAYER_ROW}
              onPress={() => {
                rootStore.setPlayer(item)
                props.navigation.navigate("details")
              }}
            >
              <Image style={PLAYER_IMAGE} source={{ uri: item.image }} />
              <Text style={PLAYER_NAME}>
                {item.name}
                {item.fav ? " ⭐️" : ""}
              </Text>
            </TouchableOpacity>
          )}
        />
      </Screen>
    </View>
  )
})
