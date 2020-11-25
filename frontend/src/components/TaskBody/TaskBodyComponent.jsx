import React, {Component} from 'react'
import { Icon, Sidebar, Menu, Grid, List, Segment, Button, Container, GridColumn, Form} from 'semantic-ui-react'
import './TaskBody.css'
import { connect } from 'react-redux'
import Axios from 'axios'
// import {} from '../../store/actions/index'
import moment from 'moment'
import Rating from '@material-ui/lab/Rating'

class TaskBodyComponent extends Component {
    // props have goal id, title, deadline, and tags
    // the tasks here are originally from backend
    // TODO: connect with redux

    state = {
        // selectedDate: null,
        // addTaskModal: false,
        // tasks: this.props.goal.tasks ? this.props.goal.tasks : []
        editmode: false,
        readmode: true,
        title: this.props.task.title,
        importance: this.props.task.importance,
        day_of_week: this.props.task.day_of_week,
        deadline: this.props.task.deadline
        // const [importance, setImportance] = React.useState(2)
        // const [day_of_week, setDayOfWeek] = React.useState([])
        // const [title, setTitle] = React.useState("")
        // const [deadline, setDeadline] = React.useState("")
        
        
    }

    onClickEditTaskHandler = () => {
       const neweditmode = !(this.state.editmode)
       const newreadmode = !(this.state.readmode)
       this.setState({editmode: neweditmode, readmode: newreadmode})
    }

    // onClickDeleteHandler = () => {
    //     // TODO
    // }

    // deadline is a timestamp
    deadlineDate = (deadline) => {
        return moment(deadline).format('MMMM Do YYYY')
        // return moment.unix(deadline).format('LL')
    }

    renderDeadlineString = (task) => {
        let str = "Until: "
        str = str + this.deadlineDate(task.deadline)
        if(task.day_of_week.length !== 0) {
            var daystr = "On every "
            for (var d of task.day_of_week) {
                d = d.toLowerCase()
                d = d.charAt(0).toUpperCase() + d.slice(1);
                daystr = daystr + d + ","+ " "
            }
            daystr = daystr.slice(0, daystr.length-2)
            return (
            <div className="TaskBodyListDeadline">{str}&nbsp;&nbsp;{daystr}</div>
            )
        }
        return (
            <div className="TaskBodyListDeadline">{str}</div>
        )
    }

    setDeadlineString = (string) => {
        console.log("[DEBUG] dadline string: ", string)
        const deadline = moment(string, 'YYYY-MM-DD').startOf('day').unix() + (24*60*60 - 1)
        // setDeadline(deadline)
        this.setState({deadline: deadline})
    }

    onSubmit = () => { // e: event
        // TODO: cannot call setState during render
        // this.setState({editmode: false})
        const neweditmode = !(this.state.editmode)
        const newreadmode = !(this.state.readmode)
        this.setState({editmode: neweditmode, readmode: newreadmode})
    }  
    
    closeHandler = () => {
        const neweditmode = !(this.state.editmode)
        const newreadmode = !(this.state.readmode)
        this.setState({editmode: neweditmode, readmode: newreadmode})
    }

    renderEditMode = () => {
        const options = [
            { key: 'm', text: 'Monday', value: 'MONDAY' },
            { key: 't', text: 'Tuesday', value: 'TUESDAY' },
            { key: 'w', text: 'Wednesday', value: 'WEDNESDAY' },
            { key: 'th', text: 'Thursday', value: 'THURSDAY' },
            { key: 'f', text: 'Friday', value: 'FRIDAY' },
            { key: 's', text: 'Saturday', value: 'SATURDAY' },
            { key: 'su', text: 'Sunday', value: 'SUNDAY' },
          ]

        return (
            <Form>
            <Segment className="EditTaskForm" id="EditTaskFormSegment">
            <h3>Edit: {this.state.title}</h3>
                <Form.Group widths='equal'>
                    <Form.Input label='Title' placeholder='Enter task title' 
                    onChange={(e,data)=> this.setState({title: data.value})} 
                    id="EditTaskFormTitle"
                    defaultValue={this.state.title}
                    />
                    </Form.Group>
                        <Form.Group>
                            <Form.Select
                                multiple selection
                                label='Day of Week'
                                id="EditTaskFormDayofWeek"
                                options={options}
                                defaultValue={this.props.task.day_of_week}
                                onChange={(e,data)=>this.setState({day_of_week: data.value})}
                                placeholder='Day of Week'
                            />
                            <Form.Input label='Deadline' 
                            placeholder='Deadline'
                            id="EditTaskFormDeadline"
                            defaultValue={moment(this.state.deadline).format("YYYY-MM-DD")}
                            disabled={(this.state.day_of_week.length == 0) ? true : false}
                            onChange={(e,data)=>this.setState({deadline: this.setDeadlineString(data.value)})}
                            // error={reg_deadline.test(deadline) ? false : {content: "Enter date in YYYY-MM-DD format!"}}
                            />
                            {/* <DatePicker style={{ width: "150px" }} dateformat={"YYYY-MM-DD"} selected={deadline} onChange={(date)=>{setDeadline(date)}} /> */}                        </Form.Group>
                    <Form.Group inline>
                    <label>Importance</label>
                        <Rating
                        name="simple-controlled"
                        size="large"
                        id="EditTaskFormImportance"
                        value={this.state.importance}
                        onChange={(event, newValue) => {
                            this.setState({importance: newValue})
                        }} 
                        />
                    </Form.Group>
                    <Button.Group>
                        <Button className="EditTaskSubmitButton" id="EditTaskSubmit" onClick={this.onSubmit}>Submit</Button>
                        <Button icon className="EditTaskCloseButton" id="EditTaskClose" onClick={this.closeHandler}><Icon name='x'/></Button>
                    </Button.Group>
                    {/* <Form.Button className="EditTaskSubmitButton" onClick={this.onSubmit()}>Submit</Form.Button>                     */}
                </Segment>
        </Form>
        )
    }

    renderReadMode = () => {
        const { title, deadline, importance, day_of_week } = this.props.task
        return (
            <Segment className="TaskBodySegment">
            <List className="TaskBodyTitleList">
                <List.Item className="TaskBodyListItem">
                <Icon name='circle' className="TaskBodyListIcon" size="small"/>
                    <List.Content className="TaskBodyListTitle">
                        <List.Header className="TaskBodyListTitleHeader">    
                            {title}
                            <Rating className="TaskBodyListRating"
                                    name="simple-controlled"
                                    size="small"
                                    id="AddTaskFormImportance"
                                    value={importance}
                                    readOnly
                                />
                        </List.Header>
                            {this.renderDeadlineString(this.props.task)}
                    </List.Content>
                </List.Item>
            </List>
            <List.Item>
                    <Button.Group className="DeleteTaskButtonGroupAnother" floated="right">
                        <Button size="tiny" compact icon className="EditTaskButtonA" id="EditButtonTaskBody" onClick={()=>this.onClickEditTaskHandler()}><Icon name='edit'/>&nbsp;Edit</Button>
                    </Button.Group> 
            </List.Item>
            <br></br>
        </Segment>
        )
    }

    render() {
    return(
        <> 
        {this.state.readmode && this.renderReadMode()}
        {/* {this.renderReadMode()} */}
        {this.state.editmode && this.renderEditMode()}
        {console.log(this.state.readmode, this.state.editmode)}
        </>
    )
    }
}

export default (TaskBodyComponent)