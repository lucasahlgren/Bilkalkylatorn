// What should the reducer do

export const add_compare = (name) => {
    return {
        type: 'ADD_COMPARE',
        payload: name
    }
}

export const remove_compare = (name) => {
    return {
        type: 'REMOVE_COMPARE',
        payload: name
    }
}

export const add_calculation = (calculation) => {
    return {
        type: 'ADD_CALCULATION',
        payload: calculation
    }
}

export const notified = () => {
    return {
        type: 'NOTIFIED',
    }
}

export const remove_calculation = (name) => {
    return {
        type: 'REMOVE_CALCULATION',
        payload: name
    }
}
