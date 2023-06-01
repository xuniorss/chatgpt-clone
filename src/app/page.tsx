'use client'

import { ChatArea } from '@/components/ChatArea'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Chat } from '@/types/Chat'
import { useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
   const [sidebarOpened, setSidebarOpened] = useState(false)
   const [aiLoading, setAiLoading] = useState(false)
   const [chatList, setChatList] = useState<Chat[]>([])
   const [chatActiveId, setChatActiveId] = useState('')
   const [chatActive, setChatActive] = useState<Chat>()

   useEffect(() => {
      setChatActive(chatList.find((item) => item.id === chatActiveId))
   }, [chatActiveId, chatList])

   const getAIResponse = useCallback(() => {
      setTimeout(() => {
         let chatListClone = [...chatList]
         let chatIndex = chatListClone.findIndex(
            (item) => item.id === chatActiveId
         )

         if (chatIndex > -1) {
            chatListClone[chatIndex].messages.push({
               id: uuidv4(),
               author: 'ai',
               body: 'Aqui vai a resposta da AI',
            })
         }

         setChatList(chatListClone)
         setAiLoading(false)
      }, 2000)
   }, [chatActiveId, chatList])

   useEffect(() => {
      if (aiLoading) getAIResponse()
   }, [aiLoading, getAIResponse])

   const openSidebar = useCallback(() => {
      setSidebarOpened(true)
   }, [])

   const closeSidebar = useCallback(() => {
      setSidebarOpened(false)
   }, [])

   const handleClearConversation = useCallback(() => {
      if (aiLoading) return

      setChatActiveId('')
      setChatList([])
   }, [aiLoading])

   const handleNewChat = useCallback(() => {
      if (aiLoading) return

      setChatActiveId('')
      closeSidebar()
   }, [aiLoading, closeSidebar])

   const handleSendMessage = useCallback(
      (message: string) => {
         if (!chatActiveId) {
            // * Creating a new Chat
            let newChatId = uuidv4()
            setChatList([
               {
                  id: newChatId,
                  title: message,
                  messages: [{ id: uuidv4(), author: 'me', body: message }],
               },
               ...chatList,
            ])

            setChatActiveId(newChatId)
         } else {
            // * Upadating existing chat
            let chatListClone = [...chatList]
            let chatIndex = chatListClone.findIndex(
               (item) => item.id === chatActiveId
            )

            chatListClone[chatIndex].messages.push({
               id: uuidv4(),
               author: 'me',
               body: message,
            })

            setChatList(chatListClone)
         }

         setAiLoading(true)
      },
      [chatActiveId, chatList]
   )

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

            <ChatArea chat={chatActive} loading={aiLoading} />

            <Footer onSendMessage={handleSendMessage} disabled={aiLoading} />
         </section>
      </main>
   )
}
