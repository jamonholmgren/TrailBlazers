import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"

const playerData = require("./player-data.json")

export const PlayerModel = types.model({
  id: types.identifier,
  name: types.string,
  href: types.string,
  image: types.string,
  height: types.string,
  age: types.number,
})

export const RootStoreModel = types
  .model("RootStore")
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    players: types.array(PlayerModel),
  })
  .actions(self => ({
    onCreate() {
      self.players = playerData.players
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
