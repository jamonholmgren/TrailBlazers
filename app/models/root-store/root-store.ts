import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"

const playerData = require("./player-data.json")

export const PlayerModel = types
  .model({
    id: types.identifier,
    name: types.string,
    href: types.string,
    image: types.string,
    height: types.string,
    age: types.number,
    fav: types.optional(types.boolean, false),
  })
  .actions(self => ({
    toggleFavorite() {
      self.fav = !self.fav
    },
  }))

export const RootStoreModel = types
  .model("RootStore")
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    players: types.array(PlayerModel),
    currentPlayer: types.maybe(types.reference(PlayerModel)),
  })
  .actions(self => ({
    onCreate() {
      self.players = playerData.players
    },
    setPlayer(player) {
      self.currentPlayer = player
    },
  }))
  .views(self => ({
    get playersByFav() {
      return self.players.sort((a, b) => (a.fav ? -1 : 1))
    },
  }))

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>
export type Player = Instance<typeof PlayerModel>

/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
