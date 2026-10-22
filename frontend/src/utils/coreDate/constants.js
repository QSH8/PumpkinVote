const FORMATS = {
  DEFAULT_DATE_TIME_FORMAT: 'DD.MM.YYYY HH:mm',
  DEFAULT_DATE_FORMAT: 'DD.MM.YYYY',
  DEFAULT_ISO_FORMAT: 'YYYY-MM-DD HH:mm',
}

const DATE_PARTS = {
  DAY_OF_MONTH: 'date',
  DAY_OF_WEEK: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
  HOUR: 'hour',
  MINUTE: 'minute',
  SECOND: 'second',
  MILLISECOND: 'millisecond',
}

const DATE_PART_NAMES = {
  DAY_OF_WEEK: {
    SHORT: 'dd',
    FULL: 'dddd',
  },
  MONTH: {
    SHORT: 'MMM',
    FULL: 'MMMM',
    ORDINAL: 'Do',
  },
  MERIDIEM: {
    UPPERCASE: 'A',
    LOWERCASE: 'a',
  },
}

export { FORMATS, DATE_PARTS, DATE_PART_NAMES }
