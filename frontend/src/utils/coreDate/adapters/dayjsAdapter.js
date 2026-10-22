import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import utc from 'dayjs/plugin/utc'

import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import dayOfYear from 'dayjs/plugin/dayOfYear'

import timezone from 'dayjs/plugin/timezone'

import 'dayjs/locale/ru'
import 'dayjs/locale/en'

dayjs.extend(localizedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrAfter)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(quarterOfYear)
dayjs.extend(dayOfYear)

dayjs.locale('ru')

export default class DayjsAdapter {
  static setLocale(locale = 'ru') {
    dayjs.locale(locale)
  }

  static parse(value, formats, strict = false) {
    return dayjs(value, formats, strict)
  }

  static toFormat(instance, locale, format = '') {
    if (format) {
      if (locale) {
        return instance.locale(locale).format(format)
      } else {
        return instance.format(format)
      }
    } else if (locale) {
      return instance.locale(locale).format()
    } else {
      return instance.format()
    }
  }

  static isInstance(value) {
    return value instanceof dayjs
  }

  static isValid(instance) {
    return instance.isValid()
  }

  static toISO(instance) {
    return instance.utc(true).toISOString()
  }

  static toUTC(instance) {
    return instance.utc()
  }

  static toDate(instance) {
    return instance.toDate()
  }

  static toUnix(instance) {
    return instance.unix()
  }

  static get(instance, partType) {
    return instance.get(partType)
  }

  static setStartOf(instance, partType) {
    return instance.startOf(partType)
  }

  static setEndOf(instance, partType) {
    return instance.endOf(partType)
  }

  static add(instance, partType, valueNeedToAdd) {
    return instance.add(valueNeedToAdd, partType)
  }

  static set(instance, partType, valueNeedToAdd) {
    return instance.set(partType, valueNeedToAdd)
  }

  static getDiff(firstInstance, secondInstance, partType) {
    return firstInstance.diff(secondInstance, partType)
  }
}
