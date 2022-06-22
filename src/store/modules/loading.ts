const loading: Object = {
    state: {
        loading: true
    },

    mutations: {
        set_loading: (state: any, loading: Boolean) => {
            state.loading = loading;
            
        },
    },

    actions: {
        setLoading: ({ commit }: any, loading: Boolean) => {
            commit('set_loading', loading);
        }
    },

};

export default loading;