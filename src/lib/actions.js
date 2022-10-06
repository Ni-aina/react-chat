export const actions = {
    isAuth : "isAuth",
    authId : "authId",
    saveToLocal : "saveToLocal",
    resetToLocal : "resetToLocal"
}

export function authentification(isAuth) {
    return {
        type : actions.isAuth,
        payload : {isAuth : isAuth}
    }
}

export function authentificationId(authId) {
    return {
        type : actions.authId,
        payload : {authId : authId}
    }
}

export function saveLocal(items) {
    return {
        type : actions.saveToLocal,
        payload : {items: items}
    }
}

export function resetLocal() {
    return {
        type : actions.resetToLocal
    }
}