import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import CalendarPanel from '../../components/CalendarPanel/CalendarPanelComponent'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react';
import GoalBodyComponent from '../../components/GoalBody/GoalBodyComponent'
import './GoalListComponent.css'
import Axios from 'axios'
import * as actionCreators from '../../store/actions/'
import moment from 'moment'
import history from '../../history'

class GoalList extends Component {

    state = {
        today: new Date()
    }

    componentDidMount(){
        if (this.props.auth) {
            this.props.onGetAllGoals()
        }
    }

    selectTodayGoals() {
        const today = moment(this.state.today).unix()
        console.log("selectTodayGoals this.props.goalList: ", this.props.goalList)
        const todayGoals = this.props.goalList.filter(goal => (goal.start_at <= today && today <= goal.deadline))
        return todayGoals
    }
 
    onDeadlineSubmit = (date) => {
        this.setState({today: date})
    }

    render(){
        if (!this.props.auth) {
            history.push('/')
            return (null)
        }

        //map sampleGoalList to goalBodyComponent
        const todayGoalsList = this.selectTodayGoals()
        
        const toGoalBody = todayGoalsList.map(goal =>  <GoalBodyComponent goal={goal} key={goal.id} today={this.state.today}/>)
        console.log("[DEBUG] GoalListComponent is rendering")

        return(
            <div>
                <div className='menubar'>
                    {console.log(this.props)}
                    <MenuBar/>
                </div>
                <div className='calendarpanel'>
                    <CalendarPanel onSubmit={this.onDeadlineSubmit} goalList={todayGoalsList}/>
                </div>
                <div className='goallist'>
                    <h2 className="componentTitle">What's for today?</h2>
                    {toGoalBody}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("goalList: ", state)
    return {
        auth: state.auth,
        goalList: state.goal.goals,
        // taskList: state.task.tasks,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllGoals: () => dispatch(actionCreators.getAllGoal()),
        // onGetAllTasks: () => dispatch(actionCreators.getAllTask())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (GoalList)