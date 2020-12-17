import React, {Component} from 'react'
import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import EditGoal from './EditGoalComponent'
import EditTask from './EditTaskComponent'
import { Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import history from '../../history'
import './EditPage.css'


class EditPage extends Component {
    state = {
        editGoal: false
    }

    // returnIfNull = () => {
    //     if(this.props.selectedGoal) {
    //         history.push('/')
    //     }
    // }

    render() {
        if (!this.props.auth) {
            history.push('/')
            return (null)
        }

        return (
            <div className="EditPage">
                {/* {this.returnIfNull} */}
                <div className='menubar'>
                    <MenuBar/>
                </div>
                <div className="EditGoalTaskTab">
                {/* <Container className="EditGoalTaskContainer"> */}
                    <Button.Group className="EditGoalTaskButtonGroup">
                        <Button className="EditTaskTabButton" onClick={()=>this.setState({editGoal: false})}>Edit Tasks</Button>
                        <Button className="EditGoalTabButton" onClick={()=>this.setState({editGoal: true})}>Edit Goal</Button>
                    </Button.Group>            
                {/* </Container> */}
                    {this.state.editGoal ? 
                    <>
                    <h2>Edit a Goal</h2> 
                    <EditGoal selectedGoal={this.props.selectedGoal}/>
                    </>
                    : 
                    <>
                    <h2>Edit Tasks</h2> 
                    {(this.props.selectedGoal) ? "" : history.push('/main')}
                    {((this.props.selectedGoal !== null) && (this.props.selectedGoal.tasks).length > 0) ? <EditTask goal_start_at={this.props.selectedGoal.start_at} goal_deadline={this.props.selectedGoal.deadline} tasks={this.props.selectedGoal.tasks}/> : <h5>"Please add tasks first!"</h5>}
                    </>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    // console.log("EditPageComponent selectedGoal: ", state.goal.selectedGoal)
    return{
        auth: state.auth,
        selectedGoal: state.goal.selectedGoal,
        // taskList: state.task.tasks,
    }
}

export default connect(mapStateToProps)(EditPage)
