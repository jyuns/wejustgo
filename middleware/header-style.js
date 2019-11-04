export default function(context) {

    if(context.route.path != '/' ) {
        context.store.commit('SET_HEADER_STYLE', false)
    } else {
        context.store.commit('SET_HEADER_STYLE', true)
    }

}