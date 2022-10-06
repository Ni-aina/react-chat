import { actions } from "./actions";

const saveToLocalStorage = object => {
    localStorage.setItem('items', JSON.stringify(object));
}

const initialState = {
    items : JSON.parse(localStorage.getItem('items')) !== null ? JSON.parse(localStorage.getItem('items')) : 
    [
        {
            isAuth: false,
        },
        {
            authId: null
        }
    ]
}

export default function onlineState(state = initialState, action) {
    switch(action.type) {
        case actions.isAuth: return Object.assign({}, state, {items : [state.items[0], action.payload]});
        case actions.authId: return Object.assign({}, state, {items : [state.items[1], action.payload]});
        case actions.saveToLocal: saveToLocalStorage(action.payload.items)
            return state;
        case actions.resetToLocal: saveToLocalStorage('items', JSON.stringify([{"isAuth":false},{"authId":null}]));
            return Object.assign({}, state, {items : 
                [
                    {
                        isAuth: false,
                    },
                    {
                        authId: null
                    }
                ]
            })
        default : return state;
    }
}