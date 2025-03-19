import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: useCookie('user').value || null,
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
        },
        refreshState(user) {
            const userCookie = useCookie('user')
            userCookie.value = JSON.stringify(user)
            this.user = user
        }
    }
})
