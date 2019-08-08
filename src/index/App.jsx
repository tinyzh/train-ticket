import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector';
import { h0 } from '../common/fp';

import { 
    exchangeFromTo, 
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
    setDepartDate,
    toggleHighSpeed
} from './actions'

import './App.css'

function App(props) {
    const {
        from,
        to,
        cityData,
        isCitySelectorVisible,
        isLoadingCityData,
        isDateSelectorVisible,
        dispatch,
        departDate,
        highSpeed
    } = props

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector,
        }, dispatch)
    }, [dispatch])

    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity
        },dispatch)
    },[dispatch])

    const departDateCbs = useMemo(() => {
        return bindActionCreators({
            onClick: showDateSelector,
        }, dispatch);
    }, [dispatch]);

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector,
        }, dispatch);
    }, [dispatch]);

    const HighSpeedCbs = useMemo(() => {
        return bindActionCreators({
            toggle: toggleHighSpeed
        },dispatch)
    },[dispatch])

    const onSelectDate = useCallback((day) => {
        if (!day) {
            return;
        }

        if (day < h0()) {
            return;
        }

        dispatch(setDepartDate(day));
        dispatch(hideDateSelector())
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className='header-wrapper'>
                <Header title='ticket' onBack={onBack} />
            </div>
            <form action='./query.html' className='form'>
                <Journey
                    from={from}
                    to={to}
                    {...cbs}
                />
                <DepartDate
                    time={departDate}
                    {...departDateCbs}
                />
                <HighSpeed
                    highSpeed={highSpeed} 
                    {...HighSpeedCbs}
                />
                <Submit />
            </form>
            <CitySelector 
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCbs}
            />
            <DateSelector
                show={isDateSelectorVisible}
                {...dateSelectorCbs}
                onSelect={onSelectDate}
            />
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return state
}
function mapDispatchToProps(dispatch) {
    return { dispatch }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)