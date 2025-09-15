import { generateId, formatDate, getInitials } from '../utils'

describe('Utils', () => {
  describe('generateId', () => {
    it('should generate a string', () => {
      const id = generateId()
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })

    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15T12:00:00Z')
      const formatted = formatDate(date)
      expect(formatted).toBe('Jan 15, 2024')
    })
  })

  describe('getInitials', () => {
    it('should return initials from first and last name', () => {
      const initials = getInitials('John', 'Doe')
      expect(initials).toBe('JD')
    })

    it('should return single initial from first name only', () => {
      const initials = getInitials('John', '')
      expect(initials).toBe('J')
    })

    it('should return single initial from last name only', () => {
      const initials = getInitials('', 'Doe')
      expect(initials).toBe('D')
    })

    it('should return U when no names provided', () => {
      const initials = getInitials('', '')
      expect(initials).toBe('U')
    })
  })
})
