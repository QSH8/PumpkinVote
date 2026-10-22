import DayjsAdapter from './adapters/dayjsAdapter.js'
import Processor from './services/Processor.js'
import { FORMATS, DATE_PARTS, DATE_PART_NAMES } from './constants.js'

export default class CoreDate {
  static #adapter = DayjsAdapter
  static #processor = new Processor(this.#adapter)

  static isValid(value, format = '') {
    return this.#processor.isValid(value, format)
  }

  static isEqual(first, second) {
    return this.#processor.isEqual(first, second)
  }

  static isFirstGreaterThanSecond(first, second) {
    return this.#processor.isFirstGreaterThanSecond(first, second)
  }

  static getUnix(value) {
    return this.#processor.getUnix(value)
  }

  static toISO(value) {
    return this.#processor.convert(value, 'iso')
  }

  static toDate(value) {
    return this.#processor.convert(value, 'date')
  }

  static toStringDateTime(value) {
    return this.#processor.convert(value, 'string', { neededFormat: FORMATS.DEFAULT_DATE_TIME_FORMAT })
  }

  static toStringDate(value) {
    return this.#processor.convert(value, 'string', { neededFormat: FORMATS.DEFAULT_DATE_FORMAT })
  }

  static toStringByFormat(value, neededFormat, locale) {
    return this.#processor.convert(value, 'string', { neededFormat, locale })
  }

  static toStringCustomFormat(value, fromFormat, neededFormat) {
    return this.#processor.convert(value, 'string', { fromFormat, neededFormat })
  }

  static getDayOfWeekShortName(value) {
    return this.toStringByFormat(value, DATE_PART_NAMES.DAY_OF_WEEK.SHORT)
  }

  static getDayOfWeekFullName(value) {
    return this.toStringByFormat(value, DATE_PART_NAMES.DAY_OF_WEEK.FULL)
  }

  static getMonthShortName(value) {
    return this.toStringByFormat(value, DATE_PART_NAMES.MONTH.SHORT)
  }

  static getMonthFullName(value) {
    return this.toStringByFormat(value, DATE_PART_NAMES.MONTH.FULL)
  }

  static getDayOfWeek(value) {
    return this.#processor.getPart(value, DATE_PARTS.DAY_OF_WEEK)
  }

  static getDayOfMonth(value) {
    return this.#processor.getPart(value, DATE_PARTS.DAY_OF_MONTH)
  }

  static getMonth(value) {
    return this.#processor.getPart(value, DATE_PARTS.MONTH)
  }

  static getYear(value) {
    return this.#processor.getPart(value, DATE_PARTS.YEAR)
  }

  static getHour(value) {
    return this.#processor.getPart(value, DATE_PARTS.HOUR)
  }

  static getMinute(value) {
    return this.#processor.getPart(value, DATE_PARTS.MINUTE)
  }

  static getSecond(value) {
    return this.#processor.getPart(value, DATE_PARTS.SECOND)
  }

  static getMillisecond(value) {
    return this.#processor.getPart(value, DATE_PARTS.MILLISECOND)
  }

  static addDays(currentValue, valueNeedToAdd) {
    return this.#processor.addPart(currentValue, valueNeedToAdd, DATE_PARTS.DAY_OF_WEEK)
  }

  static addWeeks(currentValue, valueNeedToAdd) {
    return this.#processor.addPart(currentValue, valueNeedToAdd, DATE_PARTS.WEEK)
  }

  static addMonths(currentValue, valueNeedToAdd) {
    return this.#processor.addPart(currentValue, valueNeedToAdd, DATE_PARTS.MONTH)
  }

  static addYears(currentValue, valueNeedToAdd) {
    return this.#processor.addPart(currentValue, valueNeedToAdd, DATE_PARTS.YEAR)
  }

  static addHours(currentValue, valueNeedToAdd) {
    return this.#processor.addPart(currentValue, valueNeedToAdd, DATE_PARTS.HOUR)
  }

  static addMinutes(currentValue, valueNeedToAdd) {
    return this.#processor.addPart(currentValue, valueNeedToAdd, DATE_PARTS.MINUTE)
  }

