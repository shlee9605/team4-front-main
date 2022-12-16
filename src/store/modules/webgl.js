export default {
    state: {
        VisionObjectClick: false,
    },
    getters: {
        VisionObjectClick: state => state.VisionObjectClick,
    },
    mutations: {
        setVisionObjectClick(state) {
            state.VisionObjectClick = true
        },
        setVisionObjectFalse(state) {
            state.VisionObjectClick = false
        }
    }
}