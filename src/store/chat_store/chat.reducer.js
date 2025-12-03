// import { createSlice } from "@reduxjs/toolkit";
// import { mockConversations } from "../../lib/mockData";
// import { createConversation, getConversationById } from "./chat.action";
// import { sendMessageAPI } from "./chat.action";
// const initialState = {
//     searchResults: [],
//     conversations: [],
//     currentConversation: {},
//     loading: false,
//     language: 'en',
//     error: null,

// }
// const chatSlice = createSlice({
//     name: "chat",
//     initialState,
//     reducers: {
//         setLanguage: (state, action) => {
//             state.language = action.payload;
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload;
//         },
//         setCurrentConversation: (state, action) => {
//             state.currentConversation = action.payload;
//         },
//         setConversation: (state, action) => {
//             state.conversations = action.payload
//         }

//     },

//     extraReducers: (builder) => {
//         builder
//             .addCase(getConversationById.pending, (state) => {
//                 state.loading = true;
//                 state.currentConversation = {};
//             })
//             .addCase(getConversationById.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.currentConversation = action.payload;
//             })
//             .addCase(getConversationById.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(sendMessageAPI.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(sendMessageAPI.fulfilled, (state, action) => {

//                 state.loading = false;
//                 const { user, bot } = action.payload;

//                 if (!state.currentConversation?.id) {
//                     state.currentConversation = {
//                         id: action.payload.chatId,
//                         title: "New Conversation",
//                         timestamp: new Date().toISOString(),
//                         language: state.language,
//                         messages: [],
//                     };
//                 }
//                 // Push both messages
//                 state.currentConversation.messages.push(user);
//                 state.currentConversation.messages.push(bot);

//                 let currenConvIndex = state.conversations?.findIndex((conv) => conv?.id === state.currentConversation.id);

//                 if (currenConvIndex < 0) {
//                     state.conversations.push(state.currentConversation);
//                 } else {
//                     state.conversations = state.conversations?.map((conv) => {
//                         if (conv?.id === state.currentConversation?.id) {
//                             return {
//                                 ...conv,
//                                 ...state?.currentConversation
//                             }
//                         }
//                         return conv;
//                     })
//                 }
//             })
//             .addCase(sendMessageAPI.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//             .addCase(createConversation.pending, (state, action) => {

//                 state.loading = true;
//             })
//             .addCase(createConversation.fulfilled, (state, action) => {

//                 if (!state?.conversations || !state?.conversations?.length) {
//                     state.conversations = [];
//                 }
//                 state?.conversations?.push(action.payload)
//                 state.currentConversation = action.payload;
//             })
//             .addCase(createConversation.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//     }
// })
// export const { setLanguage, setConversation, setInputText, setLoading, setCurrentConversation } = chatSlice.actions
// export default chatSlice.reducer;







import { createSlice } from "@reduxjs/toolkit";
import { createConversation, getConversationById, sendMessageAPI } from "./chat.action";

const initialState = {
    chatInput: "",
    searchResults: [],
    conversations: [],
    currentConversation: {},
    loading: false,
    language: "en",
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChatInput: (state, action) => {
            state.chatInput = action?.payload ?? "";
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setConversation: (state, action) => {
            state.conversations = action.payload;
        },
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },

        // Used when user types a message
        addUserMessage: (state, action) => {
            const { chatId, userMessage } = action.payload;

            // If current conversation matches
            if (state.currentConversation?.id === chatId) {
                state.currentConversation.messages.push(userMessage);
                return;
            }

            // Else find in conversations list
            const idx = state.conversations.findIndex((c) => c.id === chatId);

            if (idx >= 0) {
                state.conversations[idx].messages.push(userMessage);
                state.currentConversation = state.conversations[idx];
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getConversationById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getConversationById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentConversation = action.payload;
            })
            .addCase(getConversationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // SEND MESSAGE — add bot response
            .addCase(sendMessageAPI.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMessageAPI.fulfilled, (state, action) => {
                state.loading = false;

                const { chatId, bot } = action.payload;

                if (!state.currentConversation?.id) {
                    state.currentConversation = {
                        id: chatId,
                        title: "New Conversation",
                        timestamp: new Date().toISOString(),
                        language: state.language,
                        messages: [],
                    };
                }

                state.currentConversation.messages.push(bot);

                const index = state.conversations.findIndex(
                    (c) => c.id === state.currentConversation.id
                );

                if (index < 0) state.conversations.push(state.currentConversation);
                else state.conversations[index] = { ...state.currentConversation };
            })
            .addCase(sendMessageAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // CREATE CONVERSATION
            .addCase(createConversation.fulfilled, (state, action) => {
                state.conversations.push(action.payload);
                state.currentConversation = action.payload;
            });
    },
});

export const {
    setChatInput,
    setLanguage,
    setConversation,
    setCurrentConversation,
    addUserMessage,
} = chatSlice.actions;

export default chatSlice.reducer;

