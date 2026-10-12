import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {data} = props

  const dataFormatter = number => {
    if (number >= 1000) {
      return `${number / 1000}k`
    }
    return number.toString()
  }

  return (
    <div className="chart-card">
      <h1>Vaccination Coverage</h1>

      <BarChart width={1000} height={300} data={data} margin={{top: 5}}>
        <XAxis dataKey="vaccine_date" />
        <YAxis tickFormatter={dataFormatter} />
        <Legend />
        <Bar dataKey="dose_1" name="Dose 1" fill="#5a8dee" />
        <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
