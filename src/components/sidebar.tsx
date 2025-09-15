'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FileText,
  Search,
  Plus,
  Star,
  Trash2,
  Settings,
  User,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  documents: Array<{
    id: string
    title: string
    icon?: string
    isPublished: boolean
    isArchived: boolean
    createdAt: Date
    updatedAt: Date
  }>
}

export function Sidebar({ documents }: SidebarProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-semibold">Notion Clone</span>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {/* Quick Actions */}
          <div className="space-y-1 mb-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link href="/documents">
                <FileText className="h-4 w-4 mr-2" />
                All Documents
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Star className="h-4 w-4 mr-2" />
              Favorites
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Trash
            </Button>
          </div>

          {/* Documents List */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Documents
            </div>
            {filteredDocuments.map((document) => (
              <Button
                key={document.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left h-auto p-2",
                  pathname === `/documents/${document.id}` && "bg-slate-100 dark:bg-slate-800"
                )}
                asChild
              >
                <Link href={`/documents/${document.id}`}>
                  <div className="flex items-center space-x-2 w-full">
                    {document.icon ? (
                      <span className="text-lg">{document.icon}</span>
                    ) : (
                      <FileText className="h-4 w-4 text-slate-400" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {document.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(document.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
