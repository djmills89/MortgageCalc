function calculateMonthlyPayment(principal, time, annualRate) {
    const months = time * 12
    const monthlyRate = (annualRate / 100) / 12
    const factor = (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1)
    const mortgage = principal * factor

    return mortgage
}

function calculateLoanSummary(principal, years, annualRate) {
    const monthlyPayment = calculateMonthlyPayment(principal, years, annualRate)
    const numberOfPayments = years * 12
    const totalCost = monthlyPayment * numberOfPayments
    const interestPaid = totalCost - principal

    return { monthlyPayment, totalCost, interestPaid }
}


const repaymentAmount = document.getElementById('monthly-payment')
const totalPayment = document.getElementById('total-payment')
const submitBtn = document.getElementById('submit-button')
const clearAll = document.getElementById('clear')
const repaymentRadioBtn = document.getElementById('repayment')
const interestRadioBtn = document.getElementById('interest')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const mortgageAmount = document.getElementById('mortgage-amount').valueAsNumber
    const mortgageTerm = document.getElementById('term').valueAsNumber
    const mortgageRate = document.getElementById('rate').valueAsNumber

    const {monthlyPayment, totalCost, interestPaid} = calculateLoanSummary(mortgageAmount, mortgageTerm, mortgageRate)

    repaymentAmount.innerText = `$${monthlyPayment.toFixed(2)}`
    totalPayment.innerText = `$${totalCost.toFixed(2)}`
})

clearAll.addEventListener('click', () => {
    document.getElementById('mortgage-amount').value = ''
    document.getElementById('term').value = ''
    document.getElementById('rate').value = ''
    repaymentRadioBtn.checked = false
    interestRadioBtn.checked = false
})