'use client'

import clsx from 'clsx'
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { IconSend } from '../icons'

type ChatMessageProps = {
   disabled: boolean
   onSend: (message: string) => void
}

export const ChatMessageInput = ({ disabled, onSend }: ChatMessageProps) => {
   const [text, setText] = useState('')
   const textEl = useRef<HTMLTextAreaElement>(null)

   useEffect(() => {
      if (textEl.current) {
         textEl.current.style.height = '0px'
         let scrollHeight = textEl.current.scrollHeight
         textEl.current.style.height = `${scrollHeight}px`
      }
   }, [text, textEl])

   const handleSendMessage = useCallback(() => {
      if (!disabled && text.trim() !== '') {
         onSend(text)
         setText('')
      }
   }, [disabled, onSend, text])

   const handleTextKeyUp = useCallback(
      (event: KeyboardEvent<HTMLTextAreaElement>) => {
         if (event.code.toLowerCase() === 'enter' && !event.shiftKey) {
            event.preventDefault()
            handleSendMessage()
         }
      },
      [handleSendMessage]
   )

   return (
      <div
         className={clsx(
            'flex rounded-xl border border-gray-800/50 bg-gpt-lightgray p-2',
            disabled && 'opacity-50'
         )}
      >
         <textarea
            ref={textEl}
            className="h-7 max-h-48 flex-1 resize-none overflow-y-auto border-0 bg-transparent outline-none"
            placeholder="Envie uma mensagem."
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyUp={handleTextKeyUp}
            disabled={disabled}
         />
         <div
            role="button"
            onClick={handleSendMessage}
            className={clsx(
               'cursor-pointer self-end rounded-md p-1',
               text.length
                  ? 'bg-emerald-500 opacity-100 hover:bg-emerald-500/95'
                  : 'opacity-20'
            )}
         >
            <IconSend width={14} height={14} />
         </div>
      </div>
   )
}
