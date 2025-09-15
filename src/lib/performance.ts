// Performance monitoring utilities

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTimer(label: string): () => void {
    const start = performance.now()
    
    return () => {
      const end = performance.now()
      const duration = end - start
      
      if (!this.metrics.has(label)) {
        this.metrics.set(label, [])
      }
      
      this.metrics.get(label)!.push(duration)
      
      // Keep only last 100 measurements
      const measurements = this.metrics.get(label)!
      if (measurements.length > 100) {
        measurements.shift()
      }
    }
  }

  getAverageTime(label: string): number {
    const measurements = this.metrics.get(label)
    if (!measurements || measurements.length === 0) {
      return 0
    }
    
    return measurements.reduce((sum, time) => sum + time, 0) / measurements.length
  }

  getMetrics(): Record<string, { average: number; count: number; latest: number }> {
    const result: Record<string, { average: number; count: number; latest: number }> = {}
    
    for (const [label, measurements] of this.metrics.entries()) {
      result[label] = {
        average: this.getAverageTime(label),
        count: measurements.length,
        latest: measurements[measurements.length - 1] || 0
      }
    }
    
    return result
  }

  clearMetrics(): void {
    this.metrics.clear()
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance()

// Higher-order function for measuring async operations
export function measureAsync<T extends any[], R>(
  label: string,
  fn: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    const endTimer = performanceMonitor.startTimer(label)
    try {
      const result = await fn(...args)
      return result
    } finally {
      endTimer()
    }
  }
}

// Higher-order function for measuring sync operations
export function measureSync<T extends any[], R>(
  label: string,
  fn: (...args: T) => R
): (...args: T) => R {
  return (...args: T): R => {
    const endTimer = performanceMonitor.startTimer(label)
    try {
      const result = fn(...args)
      return result
    } finally {
      endTimer()
    }
  }
}

// Database query optimization helpers
export const queryOptimizations = {
  // Select only needed fields
  selectFields: <T extends Record<string, any>>(fields: (keyof T)[]) => {
    return fields.reduce((acc, field) => {
      acc[field] = true
      return acc
    }, {} as Record<keyof T, boolean>)
  },

  // Pagination helper
  paginate: (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit
    return { skip, take: limit }
  },

  // Sort helper
  sortBy: (field: string, order: 'asc' | 'desc' = 'asc') => {
    return { [field]: order }
  }
}
