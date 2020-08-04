import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => {
  return {
    isEmail (): boolean {
      return true
    }
  }
})

describe('EmailValidator adapter', () => {
  test('Should return false if validator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator return true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct value', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')
    expect(isEmailSpy).toBeCalledWith('any_email@email.com')
  })
})
