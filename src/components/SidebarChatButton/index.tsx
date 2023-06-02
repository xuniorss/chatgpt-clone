'use client'

import { Chat } from '@/types/Chat'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import {
   IconChatLeft,
   IconCheck,
   IconClose,
   IconEdit3,
   IconTrash,
} from '../icons'

type SidebarChatBProps = {
   chatItem: Chat
   active: boolean
   onClick: (id: string) => void
   onDelete: (id: string) => void
   onEdit: (id: string, newTitle: string) => void
}

export const SidebarChatButton = ({
   chatItem,
   active,
   onClick,
   onDelete,
   onEdit,
}: SidebarChatBProps) => {
   const [deleting, setDeleting] = useState(false)
   const [editing, setEditing] = useState(false)
   const [titleInput, setTitleInput] = useState(chatItem.title)

   const handleClickButton = useCallback(() => {
      if (!deleting || !editing) onClick(chatItem.id)
   }, [chatItem.id, deleting, editing, onClick])

   const handleConfirmButton = useCallback(() => {
      if (deleting) onDelete(chatItem.id)

      if (editing && titleInput.trim() !== '')
         onEdit(chatItem.id, titleInput.trim())

      setDeleting(false)
      setEditing(false)
   }, [chatItem.id, deleting, editing, onDelete, onEdit, titleInput])

   const handleCancelButton = useCallback(() => {
      setDeleting(false)
      setEditing(false)
   }, [])

   return (
      <div
         onClick={handleClickButton}
         className={clsx(
            'flex cursor-pointer items-center rounded-md p-3 text-sm hover:bg-gray-500/10',
            active ? 'bg-gray-500/20' : 'bg-transparent'
         )}
      >
         <div className="mr-3">
            {!deleting && <IconChatLeft width={16} height={16} />}
            {deleting && <IconTrash width={16} height={16} />}
         </div>

         <div className="flex-1 overflow-x-hidden text-sm">
            {editing && (
               <input
                  type="text"
                  className="w-full border border-blue-500 bg-transparent text-sm outline-none"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
               />
            )}

            {!editing && (
               <div className="truncate border border-transparent">
                  {!deleting && chatItem.title}
                  {deleting && `Delete "${chatItem.title}"`}
               </div>
            )}
         </div>

         {active && !deleting && !editing && (
            <div className="flex">
               <div
                  onClick={() => setEditing(true)}
                  className="mx-1 cursor-pointer opacity-60 hover:opacity-100"
               >
                  <IconEdit3 width={16} height={16} />
               </div>

               <div
                  onClick={() => setDeleting(true)}
                  className="mx-1 cursor-pointer opacity-60 hover:opacity-100"
               >
                  <IconTrash width={16} height={16} />
               </div>
            </div>
         )}

         {(deleting || editing) && (
            <div className="flex">
               <div
                  onClick={handleConfirmButton}
                  className="mx-1 cursor-pointer opacity-60 hover:opacity-100"
               >
                  <IconCheck width={16} height={16} />
               </div>

               <div
                  onClick={handleCancelButton}
                  className="mx-1 cursor-pointer opacity-60 hover:opacity-100"
               >
                  <IconClose width={16} height={16} />
               </div>
            </div>
         )}
      </div>
   )
}
