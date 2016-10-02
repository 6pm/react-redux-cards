import { LOAD_CARRIERS_DATA,
         CHANGE_CARRIER
} from '../constants/Carriers'

// default state for carriers
const initialState = {
    showedCarrier: '',
    allCards: {}
}

export default function carriers(state = initialState, action) {

    switch (action.type) {
        case LOAD_CARRIERS_DATA: {
            let cards = {allCards: action.payload}

            return { ...state, ...cards }
        }

        case CHANGE_CARRIER: {
            return { ...state, ...{showedCarrier: action.payload} }
        }

        default:
            return state;
    }

}
