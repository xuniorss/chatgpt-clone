import { Chat } from '@/types/Chat'
import { ChatMessageItem } from '../ChatMessageItem'
import { ChatMessageLoading } from '../ChatMessageLoading'
import { ChatPlaceholder } from '../ChatPlaceholder'

type ChatAreaProps = {
   chat: Chat | undefined
   loading: boolean
}

export const ChatArea = ({ chat, loading }: ChatAreaProps) => {
   return (
      <section className="h-0 flex-auto overflow-y-scroll">
         {!chat && <ChatPlaceholder />}
         {chat &&
            chat.messages.map((item) => (
               <ChatMessageItem key={item.id} item={item} />
            ))}

         {loading && <ChatMessageLoading />}
      </section>
   )
}
