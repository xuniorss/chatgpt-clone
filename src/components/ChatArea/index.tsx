import { Chat } from '@/types/Chat'
import { ChatMessageItem } from '../ChatMessageItem'
import { ChatPlaceholder } from '../ChatPlaceholder'

type ChatAreaProps = {
   chat: Chat | undefined
}

export const ChatArea = ({ chat }: ChatAreaProps) => {
   return (
      <section className="h-0 flex-auto overflow-y-scroll">
         {!chat && <ChatPlaceholder />}
         {chat &&
            chat.message.map((item) => (
               <ChatMessageItem key={item.id} item={item} />
            ))}
      </section>
   )
}
