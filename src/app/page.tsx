'use client'

import { ChatArea } from '@/components/ChatArea'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Chat } from '@/types/Chat'
import { useCallback, useState } from 'react'

export default function Home() {
   const [sidebarOpened, setSidebarOpened] = useState(false)
   const [chatActive, setChatActive] = useState<Chat>({
      id: '123',
      title: 'Bla blu',
      message: [
         { id: '99', author: 'me', body: 'Opa, tudo bem?' },
         {
            id: '100',
            author: 'ai',
            body: 'Tudo otimo, em que posso te ajudar?',
         },
      ],
   })

   const openSidebar = useCallback(() => {
      setSidebarOpened(true)
   }, [])

   const closeSidebar = useCallback(() => {
      setSidebarOpened(false)
   }, [])

   const handleClearConversation = useCallback(() => {}, [])
   const handleNewChat = useCallback(() => {}, [])

   return (
      <main className="flex min-h-screen bg-gpt-gray">
         <Sidebar
            open={sidebarOpened}
            onClose={closeSidebar}
            onClear={handleClearConversation}
            onNewChat={handleNewChat}
         >
            ...
         </Sidebar>

         <section className="flex w-full flex-col">
            <Header
               openSidebarClick={openSidebar}
               title={`Any title`}
               newChatClick={handleNewChat}
            />

            <ChatArea chat={chatActive} />
         </section>
      </main>
   )
}
