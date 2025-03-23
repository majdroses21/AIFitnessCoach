import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: useCookie('user').value || null,
<<<<<<< HEAD
        loggedIn: !!useCookie('user').value
    }),
    actions: {
        loginSave(user) {
            const userCookie = useCookie('user') 
            userCookie.value = JSON.stringify(user)
            this.user = user
            this.loggedIn = true
        },
        logout() {
            const userCookie = useCookie('user')
            userCookie.value = null 
            this.user = null
            this.loggedIn = false
=======
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
            //
            this.user = null;
            this.token = null;
            this.loggedIn = false;
            //
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigateTo('/')
>>>>>>> 187e2c0cf5c8eb0b2d2047666410bd74ffa78803
        },
        refreshState(user) {
            const userCookie = useCookie('user')
            userCookie.value = JSON.stringify(user)
            this.user = user
        }
    }
})
