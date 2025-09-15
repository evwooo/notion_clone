'use client'

import { useState } from 'react'
import { DocumentsList } from '@/components/documents-list'
import { CreateDocumentButton } from '@/components/create-document-button'
import { Sidebar } from '@/components/sidebar'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface Document {
  id: string
  title: string
  icon?: string
  isPublished: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

interface DocumentsPageClientProps {
  documents: Document[]
}

export function DocumentsPageClient({ documents }: DocumentsPageClientProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="h-screen flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar documents={documents} />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        documents={documents}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Documents</h1>
          <CreateDocumentButton />
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-2xl font-semibold">Documents</h1>
          <CreateDocumentButton />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <DocumentsList documents={documents} />
        </div>
      </div>
    </div>
  )
}
