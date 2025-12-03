// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { askQuestionService } from "../../services/chat.service";
// import { randomId16UUIDStyle } from "../../utils/common";

// export const createConversation = createAsyncThunk(
//     "chat/createConversation",
//     async ({ handleSuccess }, thunkAPI) => {
//         try {
//             const state = thunkAPI.getState();
//             const language = state.chat.language;
//             const newConveration = {
//                 id: randomId16UUIDStyle(),
//                 title: "New Conversation",
//                 timestamp: new Date().toISOString(),
//                 language: language,
//                 messages: [],
//             };
//             const response = {
//                 ok: true,
//                 json: () => Promise.resolve(newConveration),
//             };
//             const data = await response.json();

//             if (response.ok) {
//                 handleSuccess?.(newConveration?.id);
//                 console.log(newConveration, data, "newConveration>>");
//                 return data;
//             }
//             return thunkAPI.rejectWithValue(response?.message);
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.message);
//         }
//     }
// );


// export const getConversationById = createAsyncThunk('chat/getConvById',
//     async ({ id }, thunkAPI) => {
//         try {
//             const state = thunkAPI.getState();
//             const conversations = state.chat.conversations;
//             let findConvo = conversations?.find((conv) => conv?.id === id)
//             const response = await new Promise((resolve) => {
//                 setTimeout(() => {
//                     resolve({
//                         ok: true,
//                         json: () => Promise.resolve(findConvo || {})
//                     });
//                 }, 2000);
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 return data;     //success result
//             }
//             return thunkAPI.rejectWithValue(data.message || "data fetch failed");
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );

// export const sendMessageAPI = createAsyncThunk(
//     "chat/sendMessageAPI",
//     async ({ chatId, userMessage, question, handleSuccess }, thunkAPI) => {

//         try {
//             let activeChatId = chatId;

//             if (!chatId) {
//                 const newConv = await thunkAPI
//                     .dispatch(createConversation({}))
//                     .unwrap();

//                 activeChatId = newConv.id;
//             }

//             const response = await askQuestionService({ question });

//             if (response?.status === "success") {
//                 handleSuccess?.(activeChatId);

//                 return {
//                     chatId: activeChatId,
//                     user: userMessage,
//                     bot: {
//                         id: "b" + Date.now(),
//                         role: "bot",
//                         content: response?.answer,
//                         timestamp: new Date().toISOString(),
//                         contentType: "text",
//                     },
//                 };
//             }

//             return thunkAPI.rejectWithValue(response?.message);
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.message);
//         }
//     }
// );







import { createAsyncThunk } from "@reduxjs/toolkit";
import { askQuestionService } from "../../services/chat.service";
import { randomId16UUIDStyle } from "../../utils/common";
import { addUserMessage } from "./chat.reducer";

// ---------------------- CREATE CONVERSATION ----------------------

export const createConversation = createAsyncThunk(
    "chat/createConversation",
    async ({ handleSuccess } = {}, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const language = state.chat.language;

            const newConversation = {
                id: randomId16UUIDStyle(),
                title: "New Conversation",
                timestamp: new Date().toISOString(),
                language,
                messages: [],
            };

            const response = {
                ok: true,
                json: () => Promise.resolve(newConversation),
            };

            const data = await response.json();

            if (response.ok) {
                handleSuccess?.(data.id);
                return data;
            }

            return thunkAPI.rejectWithValue(response.message);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// ---------------------- SEND MESSAGE ----------------------

export const sendMessageAPI = createAsyncThunk("chat/sendMessageAPI",
    async ({ chatId, userMessage, question, handleSuccess }, thunkAPI) => {
        try {
            let activeChatId = chatId;
            //  If conversation does NOT exist → create one first
            if (!activeChatId) {
                const newConv = await dispatch(createConversation({})).unwrap();
                activeChatId = newConv.id;
                navigate(`/chat/${newConv.id}`, { replace: true });
            }

            // Add user message immediately to UI
            thunkAPI.dispatch(addUserMessage({ chatId: activeChatId, userMessage }));

            // Clear input instantly
            setMessage("");

            const response = await askQuestionService({ question });

            if (response?.status === "success") {
                handleSuccess?.(activeChatId);

                return {
                    chatId: activeChatId,
                    user: userMessage,
                    bot: {
                        id: "b_" + Date.now(),
                        role: "bot",
                        content: response.answer,
                        timestamp: new Date().toISOString(),
                        contentType: "text",
                    },
                };
            }

            return thunkAPI.rejectWithValue(response.message);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getConversationById = createAsyncThunk('chat/getConvById',
    async ({ id }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const conversations = state.chat.conversations;
            let findConvo = conversations?.find((conv) => conv?.id === id)
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        json: () => Promise.resolve(findConvo || {})
                    });
                }, 2000);
            });
            const data = await response.json();
            if (response.ok) {
                return data;     //success result
            }
            return thunkAPI.rejectWithValue(data.message || "data fetch failed");
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
