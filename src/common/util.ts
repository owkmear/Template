import _ from 'lodash'

const toReadableMonth = (month: number): string => {
  switch (month) {
    case 0:
      return 'Янв'
    case 1:
      return 'Фев'
    case 2:
      return 'Мар'
    case 3:
      return 'Апр'
    case 4:
      return 'Май'
    case 5:
      return 'Июн'
    case 6:
      return 'Июл'
    case 7:
      return 'Авг'
    case 8:
      return 'Сен'
    case 9:
      return 'Окт'
    case 10:
      return 'Ноя'
    case 11:
      return 'Дек'
    default:
      return ''
  }
}

export function parseDate(timestamp: number): string {
  const date = new Date(timestamp)
  return `${toReadableMonth(date.getMonth())} ${date.getDate()}`
}

export function showErrorToast(message: string): void {
  alert(message)
}

export const compareData = (fields: string[], newData: any, oldData: any): any => {
  let needUpdate = false
  const data = fields.reduce((params: any, field: string) => {
    if (newData[field] !== undefined) {
      params[field] = !_.cloneDeep(newData[field])
      if (!_.isEqual(newData[field], oldData[field])) {
        needUpdate = true
      }
    }
    return params
  }, {})
  return {
    needUpdate,
    params: data
  }
}

export function parseFiat(price: number): string {
  return `$ ${price}`
}

export function parsePercentage(price: number): string {
  return `${price.toFixed(2)} %`
}
