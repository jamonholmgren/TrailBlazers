import * as React from "react"
import { observer } from "mobx-react"
import { ViewStyle } from "react-native"
import { Text } from "../../components/text"
import { Screen } from "../../components/screen"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import { NavigationScreenProps } from "react-navigation"
import { Button } from "../../components/button"

export interface DetailsScreenProps extends NavigationScreenProps<{}> {}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const DetailsScreen: React.FunctionComponent<DetailsScreenProps> = observer(props => {
  const rootStore = useStores()
  const player = rootStore.currentPlayer

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text={player.name} />
      <Text preset="header" text={player.height} />
      <Text preset="header" text={player.age.toString()} />
      <Button
        preset="primary"
        textStyle={{ fontSize: 25 }}
        onPress={() => {
          player.toggleFavorite()
        }}
        text={player.fav ? "Unfavorite" : "Favorite"}
      />
    </Screen>
  )
})
