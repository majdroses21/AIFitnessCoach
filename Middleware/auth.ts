export default defineNuxtRouteMiddleware((to, from) => {
    if (!useCookie("token")) {
        return navigateTo('/')
    }
})
/**
 * في الصفحات الي تطلب تسجيل الدخول حط هاد الكود 
 definePageMeta({
  middleware: 'auth'
})

 */