import './index.css'

import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = ({vaccinationCoverageDetails}) => {
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  const data = vaccinationCoverageDetails.map(item => ({
    vaccineDate: item.vaccineDate,
    dose1: item.dose1,
    dose2: item.dose2,
  }))

  return (
    <div className="vaccination-chart-container">
      <h1 className="vaccination-chart-heading">Vaccination Coverage</h1>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
