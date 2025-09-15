import { PerformanceMonitor, measureSync, measureAsync } from '../performance'

describe('PerformanceMonitor', () => {
  let monitor: PerformanceMonitor

  beforeEach(() => {
    monitor = new PerformanceMonitor()
  })

  afterEach(() => {
    monitor.clearMetrics()
  })

  describe('startTimer', () => {
    it('should measure execution time', async () => {
      const endTimer = monitor.startTimer('test-operation')
      
      // Simulate some work
      await new Promise(resolve => setTimeout(resolve, 10))
      
      endTimer()
      
      const metrics = monitor.getMetrics()
      expect(metrics['test-operation']).toBeDefined()
      expect(metrics['test-operation'].count).toBe(1)
      expect(metrics['test-operation'].average).toBeGreaterThan(0)
    })
  })

  describe('getAverageTime', () => {
    it('should return 0 for non-existent label', () => {
      const average = monitor.getAverageTime('non-existent')
      expect(average).toBe(0)
    })

    it('should calculate average correctly', () => {
      const endTimer1 = monitor.startTimer('test')
      endTimer1()
      
      const endTimer2 = monitor.startTimer('test')
      endTimer2()
      
      const average = monitor.getAverageTime('test')
      expect(average).toBeGreaterThan(0)
    })
  })
})

describe('measureSync', () => {
  it('should measure synchronous function execution', () => {
    const testFn = (a: number, b: number) => a + b
    const measuredFn = measureSync('sync-test', testFn)
    
    const result = measuredFn(2, 3)
    expect(result).toBe(5)
  })
})

describe('measureAsync', () => {
  it('should measure asynchronous function execution', async () => {
    const testFn = async (a: number, b: number) => {
      await new Promise(resolve => setTimeout(resolve, 10))
      return a + b
    }
    const measuredFn = measureAsync('async-test', testFn)
    
    const result = await measuredFn(2, 3)
    expect(result).toBe(5)
  })
})
