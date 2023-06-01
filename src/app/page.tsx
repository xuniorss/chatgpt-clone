'use client'

import { ChatArea } from '@/components/ChatArea'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Chat } from '@/types/Chat'
import { useCallback, useState } from 'react'

export default function Home() {
   const [sidebarOpened, setSidebarOpened] = useState(false)
   const [chatActive, setChatActive] = useState<Chat>()

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
