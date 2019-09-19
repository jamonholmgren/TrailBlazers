import * as React from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { observer } from "mobx-react"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Screen } from "../../components/screen"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"
import { bowserLogo } from "./"
import { FlatList, TouchableOpacity, TextInput } from "react-native-gesture-handler"
import { useStores } from "../../models/root-store/root-store-context"
import { Player } from "../../models/root-store/root-store"
import { useState } from "react"

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
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: "#5D2555",
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}
const PLAYER_ROW: ViewStyle = {
  flexDirection: "row",
}
const PLAYER_IMAGE: ImageStyle = {
  height: 50,
  width: 50,
}
const PLAYER_NAME: TextStyle = {
  flex: 1,
  fontSize: 20,
  padding: 15,
}
const SEARCH: TextStyle = {
  flex: 1,
  height: 30,
  padding: 5,
  fontSize: 20,
  backgroundColor: "#FFFFFF",
}

export interface WelcomeScreenProps extends NavigationScreenProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = observer(props => {
  const rootStore = useStores()

  const [searchValue, setSearchValue] = useState<string>("")

  const players = rootStore.playersByFav.filter(p =>
    p.name.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Trail Blazers Roster" />
        </Text>
        <Image source={bowserLogo} style={BOWSER} />
        <TextInput style={SEARCH} onChangeText={setSearchValue} />
        <FlatList
          data={players}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                rootStore.setPlayer(item as Player)
                props.navigation.navigate("details")
              }}
              style={PLAYER_ROW}
            >
              <Image style={PLAYER_IMAGE} source={{ uri: item.image }} />
              <Text style={PLAYER_NAME}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </Screen>
    </View>
  )
})