  static addSeconds(currentValue, valueNeedToAdd) {
    return this.#processor.addPart(currentValue, valueNeedToAdd, DATE_PARTS.SECOND)
  }

  static addMilliseconds(currentValue, valueNeedToAdd) {
    return this.#processor.addPart(currentValue, valueNeedToAdd, DATE_PARTS.MILLISECOND)
  }

  static setDays(currentValue, valueNeedToAdd) {
    return this.#processor.setPart(currentValue, valueNeedToAdd, DATE_PARTS.DAY_OF_MONTH)
  }

  static setMonths(currentValue, valueNeedToAdd) {
    return this.#processor.setPart(currentValue, valueNeedToAdd - 1, DATE_PARTS.MONTH)
  }

  static setYears(currentValue, valueNeedToAdd) {
    return this.#processor.setPart(currentValue, valueNeedToAdd, DATE_PARTS.YEAR)
  }

  static setHours(currentValue, valueNeedToAdd) {
    return this.#processor.setPart(currentValue, valueNeedToAdd, DATE_PARTS.HOUR)
  }

  static setMinutes(currentValue, valueNeedToAdd) {
    return this.#processor.setPart(currentValue, valueNeedToAdd, DATE_PARTS.MINUTE)
  }

  static setSeconds(currentValue, valueNeedToAdd) {
    return this.#processor.setPart(currentValue, valueNeedToAdd, DATE_PARTS.SECOND)
  }

  static setMilliseconds(currentValue, valueNeedToAdd) {
    return this.#processor.setPart(currentValue, valueNeedToAdd, DATE_PARTS.MILLISECOND)
  }

  static getFirstGreaterSecondDiffOnDays(first, second) {
    return this.#processor.getFirstGreaterSecondDiff(first, second, DATE_PARTS.DAY_OF_WEEK)
  }

  static getFirstGreaterSecondDiffOnWeeks(first, second) {
    return this.#processor.getFirstGreaterSecondDiff(first, second, DATE_PARTS.WEEK)
  }

  static getFirstGreaterSecondDiffOnMonths(first, second) {
    return this.#processor.getFirstGreaterSecondDiff(first, second, DATE_PARTS.MONTH)
  }

  static getFirstGreaterSecondDiffOnYears(first, second) {
    return this.#processor.getFirstGreaterSecondDiff(first, second, DATE_PARTS.YEAR)
  }

  static getFirstGreaterSecondDiffOnHours(first, second) {
    return this.#processor.getFirstGreaterSecondDiff(first, second, DATE_PARTS.HOUR)
  }

  static getFirstGreaterSecondDiffOnMinutes(first, second) {
    return this.#processor.getFirstGreaterSecondDiff(first, second, DATE_PARTS.MINUTE)
  }

  static getFirstGreaterSecondDiffOnSeconds(first, second) {
    return this.#processor.getFirstGreaterSecondDiff(first, second, DATE_PARTS.SECOND)
  }

  static getFirstGreaterSecondDiffOnMilliseconds(first, second) {
    return this.#processor.getFirstGreaterSecondDiff(first, second, DATE_PARTS.MILLISECOND)
  }

  static setStartOfYear(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.YEAR, 'start')
  }

  static setStartOfDay(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.DAY_OF_MONTH, 'start')
  }

  static setStartOfWeek(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.WEEK, 'start')
  }

  static setStartOfMonth(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.MONTH, 'start')
  }

  static setStartOfHour(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.HOUR, 'start')
  }

  static setStartOfMinute(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.MINUTE, 'start')
  }

  static setStartOfSecond(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.SECOND, 'start')
  }

  static setEndOfYear(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.YEAR, 'end')
  }

  static setEndOfDay(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.DAY_OF_MONTH, 'end')
  }

  static setEndOfWeek(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.WEEK, 'end')
  }

  static setEndOfMonth(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.MONTH, 'end')
  }

  static setEndOfHour(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.HOUR, 'end')
  }

  static setEndOfMinute(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.MINUTE, 'end')
  }

  static setEndOfSecond(value) {
    return this.#processor.setStartingPoint(value, DATE_PARTS.SECOND, 'end')
  }
}
