export default defineNuxtRouteMiddleware((to,from) => {
    if (useCookie("token").value) {
        return navigateTo('/dashboard/profile')
    }
})

/**
 * هون معنا مثال بصفحات الي ما بصير يشوفها اليوزر الي مسجل الدخول رح نحط هي 
 * 
 definePageMeta({
  middleware: 'guest'
})
 * 

 */