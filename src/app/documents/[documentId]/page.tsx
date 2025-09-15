import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { database } from '@/lib/database'
import { DocumentEditor } from '@/components/document-editor'
import { Sidebar } from '@/components/sidebar'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { DocumentPageClient } from '@/components/document-page-client'
import { notFound } from 'next/navigation'

interface DocumentPageProps {
  params: {
    documentId: string
  }
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  const user = await database.getUserByClerkId(userId)
  if (!user) {
    redirect('/')
  }

  const document = await database.getDocumentById(params.documentId)
  const documents = await database.getDocumentsByUserId(user.id)

  if (!document) {
    notFound()
  }

  // Check if user owns this document
  if (document.userId !== user.id) {
    redirect('/documents')
  }

  return (
    <DocumentPageClient document={document} documents={documents} />
  )
}
