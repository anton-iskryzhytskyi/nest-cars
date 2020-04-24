import { ParseOptionalBoolPipe } from './parse-optional-bool-pipe'

describe('ParseOptionalBoolPipe', () => {
  describe('#describe', () => {

    it('should return undefined if input is undefined', () => {
      const pipe = new ParseOptionalBoolPipe()

      const result = pipe.transform(undefined)

      expect(result).toBeUndefined()
    })

    it('should return true if input is string "true"', () => {
      const pipe = new ParseOptionalBoolPipe()

      const result = pipe.transform('true')

      expect(result).toBe(true)
    })

    it('should return true if input is true', () => {
      const pipe = new ParseOptionalBoolPipe()

      const result = pipe.transform(true)

      expect(result).toBe(true)
    })

    it('should return true if input is string "false"', () => {
      const pipe = new ParseOptionalBoolPipe()

      const result = pipe.transform('false')

      expect(result).toBe(false)
    })

    it('should return true if input is false', () => {
      const pipe = new ParseOptionalBoolPipe()

      const result = pipe.transform(false)

      expect(result).toBe(false)
    })

    it('should throw an error if input can`n be parsed into true / false and isn`t undefined', () => {
      const pipe = new ParseOptionalBoolPipe()

      expect(() => pipe.transform('truuuu')).toThrow()
    })

  })
})
