import { Validator } from './Validator'

export default class Processor {
  #adapter
  #validator

  constructor(adapter) {
    this.#adapter = adapter
    this.#validator = new Validator(this.#adapter)
  }

  /**
   * Возвращает инстанс на основе переданного значения
   *
   * @param {String|Date|Object} value
   * @param {String} customFormat
   * @returns {Object}
   */
  getInstance(value, fromFormat = '') {
    let instance
    let type
    let format

    if ('' !== fromFormat) {
      instance = this.#adapter.parse(value, fromFormat)
      if (!this.#validator.isValidInstance(instance)) {
        instance = null
      }
    } else {
      type = this.#validator.validType(value)

      if (!type) {
        instance = null
      } else {
        switch (type) {
          case 'dayjs':
            instance = value
            break
          case 'date':
            instance = this.#adapter.parse(value)
            break
          case 'iso':
            value = this.#validator.toValidISOString(value)

            instance = this.#adapter.parse(value)
            break
          case 'string':
            format = this.#validator.defineStringFormat(value)

            instance = this.#adapter.parse(value, format)
            break
        }
      }
    }

    return { instance, type, format }
  }

  /**
   * Получает инстанс; форматирует в зависимости от типа
   *
   * @param {String|Date|Object} value
   * @param {String} type
   * @param {Object} options
   * @returns
   */
  convert(value, type, options = {}) {
    const { instance } = this.getInstance(value, options.fromFormat)

    if (null === instance) {
      console.log(`Can not create instance on value: ${value}`)
      return null
    }

    switch (type) {
      case 'instance': {
        return this.#toInstance(instance)
      }
      case 'iso': {
        return this.#toISO(instance)
      }
      case 'date': {
        return this.#toDate(instance)
      }
      case 'string': {
        return this.#toString(instance, options)
      }
    }
  }

  #toInstance(instance) {
    return this.#adapter.parse(instance)
  }
  #toISO(instance) {
    return this.#adapter.toISO(instance)
  }
  #toDate(instance) {
    return this.#adapter.toDate(instance)
  }
  #toString(instance, { neededFormat, locale }) {
    return this.#adapter.toFormat(instance, locale, neededFormat)
  }

  getUnix(value) {
    const { instance } = this.getInstance(value)
    return this.#validator.isValidInstance(instance) ? this.#adapter.toUnix(instance) : null
  }

  /**
   * Метод получения какой-либо части даты в валидном формате
   *
   * @param {*} value
   * @param {String} partType
   * @returns {value}
   */
  getPart(value, partType) {
    const { instance } = this.getInstance(value)

    return this.#validator.isValidInstance(instance) ? this.#adapter.get(instance, partType) : null
  }

  /**
   * Устанавливает нальное положение даты value
   * в начале или конце pointType
   * определённой части partType
   *
   * @param {*} value
   * @param {String} partType
   * @param {String} pointType
   * @returns {value}
   */
  setStartingPoint(value, partType, pointType) {
    const { instance, type, format } = this.getInstance(value)

    if (!this.#validator.isValidInstance(instance)) return null

    let newInstance
    switch (pointType) {
      case 'start':
        newInstance = this.#adapter.setStartOf(instance, partType)
        break
      case 'end':
        newInstance = this.#adapter.setEndOf(instance, partType)
        break
    }

    return newInstance ? this.convert(newInstance, type, { neededFormat: format }) : null
  }

  /**
   * Метод добавления значения valueNeedToAdd какой-либо части partType
   * к дате в валидном формате currentValue
   * Возвращает в том же формате, что и пришло
   *
   * @param {*} currentValue
   * @param {String} partType
   * @param {Number} valueNeedToAdd
   * @returns {currentValue}
   */
  addPart(currentValue, valueNeedToAdd, partType) {
    return this.#modify(currentValue, valueNeedToAdd, partType, 'add')
  }

  /**
   * Метод установки(замены) какой-либо части в дате в валидном формате
   * Возвращает новую дату с изменённой частью в том же формате, что и пришло
   *
   * @param {*} currentValue
   * @param {String} partType
   * @param {Number} valueNeedToAdd
   * @returns {currentValue}
   */
  setPart(currentValue, valueNeedToAdd, partType) {
    return this.#modify(currentValue, valueNeedToAdd, partType, 'set')
  }

  /**
   * Добавляет или устанвливает (operation)
   * значение valueNeedToAdd к дате currentValue в части addType
   *
   * @param {*} currentValue
   * @param {Number} valueNeedToAdd
   * @param {String} addType
   * @param {String} operation
   * @returns {currentValue}
   */
  #modify(currentValue, valueNeedToAdd, addType, operation) {
    const validNumber = this.#validator.validNumber(valueNeedToAdd)

    if (false === validNumber) return currentValue

    const { instance, type, format } = this.getInstance(currentValue)

    if (!this.#validator.isValidInstance(instance)) return currentValue

    const newInstance = this.#adapter[operation](instance, addType, validNumber)

    return this.convert(newInstance, type, { neededFormat: format })
  }

  isFirstGreaterThanSecond(first, second) {
    const firstUnix = this.getUnix(first)
    const secondUnix = this.getUnix(second)

    return firstUnix > secondUnix
  }

  isEqual(first, second) {
    const firstUnix = this.getUnix(first)
    const secondUnix = this.getUnix(second)

    return firstUnix === secondUnix
  }

  /**
   * Метод получения различия в виде числа
   * первой first от второй second даты
   * в нужной части partType
   *
   * @param {*} first
   * @param {*} second
   * @param {String} partType
   * @returns
   */
  getFirstGreaterSecondDiff(first, second, partType) {
    const firstInstanse = this.getInstance(first)
    const secondInstance = this.getInstance(second)

    if (!firstInstanse.type || !secondInstance.type) return null

    return this.#adapter.getDiff(firstInstanse.instance, secondInstance.instance, partType)
  }

  isValid(value, format = '') {
    const { instance } = format ? this.getInstance(value, format) : this.getInstance(value)

    return this.#validator.isValidInstance(instance)
  }
}
