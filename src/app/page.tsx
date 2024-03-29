'use client'

import { ChatArea } from '@/components/ChatArea'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { SidebarChatButton } from '@/components/SidebarChatButton'
import { Chat } from '@/types/Chat'
import { openai } from '@/utils/openai'
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

   const getAIResponse = useCallback(async () => {
      let chatListClone = [...chatList]
      let chatIndex = chatListClone.findIndex(
         (item) => item.id === chatActiveId
      )

      if (chatIndex > -1) {
         const translated = openai.translateMessage(
            chatListClone[chatIndex].messages
         )
         const response = await openai.generate(translated)

         if (response) {
            chatListClone[chatIndex].messages.push({
               id: uuidv4(),
               author: 'ai',
               body: response,
            })
         }
      }

      setChatList(chatListClone)
      setAiLoading(false)
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

   const handleSelectChat = useCallback(
      (id: string) => {
         if (aiLoading) return

         let item = chatList.find((item) => item.id === id)
         if (item) setChatActiveId(item.id)

         closeSidebar()
      },
      [aiLoading, chatList, closeSidebar]
   )

   const handleDeleteChat = useCallback(
      (id: string) => {
         let chatListClone = [...chatList]
         let chatIndex = chatListClone.findIndex((item) => item.id === id)
         chatListClone.splice(chatIndex, 1)
         setChatList(chatListClone)
         setChatActiveId('')
      },
      [chatList]
   )

   const handleEditChat = useCallback(
      (id: string, newTitle: string) => {
         if (!newTitle) return

         let chatListClone = [...chatList]
         let chatIndex = chatListClone.findIndex((item) => item.id === id)
         chatListClone[chatIndex].title = newTitle
         setChatList(chatListClone)
      },
      [chatList]
   )

   return (
      <main className="flex min-h-screen bg-gpt-gray">
         <Sidebar
            open={sidebarOpened}
            onClose={closeSidebar}
            onClear={handleClearConversation}
            onNewChat={handleNewChat}
         >
            {chatList.map((item) => (
               <SidebarChatButton
                  key={item.id}
                  chatItem={item}
                  active={item.id === chatActiveId}
                  onClick={handleSelectChat}
                  onDelete={handleDeleteChat}
                  onEdit={handleEditChat}
               />
            ))}
         </Sidebar>

         <section className="flex w-full flex-col">
            <Header
               openSidebarClick={openSidebar}
               title={chatActive ? chatActive.title : 'Nova conversa'}
               newChatClick={handleNewChat}
            />

            <ChatArea chat={chatActive} loading={aiLoading} />

            <Footer onSendMessage={handleSendMessage} disabled={aiLoading} />
         </section>
      </main>
   )
}
