import utilisateur from './utilisateur'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import * as api from '../api'

jest.mock('../api', () => ({
  utilisateur: jest.fn()
}))

const localVue = createLocalVue()
localVue.use(Vuex)

console.log = jest.fn()

describe("obtention des données d'un utilisateur dans l'UI", () => {
  let utilisateurId
  let store
  let actions
  let mutations
  let utilisateurInfo

  beforeEach(() => {
    utilisateurId = 71
    utilisateurInfo = { id: 71, nom: 'toto', prenom: 'asticot' }
    utilisateur.state = { current: null }
    mutations = {
      loadingAdd: jest.fn(),
      loadingRemove: jest.fn()
    }
    actions = { pageError: jest.fn(), apiError: jest.fn() }
    store = new Vuex.Store({
      modules: { utilisateur },
      mutations,
      actions
    })
  })

  test("obtient les données d'un utilisateur", async () => {
    const utilisateur = { id: 71, nom: 'toto', prenom: 'asticot' }
    const apiMock = api.utilisateur.mockResolvedValue(utilisateur)
    await store.dispatch('utilisateur/get', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(utilisateurId)
    expect(store.state.utilisateur.current).toEqual(utilisateur)
  })

  test("n'obtient pas d'utilisateur: il n'existe pas", async () => {
    const apiMock = api.utilisateur.mockResolvedValue(null)
    await store.dispatch('utilisateur/get', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(utilisateurId)
    expect(actions.pageError).toHaveBeenCalled()
    expect(store.state.utilisateur.current).toBeNull()
  })

  test("retourne une erreur de l'api dans l'obtention de l'utilisateur", async () => {
    const apiMock = api.utilisateur.mockRejectedValue(
      new Error("l'api ne répond pas")
    )
    await store.dispatch('utilisateur/get', utilisateurId)

    expect(apiMock).toHaveBeenCalled()
    expect(apiMock).toHaveBeenCalledWith(utilisateurId)
    expect(console.log).toHaveBeenCalled()
    expect(actions.apiError).toHaveBeenCalled()
  })

  test("supprime les données d'utilisateur", () => {
    store.commit('utilisateur/set', utilisateurInfo)
    store.commit('utilisateur/reset')

    expect(store.state.utilisateur.current).toBeNull()
  })
})
