// import { useCallback, useEffect, useState } from 'react';
// import { useApp } from '@/contexts/AppContext';
// import { translations } from '@/lib/mockData';
// import { Button } from 'primereact/button';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Send } from 'lucide-react';
// import { toast } from 'sonner';
// import { useSelector, useDispatch } from 'react-redux';
// import { setInputText } from '../../store/chat_store/chat.reducer';
// import { createConversation, sendMessageAPI } from '../../store/chat_store/chat.action';
// import { useNavigate, useParams } from 'react-router-dom';
// const ChatInput = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { language } = useApp();
//     const params = useParams();
//     const { chatId } = params;
//     const [message, setMessage] = useState('');
//     const currentConversation = useSelector((state) => state?.chat?.currentConversation || {});

//     const t = translations[language];

//     const handleSuccess = (newChatId) => {
//         toast.info("Message Sent");

//         if (newChatId && newChatId !== chatId) {
//             navigate(`/chat/${newChatId}`, { replace: true });
//         }

//         setMessage("");
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!message.trim()) return;

//         const userMessage = {
//             id: `m ${Date.now()}`,
//             role: 'user',
//             content: message,
//             timestamp: new Date()?.toString(),
//             contentType: 'text',
//         };
//         dispatch(sendMessageAPI({ chatId: chatId === "undefined" ? null : chatId, userMessage, question: message, handleSuccess }));
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             handleSubmit(e);
//         }
//     };

//     return (
//         <div className="border-t border-gray-300/80 bg-white p-4">
//             <form onSubmit={handleSubmit} className="flex gap-2">
//                 <InputTextarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     placeholder={t.typeMessage}
//                     className="flex-1 border border-gray-300/80 rounded-md p-2 bg-gray-100/40 text-[#1d2530] placeholder:text-[#627084] text-sm focus:outline-none focus:ring-2 focus:ring-[#066ff9]"
//                     rows={2}
//                     autoResize
//                     style={{ resize: 'none' }}
//                 />
//                 <Button
//                     type="submit"
//                     className="h-[60px] w-[60px] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  bg-[#066ff9] text-[#ffffff] hover:bg-[#066ff9e6]"
//                     icon={<Send className="h-4 w-4" />}
//                     rounded
//                     severity="secondary"
//                 />
//             </form>
//         </div>
//     );
// };

// export default ChatInput;












import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/mockData';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { addUserMessage, setChatInput } from '../../store/chat_store/chat.reducer';
import { createConversation, sendMessageAPI } from '../../store/chat_store/chat.action';
import { useNavigate, useParams } from 'react-router-dom';

const ChatInput = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { language } = useApp();
    const { chatId } = useParams();
    const currentConversation = useSelector((state) => state.chat.currentConversation);
    const chatInputValue = useSelector((state) => state.chat.ChatInput);



    console.log("chatinput", ChatInput)

    const [message, setMessage] = useState('');
    const t = translations[language];

    const handleSuccess = (newChatId) => {
        toast.info("Message Sent");
        if (newChatId && newChatId !== chatId) {
            navigate(`/chat/${newChatId}`, { replace: true });
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!chatInputValue.trim()) return;
        const userMessage = {
            id: `m_${Date.now()}`,
            role: "user",
            content: message,
            timestamp: new Date().toISOString(),
            contentType: "text",
        };

        let activeChatId = (chatId === "undefined" || !chatId) ? null : chatId;

        // Send message to backend
        dispatch(sendMessageAPI({ chatId: activeChatId, userMessage, question: userMessage.content, handleSuccess, }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="border-t border-gray-300/80 bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <InputTextarea
                    value={chatInputValue}
                    //onChange={(e) => setMessage(e.target.value)}
                    onChange={(e) => dispatch(setChatInput(e.target.value))}
                    onKeyDown={handleKeyDown}
                    placeholder={t.typeMessage}
                    className="flex-1 border border-gray-300/80 rounded-md p-2 
                               bg-gray-100/40 text-[#1d2530] placeholder:text-[#627084] 
                               text-sm focus:outline-none focus:ring-2 focus:ring-[#066ff9]"
                    rows={2}
                    autoResize
                    style={{ resize: "none" }}
                />

                <Button
                    type="submit"
                    className="h-[60px] w-[60px] rounded-xl transition-colors 
                               bg-[#066ff9] text-white hover:bg-[#066ff9e6]
                               focus-visible:outline-none focus-visible:ring-2 
                               focus-visible:ring-ring focus-visible:ring-offset-2"
                    icon={<Send className="h-4 w-4" />}
                />
            </form>
        </div>
    );
};

export default ChatInput;
