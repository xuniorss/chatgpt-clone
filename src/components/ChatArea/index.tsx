'use client'

import { Chat } from '@/types/Chat'
import { useEffect, useRef } from 'react'
import { ChatMessageItem } from '../ChatMessageItem'
import { ChatMessageLoading } from '../ChatMessageLoading'
import { ChatPlaceholder } from '../ChatPlaceholder'

type ChatAreaProps = {
   chat: Chat | undefined
   loading: boolean
}

export const ChatArea = ({ chat, loading }: ChatAreaProps) => {
   const scrollArea = useRef<HTMLDivElement>(null)

   useEffect(() => {
      scrollArea.current?.scrollTo(0, scrollArea.current?.scrollHeight)
   }, [loading, chat?.messages.length])

   return (
      <section ref={scrollArea} className="h-0 flex-auto overflow-y-scroll">
         {!chat && <ChatPlaceholder />}
         {chat &&
            chat.messages.map((item) => (
               <ChatMessageItem key={item.id} item={item} />
            ))}

         {loading && <ChatMessageLoading />}
      </section>
   )
}
