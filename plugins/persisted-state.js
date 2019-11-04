import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default ({store}) => {
    createPersistedState({
        key: 'vuex',
        paths: ['auth._remember',
                'chat._chatDisplay', 'chat._chatCurrentRoom', 'chat._chatMessageList', 'chat._chatLastIndex', 'chat._chatMoreAvailable',
              'chat._'],

        storage: {
          getItem: (key) => Cookies.get(key),
          setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
          removeItem: (key) => Cookies.remove(key)
        }
    })(store)
  }