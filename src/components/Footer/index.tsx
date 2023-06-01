import Link from 'next/link'
import { ChatMessageInput } from '../ChatMessageInput'

type FooterProps = {
   disabled: boolean
   onSendMessage: (message: string) => void
}

export const Footer = ({ disabled, onSendMessage }: FooterProps) => {
   return (
      <footer className="w-full border-t border-t-gray-600 p-2">
         <div className="m-auto max-w-4xl">
            <ChatMessageInput onSend={onSendMessage} disabled={disabled} />
            <div className="pt-3 text-center text-xs text-gray-300">
               Free Research Preview. ChatGPT may produce inaccurate information
               about people, places, or facts.{' '}
               <Link
                  className="cursor-pointer underline"
                  href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
               >
                  ChatGPT May 24 Version
               </Link>
            </div>
         </div>
      </footer>
   )
}
