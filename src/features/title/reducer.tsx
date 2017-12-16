import { LanguageAction } from './actions'
import { StoreState } from './types'
import { SET_LANGUAGE } from './constants'

const initialState = {
  language: 'SE',
  title: 'LEAN'
}

export function title(state: StoreState = initialState, action: LanguageAction): StoreState {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      }

    default:
      return state
  }
}