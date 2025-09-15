import { prisma } from './prisma'
import { cache, cacheKeys } from './cache'
import { measureAsync } from './performance'

export const database = {
  // User operations
  getUserByClerkId: measureAsync('getUserByClerkId', async (clerkId: string) => {
    const cacheKey = cacheKeys.user(clerkId)
    const cached = cache.get(cacheKey)
    
    if (cached) {
      return cached
    }

    const user = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (user) {
      cache.set(cacheKey, user)
    }

    return user
  }),

  async createUser(userData: {
    clerkId: string
    email: string
    firstName?: string
    lastName?: string
    imageUrl?: string
  }) {
    return await prisma.user.create({
      data: userData
    })
  },

  // Document operations
  async getDocumentsByUserId(userId: string) {
    const cacheKey = cacheKeys.documents(userId)
    const cached = cache.get(cacheKey)
    
    if (cached) {
      return cached
    }

    const documents = await prisma.document.findMany({
      where: {
        userId,
        isArchived: false,
        parentDocumentId: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    cache.set(cacheKey, documents)
    return documents
  },

  async getDocumentById(id: string) {
    const cacheKey = cacheKeys.document(id)
    const cached = cache.get(cacheKey)
    
    if (cached) {
      return cached
    }

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        children: {
          where: { isArchived: false },
          orderBy: { createdAt: 'asc' }
        },
        pages: {
          where: { isArchived: false },
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (document) {
      cache.set(cacheKey, document)
    }

    return document
  },

  async createDocument(data: {
    title: string
    userId: string
    parentDocumentId?: string
    icon?: string
    coverImage?: string
  }) {
    const document = await prisma.document.create({
      data
    })

    // Invalidate user's documents cache
    cache.clearPattern(`documents:${data.userId}`)
    
    return document
  },

  async updateDocument(id: string, data: {
    title?: string
    icon?: string
    coverImage?: string
    isPublished?: boolean
    isArchived?: boolean
  }) {
    const document = await prisma.document.update({
      where: { id },
      data
    })

    // Invalidate caches
    cache.delete(cacheKeys.document(id))
    cache.clearPattern(`documents:${document.userId}`)
    
    return document
  },

  async deleteDocument(id: string) {
    const document = await prisma.document.update({
      where: { id },
      data: { isArchived: true }
    })

    // Invalidate caches
    cache.delete(cacheKeys.document(id))
    cache.clearPattern(`documents:${document.userId}`)
    
    return document
  },

  // Page operations
  async getPageById(id: string) {
    return await prisma.page.findUnique({
      where: { id },
      include: {
        blocks: {
          orderBy: { order: 'asc' }
        }
      }
    })
  },

  async createPage(data: {
    title: string
    userId: string
    documentId?: string
    content?: string
  }) {
    return await prisma.page.create({
      data
    })
  },

  async updatePage(id: string, data: {
    title?: string
    content?: string
    icon?: string
    coverImage?: string
    isPublished?: boolean
    isArchived?: boolean
  }) {
    return await prisma.page.update({
      where: { id },
      data
    })
  },

  async deletePage(id: string) {
    return await prisma.page.update({
      where: { id },
      data: { isArchived: true }
    })
  },

  // Block operations
  async getBlocksByPageId(pageId: string) {
    return await prisma.block.findMany({
      where: { pageId },
      orderBy: { order: 'asc' }
    })
  },

  async createBlock(data: {
    type: string
    content?: string
    order: number
    pageId: string
    parentId?: string
  }) {
    return await prisma.block.create({
      data
    })
  },

  async updateBlock(id: string, data: {
    type?: string
    content?: string
    order?: number
  }) {
    return await prisma.block.update({
      where: { id },
      data
    })
  },

  async deleteBlock(id: string) {
    return await prisma.block.delete({
      where: { id }
    })
  },

  async reorderBlocks(blocks: { id: string; order: number }[]) {
    const updatePromises = blocks.map(block =>
      prisma.block.update({
        where: { id: block.id },
        data: { order: block.order }
      })
    )
    return await Promise.all(updatePromises)
  }
}
