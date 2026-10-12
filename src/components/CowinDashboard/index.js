import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const covidVaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    try {
      const response = await fetch(
        'https://apis.ccbp.in/covid-vaccination-data',
      )

      if (response.ok === false) {
        this.setState({apiStatus: apiStatusConstants.failure})
        return
      }

      const data = await response.json()

      this.setState({
        vaccinationData: {
          last7DaysVaccination: data.last_7_days_vaccination,
          vaccinationByGender: data.vaccination_by_gender,
          vaccinationByAge: data.vaccination_by_age,
        },
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong. Please try again</h1>
    </div>
  )

  renderDashboard = () => {
    const {vaccinationData} = this.state
    const {last7DaysVaccination, vaccinationByGender, vaccinationByAge} =
      vaccinationData

    return (
      <div className="dashboard-content">
        <VaccinationCoverage data={last7DaysVaccination} />
        <VaccinationByGender data={vaccinationByGender} />
        <VaccinationByAge data={vaccinationByAge} />
      </div>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderDashboard()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard">
        <header className="dashboard-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <span>Co-WIN</span>
        </header>

        <h1 className="dashboard-title">CoWIN Vaccination in India</h1>

        {this.renderContent()}
      </div>
    )
  }
}

export default CowinDashboard
