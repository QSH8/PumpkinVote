import { FORMATS } from '../constants'

export class Validator {
  #adapter

  constructor(adapter) {
    this.#adapter = adapter
  }

  isValidInstance(instance) {
    return this.#adapter.isInstance(instance) && this.#adapter.isValid(instance)
  }

  /**
   * Определяет тип значения для дальнейшего парсинга
   *
   * @param {*} value
   * @returns {Boolean}
   */
  validType(value) {
    if (this.checkIsAdapterInstance(value)) return 'dayjs'
    if (this.checkIsDate(value)) return 'date'
    if (this.checkIsFormatString(value)) return 'string'
    if (this.checkIsIso(value)) return 'iso'

    return false
  }

  /**
   * Значение в ISO может прийти с бэка в разном формате,
   * как со смещением, так и без - унифицируем значение
   *
   * @param {*} value
   * @returns {String}
   */
  toValidISOString(value) {
    return value.split('.')[0]
  }

  validNumber(value) {
    const numberValue = Number(value)

    if (!isNaN(numberValue)) return numberValue

    return false
  }

  checkIsAdapterInstance(value) {
    return this.#adapter.isInstance(value)
  }

  /**
   * Проверка входящего значения на принадлежность к классу Date
   * @param {*} value
   * @returns
   */
  checkIsDate(value) {
    return value instanceof Date
  }

  /**
   * Проверка входящего значения на cooтветствие формату ISO
   * @param {*} value
   * @returns
   */
  checkIsIso(value) {
    const instance = this.#adapter.parse(value, FORMATS.DEFAULT_ISO_FORMAT)

    return this.isValidInstance(instance)
  }

  /**
   * Проверка входящего значения на соответствие
   * одному из поддерживаемых форматов
   * @param {*} value
   * @returns
   */
  checkIsFormatString(value) {
    const instance = this.#adapter.parse(value, [FORMATS.DEFAULT_DATE_FORMAT, FORMATS.DEFAULT_DATE_TIME_FORMAT], true)

    return this.isValidInstance(instance)
  }

  /**
   * Проверка на строгое (с разделителями) соответствие
   * входящей строки даты переданному формату
   *
   * @param {String} str
   * @param {String} format
   * @returns {Boolean}
   */
  #isStringMatchesFormat(str, format) {
    if (str) {
      const instance = this.#adapter.parse(str, format)
      return this.isValidInstance(instance)
    }

    return false
  }

  /**
   * Определяет формат из объявленных в константах
   *
   * @param {String} str
   */
  defineStringFormat(str) {
    return Object.values(FORMATS).find((format) => this.#isStringMatchesFormat(str, format))
  }
}
