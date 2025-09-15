import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { database } from '@/lib/database'
import { DocumentsList } from '@/components/documents-list'
import { CreateDocumentButton } from '@/components/create-document-button'
import { Sidebar } from '@/components/sidebar'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { DocumentsPageClient } from '@/components/documents-page-client'

export default async function DocumentsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  const user = await database.getUserByClerkId(userId)
  if (!user) {
    redirect('/')
  }

  const documents = await database.getDocumentsByUserId(user.id)

  return (
    <DocumentsPageClient documents={documents} />
  )
}
