import { defineStore } from 'pinia'
import { IpState } from './types'

const useIpStore = defineStore('user', {
  state: (): IpState => ({
    name: undefined,
    avatar: undefined,
  }),

  getters: {
    userInfo(state: IpState): IpState {
      return { ...state }
    },
  },

  actions: {},
})

export default useIpStore
