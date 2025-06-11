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

const { monthlyPayment, totalCost, interestPaid } = calculateLoanSummary(200000, 30, 7)
console.log(`Monthly: $${monthlyPayment.toFixed(2)}`)
console.log(`Total Cost: $${totalCost.toFixed(2)}`)
console.log(`Total Interest: $${interestPaid.toFixed(2)}`)