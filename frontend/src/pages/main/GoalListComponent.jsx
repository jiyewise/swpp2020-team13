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

const mapStateToProps = state => {
    return{
        goalList: state.goal.goals
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onGetAllGoals: () => dispatch(actionCreators.getAllGoal())
    }
}
class GoalList extends Component {

    componentDidMount(){
        console.log(this.props.goalList)
        this.props.onGetAllGoals()
    }

    stringtoDate = (string) => {
        var ymd = string.split(" ")[0]
        var syear = ymd.split("-")[0]
        var smonth = ymd.split("-")[1]
        var sdate = ymd.split("-")[2]
        return new Date(Number(syear), Number(smonth)-1, Number(sdate))
    }

    selectTodayGoals() {
        var today = new Date()
        // today = new Date(today.getTime()+ 540*60*1000)
        // console.log("todaydate")
        // console.log(today)
        const todayGoals = this.props.goalList.filter((goal)=> {
            let deadline = this.stringtoDate(goal.deadline)
            console.log("selectTodaygoals")
            // console.log(created_at)
            console.log(deadline)
            return ((today <= deadline))
        })
        return todayGoals
    }

    render(){

        //map sampleGoalList to goalBodyComponent
        const todayGoalsList = this.selectTodayGoals()
        console.log(todayGoalsList)
        const toGoalBody = todayGoalsList.map((goal) => {
                return(<GoalBodyComponent 
                    title={goal.title} 
                    id={goal.id} 
                    deadline={goal.deadline} 
                    tags={goal.tags}/>)
            })
        console.log("get goallist")
        console.log(this.props.goalList)
        return(
            <div>
                <div className='menubar'>
                    {console.log(this.props)}
                    <MenuBar/>
                </div>
                <div className='calendarpanel'>
                    <CalendarPanel/>
                </div>
                <div className='goallist'>
                    <h2 className="componentTitle">What's for today?</h2>
                    {toGoalBody}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (GoalList)