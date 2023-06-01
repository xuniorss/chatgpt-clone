'use client'

import { Sidebar } from '@/components/Sidebar'
import { useCallback, useState } from 'react'

export default function Home() {
   const [sidebarOpened, setSidebarOpened] = useState(false)

   const closeSidebar = useCallback(() => {
      setSidebarOpened(false)
   }, [])

   const handleClearConversation = useCallback(() => {}, [])
   const handleNewChat = useCallback(() => {}, [])

   return (
      <main className="flex min-h-screen bg-gpt-gray">
         <Sidebar
            open={sidebarOpened}
            onClose={closeSidebar}
            onClear={handleClearConversation}
            onNewChat={handleNewChat}
         >
            {Array.from({ length: 50 }).map((_, i) => (
               <div key={i} className="mb-2 h-96 w-16 bg-red-200">
                  content
               </div>
            ))}
         </Sidebar>

         <section className="flex w-full flex-col">
            <button onClick={() => setSidebarOpened(true)}>
               Abrir Sidebar
            </button>
         </section>
      </main>
   )
}
