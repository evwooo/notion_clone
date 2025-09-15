// Simple in-memory cache for development
// In production, consider using Redis or similar

interface CacheItem {
  value: any
  expires: number
}

class Cache {
  private cache = new Map<string, CacheItem>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, value: any, ttl = this.defaultTTL) {
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl,
    })
  }

  get(key: string) {
    const item = this.cache.get(key)
    
    if (!item) {
      return null
    }

    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  delete(key: string) {
    this.cache.delete(key)
  }

  clear() {
    this.cache.clear()
  }

  // Clear cache entries that match a pattern
  clearPattern(pattern: string) {
    const regex = new RegExp(pattern)
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key)
      }
    }
  }
}

export const cache = new Cache()

// Cache key generators
export const cacheKeys = {
  user: (clerkId: string) => `user:${clerkId}`,
  documents: (userId: string) => `documents:${userId}`,
  document: (documentId: string) => `document:${documentId}`,
  page: (pageId: string) => `page:${pageId}`,
}
