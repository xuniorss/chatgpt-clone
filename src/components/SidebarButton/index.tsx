import { ReactNode } from 'react'

type SidebarButtonProps = {
   icon: ReactNode
   label: string
   onClick: () => void
}

export const SidebarButton = ({ icon, label, onClick }: SidebarButtonProps) => {
   return (
      <div
         role="button"
         onClick={onClick}
         className="flex cursor-pointer items-center rounded-md p-3 text-sm hover:bg-gray-500/20"
      >
         <div className="mr-3">{icon}</div>
         <span className="flex-1 truncate">{label}</span>
      </div>
   )
}
