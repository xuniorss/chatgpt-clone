import { IconAdd, IconMenu } from '../icons'

type HeaderProps = {
   openSidebarClick: () => void
   title: string
   newChatClick: () => void
}

export const Header = ({
   openSidebarClick,
   title,
   newChatClick,
}: HeaderProps) => {
   return (
      <header className="flex w-full items-center justify-between border-b border-b-gray-600 p-2 md:hidden">
         <div onClick={openSidebarClick}>
            <IconMenu width={24} height={24} />
         </div>

         <div className="mx-2 truncate">{title}</div>

         <div onClick={newChatClick}>
            <IconAdd width={24} height={24} />
         </div>
      </header>
   )
}
