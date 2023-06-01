import { ReactNode } from 'react'
import clsx from 'clsx'
import { IconAdd, IconClose, IconTrash } from '../icons'
import { SidebarButton } from '../SidebarButton'

type SidebarProps = {
   open: boolean
   onClose: () => void
   onClear: () => void
   onNewChat: () => void
   children: ReactNode
}

export const Sidebar = ({
   open,
   onClose,
   onClear,
   onNewChat,
   children,
}: SidebarProps) => {
   return (
      <section
         className={clsx(
            'fixed inset-y-0 left-0 text-white md:static md:w-64',
            open ? 'w-screen bg-gray-600/75' : 'w-0'
         )}
      >
         <div
            className={clsx(
               'flex h-screen transition-all duration-200 md:ml-0',
               open ? 'ml-0' : '-ml-96'
            )}
         >
            <div className="flex w-64 flex-col bg-gpt-sidebar p-2">
               <div
                  role="button"
                  onClick={onNewChat}
                  className="flex cursor-pointer items-center rounded-md border border-white/20 p-3 text-sm hover:bg-gray-500/20"
               >
                  <IconAdd width={16} height={16} className="mr-3" />
                  Nova conversa
               </div>

               <nav className="flex-1 overflow-y-auto pt-2">{children}</nav>

               <div className="border-t border-gray-700 pt-2">
                  <SidebarButton
                     icon={<IconTrash />}
                     label="Limpar todas as conversas"
                     onClick={onClear}
                  />
               </div>
            </div>

            <div
               onClick={onClose}
               className="flex h-10 w-10 cursor-pointer items-center justify-center md:hidden"
            >
               <IconClose width={24} height={24} />
            </div>
         </div>
      </section>
   )
}
