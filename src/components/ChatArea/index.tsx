import { Chat } from '@/types/Chat'
import { ChatPlaceholder } from '../ChatPlaceholder'

type ChatAreaProps = {
   chat: Chat | undefined
}

export const ChatArea = ({ chat }: ChatAreaProps) => {
   return (
      <section className="h-0 flex-auto overflow-y-scroll">
         {!chat && <ChatPlaceholder />}
         {chat && chat.message.map((item) => <div key={item.id}>...</div>)}
      </section>
   )
}
