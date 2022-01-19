import axios from "axios";
import Vue from 'vue'

const state = {
    questionState: {},
};

const mutations = {
    setQuestionState(state, question) {
        Vue.set(state, 'questionState', question);
    },
};

const actions = {
  
    setQuestionState({ commit }, value) {
        commit('setQuestionState', value);
    },
};
const getters = {
    questionState: state => {
        console.log(state);
        return state.questionState;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
