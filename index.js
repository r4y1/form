const MyForm = {

  validate() {
    const isValid = this.validateTEL() && this.validateFIO()
    return {
      isValid,
      errorFields: this.errorFields()
    }
  },

  getData() {
    return {
      fio: document.getElementById('fio'),
      tel: document.getElementById('tel')
    }
  },

  setData(newFormData) {
    document.getElementById('fio').value = newFormData.fio
    document.getElementById('tel').value = newFormData.tel
  },

  submit() {
    const validationResult = this.validate()
    if (!this.validateFIO()) this.addWarning('fio')
      else {
        document.getElementById('fio').classList = ''
        document.getElementById('fio').placeholder = ''
      }
    if (!this.validateTEL()) this.addWarning('tel')
      else {
        document.getElementById('tel').classList = ''
        document.getElementById('tel').placeholder = ''
      }
    document.getElementById('fio').value = ''
    document.getElementById('tel').value = ''
  },

  validateTEL() {
    const regexTEL = /^[+][7]\s*[(]\d{3}[)]\s*\d{3}-\d{2}-\d{2}$/
    const tel = document.getElementById('tel').value
    const isValidTEL = regexTEL.test(tel) && (sumOfDigits(tel) > 40)
    return isValidTEL
  },

  validateFIO() {
    const regexFIO = /^([А-Я][а-я]+?\s)+([А-Я][а-я]+?\s)+([А-Я][а-я]+?)$/
    const fio = document.getElementById('fio').value
    const isValidFIO = regexFIO.test(fio)
    return isValidFIO
  },

  addWarning(inputName) {
    if (inputName == 'tel') {
      document.getElementById('tel').placeholder = 'Укажите телефон в следующем формате: +7 (999) 999-99-99'
      document.getElementById('tel').classList = 'invalid'
    }
    else {
      document.getElementById('fio').placeholder = 'Введите данные по образцу: Иванов Иван Иванович'
      document.getElementById('fio').classList = 'invalid'
    }      
  },
  
  errorFields() {
    const errors = []
    if (!this.validateFIO()) errors.push('fio')
    if (!this.validateTEL()) errors.push('tel')
    return errors
  }
}

const sumOfDigits = (string) => {
  let sum = 0;
  for (let i = 0; i < string.length; i++) {
    const char = string.substring(i, i + 1)
    if (Number.isInteger(parseInt(char))) sum += parseInt(char) 
  }
  return sum
}

const form = document.querySelector('form')
form.addEventListener("submit", (event) => {
  event.preventDefault()
  MyForm.submit()

})
