const isDate = (value) => {
  if (!value) {
    return false
  }

  const date = new Date(value)
  if (date instanceof Date) {
    return !isNaN(date.getTime())
  } else {
    return false
  }
}

module.exports = { isDate }