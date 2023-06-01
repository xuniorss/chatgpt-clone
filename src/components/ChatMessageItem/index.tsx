import { ChatMessage } from '@/types/ChatMessage'
import clsx from 'clsx'
import { IconRobot, IconUser } from '../icons'

type ChatMessageItemProps = {
   item: ChatMessage
}

export const ChatMessageItem = ({ item }: ChatMessageItemProps) => {
   return (
      <div className={clsx('py-5', item.author === 'ai' && 'bg-gray-600/50')}>
         <div className="m-auto flex max-w-4xl">
            <div
               className={clsx(
                  'mx-4 flex h-10 w-10 items-center justify-center rounded md:ml-0',
                  item.author === 'ai' ? 'bg-green-900' : 'bg-blue-900'
               )}
            >
               {item.author === 'me' && <IconUser width={24} height={24} />}
               {item.author === 'ai' && <IconRobot width={24} height={24} />}
            </div>
            <div className="flex-1 whitespace-pre-wrap text-base">
               {item.body}
            </div>
         </div>
      </div>
   )
}
