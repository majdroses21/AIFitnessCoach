import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: useCookie('user').value || null,
        token: useCookie('token').value || null,
        loggedIn: !!useCookie('user').value
    }),
    actions: {
        loginSave(user,token) {
            const userCookie = useCookie('user') ;
            const tokenCookie = useCookie('token');
            userCookie.value = JSON.stringify(user);
            tokenCookie.value = token;
            this.user = user;
            this.token = token;
            this.loggedIn = true;
        },
        logout() {
            const userCookie = useCookie('user')
            const tokenCookie = useCookie('token')
            userCookie.value = null;
            tokenCookie.value = null;
            this.user = null;
            this.token = null;
            this.loggedIn = false
        },
        refreshState(user) {
            const userCookie = useCookie('user')
            userCookie.value = JSON.stringify(user)
            this.user = user
        }
    }
})
