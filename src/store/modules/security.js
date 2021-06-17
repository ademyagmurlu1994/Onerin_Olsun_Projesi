const state = {
    isLogin: false
}

const getters = {
    getIsLogin(state){
        return state.isLogin;
    }
}

const mutations ={
    setIsLogin(state, payload){
        state.isLogin = payload
    }
}

const actions ={
    setIsLoginAc({commit}, payload){
        commit("setIsLogin", payload);
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}