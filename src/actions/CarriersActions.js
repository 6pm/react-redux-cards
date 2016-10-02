import { LOAD_CARRIERS_DATA,
         CHANGE_CARRIER
} from '../constants/Carriers'

export function loadCarriersData(data) {
    return {
        type: LOAD_CARRIERS_DATA,
        payload: data
    }
}

export function changeCarrier(name) {
    return {
        type: CHANGE_CARRIER,
        payload: name
    }
}
