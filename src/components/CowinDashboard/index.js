// Write your code here
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, vaccinationData: {}}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        vaccinationCoverageData: data.last_7_days_vaccination.map(eachDay => ({
          vaccineDate: eachDay.vaccine_date,
          dose1: eachDay.dose_1,
          dose2: eachDay.dose_2,
        })),
        vaccinationByAgeData: data.vaccination_by_age,

        vaccinationByGenderData: data.vaccination_by_gender,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        vaccinationData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-view-container">
      <Loader type="ThreeDots" color="white" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={vaccinationData.vaccinationCoverageData}
        />
        <VaccinationByGender
          vaccinationByGenderDetails={vaccinationData.vaccinationByGenderData}
        />
        <VaccinationByAge
          vaccinationByAgeDetails={vaccinationData.vaccinationByAgeData}
        />
      </>
    )
  }

  renderUIBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-container">
        <div className="website-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <p className="website-logo-name">Co-WIN</p>
        </div>
        <h1 className="app-heading">CoWIN Vaccination in India</h1>
        {this.renderUIBasedOnApiStatus()}
      </div>
    )
  }
}

export default CowinDashboard
