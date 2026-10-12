import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const COLORS = ['#5a8dee', '#f54394', '#2cc6c9']

const VaccinationByGender = props => {
  const {data} = props

  return (
    <div className="chart-card">
      <h1>Vaccination by gender</h1>

      <PieChart width={1000} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="gender"
          cx={450}
          cy={140}
          outerRadius={100}
        >
          {data.map((item, index) => (
            <Cell key={item.gender} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
