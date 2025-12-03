import { useEffect, useState } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatHistory from '@/components/chat/ChatHistory';
import MessageBubble from '@/components/chat/MessageBubble';
import ChatInput from '@/components/chat/ChatInput';
import { Sidebar } from 'primereact/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getConversationById } from '../store/chat_store/chat.action';
import { Loader2 } from 'lucide-react';

const Chat = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { chatId } = params;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentConversation = useSelector((state) => state?.chat?.currentConversation);
    const loading = useSelector((state) => state?.chat?.loading);

    useEffect(() => {
        if (chatId) {
            dispatch(getConversationById({ id: chatId }));
        }
    }, [chatId]);
    return (
        <div className="h-screen flex flex-col w-full bg-[#f8fafc]">
            <div className="sticky top-0 z-20 bg-white shadow-sm">
                <ChatHeader onToggleSidebar={() => setSidebarOpen(true)} />
            </div>
            <div className="flex-1 flex min-h-0">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-80 border-r border-[#d7dfea] overflow-y-auto">
                    <ChatHistory />
                </aside>
                {/* Mobile Sidebar */}
                <Sidebar
                    visible={sidebarOpen}
                    onHide={() => setSidebarOpen(false)}
                    position="left"
                    className="w-80 shadow-xl"
                    showCloseIcon={false}
                >
                    <ChatHistory onClose={() => setSidebarOpen(false)} />
                </Sidebar>
                {/* Main Chat Area */}
                <main className="flex-1 flex flex-col min-h-0">
                    {/* {loading ? (
                        <div className="flex-1 flex items-center justify-center bg-white/40 backdrop-blur-md">
                            <Loader2 size={28} className="animate-spin text-blue-600" />
                        </div> */}
                    {/* ) : ( */}
                        <div className="flex-1 overflow-y-auto container mx-auto space-y-4 p-4 w-full">
                            {/* {dispatch(setConversation(currentConversation))} */}
                            {currentConversation ? (
                                currentConversation?.messages?.map((message) => (
                                    <MessageBubble key={message?.id} message={message} />
                                ))
                            ) : (
                                <div className="flex items-center justify-center h-full text-center text-[#627084]">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-semibold">Welcome to ChatBot</h2>
                                        <p>Select a conversation or start a new one</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    {/* )} */}
                    <div className=" bg-white sticky bottom-0">
                        <ChatInput />
                    </div>
                </main>
            </div>
        </div>
    );
};
export default Chat;

