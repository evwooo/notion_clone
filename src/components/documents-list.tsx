'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, Folder, MoreHorizontal, Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDate } from '@/lib/utils'

interface Document {
  id: string
  title: string
  icon?: string
  coverImage?: string
  isPublished: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
  children: Document[]
  pages: any[]
}

interface DocumentsListProps {
  documents: Document[]
}

export function DocumentsList({ documents }: DocumentsListProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  const handleEdit = (document: Document) => {
    setIsEditing(document.id)
    setEditingTitle(document.title)
  }

  const handleSave = async (documentId: string) => {
    // TODO: Implement save functionality
    setIsEditing(null)
  }

  const handleDelete = async (documentId: string) => {
    // TODO: Implement delete functionality
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <FileText className="h-12 w-12 text-slate-400 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
          No documents yet
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Get started by creating your first document
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {documents.map((document) => (
        <div
          key={document.id}
          className="group relative bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
        >
          <Link href={`/documents/${document.id}`} className="block">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {document.icon ? (
                    <span className="text-2xl">{document.icon}</span>
                  ) : (
                    <FileText className="h-5 w-5 text-slate-500" />
                  )}
                  {isEditing === document.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => handleSave(document.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSave(document.id)
                        }
                        if (e.key === 'Escape') {
                          setIsEditing(null)
                        }
                      }}
                      className="text-sm font-medium bg-transparent border-none outline-none flex-1"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {document.title}
                    </h3>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(document)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(document.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Updated {formatDate(document.updatedAt)}
              </p>
              {(document.children.length > 0 || document.pages.length > 0) && (
                <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {document.children.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Folder className="h-3 w-3" />
                      <span>{document.children.length} folders</span>
                    </div>
                  )}
                  {document.pages.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <FileText className="h-3 w-3" />
                      <span>{document.pages.length} pages</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
