// What should the reducer do

export const add_compare = (id) => {
    return {
        type: 'ADD_COMPARE',
        payload: id
    }
}

export const remove_compare = (id) => {
    return {
        type: 'REMOVE_COMPARE',
        payload: id
    }
}

export const add_calculation = (id) => {
    return {
        type: 'ADD_CALCULATION',
        payload: id
    }
}

export const remove_calculation = (id) => {
    return {
        type: 'REMOVE_CALCULATION',
        payload: id
    }
}
