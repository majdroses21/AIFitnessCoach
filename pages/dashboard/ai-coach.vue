<template>
    <NuxtLayout name="gym">
        <v-container class="fill-height pa-0">
            <v-card class="chat-container mx-auto" elevation="0" rounded="lg">
                <div class="chat-messages pa-4" ref="chatContainer">
                    <div v-for="(message, index) in messages" :key="index"
                        :class="['message-wrapper mb-4', message.isUser ? 'user-message' : 'ai-message']">
                        <div class="message-content">
                            <v-card :class="[
                                'message-bubble',
                                message.isUser ? 'user-bubble' : 'ai-bubble',
                                message.isTyping ? 'typing-bubble' : ''
                            ]" elevation="0">
                                <v-card-text>
                                    {{ message.text }}
                                </v-card-text>
                            </v-card>
                        </div>
                    </div>
                </div>

                <v-card-actions class="chat-input px-4 py-2">
                    <v-text-field v-model="newMessage" placeholder="اكتب رسالتك هنا..." @keyup.enter="sendMessage"
                        :disabled="isAiTyping" hide-details variant="solo" class="chat-input-field"
                        density="comfortable" bg-color="input-background">
                        <template v-slot:prepend-inner>
                            <v-icon icon="mdi-microphone" color="grey" class="ms-2" />
                        </template>
                        <template v-slot:append-inner>
                            <div class="d-flex align-center">
                                <v-icon icon="mdi-plus" color="grey" class="me-2" />
                                <v-btn color="primary" icon="mdi-send" variant="text" @click="sendMessage"
                                    :disabled="!newMessage.trim() || isAiTyping" class="send-button"
                                    size="small"></v-btn>
                            </div>
                        </template>
                    </v-text-field>
                </v-card-actions>
            </v-card>
        </v-container>
    </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from '~/store/auth'

const apiUrl = useRuntimeConfig().public.API_URL
const store = useAuthStore();
const userId = store.user._id;
definePageMeta({
  middleware: 'auth'
})

const messages = ref([
    {
        text: "Hello! I'm your smart sports coach. How can I help you?",
        isUser: false,
        timestamp: new Date()
    }
])

const newMessage = ref('')
const chatContainer = ref(null)
const isAiTyping = ref(false)

const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
}

const sendMessage = async () => {
    if (!newMessage.value.trim() || isAiTyping.value) return

    const userMessage = newMessage.value
    newMessage.value = ''

    messages.value.push({
        text: userMessage,
        isUser: true,
        timestamp: new Date()
    })
    await scrollToBottom()

    try {
        isAiTyping.value = true
        messages.value.push({
            text: '●●●',
            isUser: false,
            timestamp: new Date(),
            isTyping: true
        })
        await scrollToBottom()

        // استدعاء API لجلب الرد من السيرفر
        const { data } = await useFetch(apiUrl + '/chat/' + userId, {
            method: 'POST',
            body: { prompt: userMessage }
        })

        messages.value = messages.value.filter(m => !m.isTyping)
        console.log(data.value.data.response,22);
        messages.value.push({
            text: data.value.data.response || "I didn't understand your question, can you rephrase?",
            isUser: false,
            timestamp: new Date()
        })
    } catch (error) {
        console.error("Error fetching response:", error)
        messages.value = messages.value.filter(m => !m.isTyping)
        messages.value.push({
            text: "An error occurred while processing your request. Try again later.",
            isUser: false,
            timestamp: new Date()
        })
    } finally {
        isAiTyping.value = false
        await scrollToBottom()
    }
}

onMounted(() => {
    scrollToBottom()
})
</script>


<style scoped>
.chat-container {
    height: 90vh;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    background-color: transparent;
}

.chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.message-wrapper {
    display: flex;
    gap: 12px;
    padding: 0 12px;
}

.message-content {
    flex: 1;
    max-width: 80%;
}

.message-bubble {
    border-radius: 18px;
    max-width: 100%;
    width: fit-content;
}

.user-message .message-content {
    margin-right: auto;
}

.ai-message .message-content {
    margin-left: auto;
}

.user-bubble {
    background-color: #2563eb;
    color: white;
}

.ai-bubble {
    background-color: #1e293b;
    color: white;
}

.typing-bubble {
    background-color: #334155;
    width: 60px;
}

.chat-input {
    background-color: transparent;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-input-field {
    border-radius: 12px;
    background-color: #1e293b !important;
}

.chat-input-field :deep(.v-field__input) {
    min-height: 44px !important;
    padding-block: 0 !important;
}

.send-button {
    transition: transform 0.2s ease;
}

.send-button:not(:disabled):hover {
    transform: scale(1.1);
}

:deep(.v-field) {
    border-radius: 12px !important;
    background-color: #1e293b !important;
}

:deep(.v-field__outline) {
    display: none;
}
</style>