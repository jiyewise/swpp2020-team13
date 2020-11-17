import React, { Component, useRef } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from "react-datepicker"
import LoadingOverlay from 'react-loading-overlay';

import MenuBar from '../../components/Menubar/MenuBarComponent'
import { withRouter } from 'react-router-dom'
import { Form , Button, Input, Icon, Progress, Segment, FormField, Dropdown, label, Grid, Container} from 'semantic-ui-react'
import './EditGoal.css'

import "react-datepicker/dist/react-datepicker.css"
// import axios from 'axios'
// import * as actionCreators from '../../../store/actions'
// import { addGoal } from '../../../store/actions'
// import { isThisMonth } from 'date-fns/esm'


const mapDispatchToProps = dispatch => {
    // return {
    //     onAddGoal: (formData, file) => dispatch(actionCreators.addGoal(formData, file))
    // }
}
class EditGoal extends Component {

    state = {
      title: "",
      file: null,
      fileName: "",
      upload: false,
      deadline: new Date(),
      startdate: new Date(),
      tags: [],
      tagOptions:[{key: "tags", text:"tags", value:"tags"}],
      defaultTag:["tags"],
      isCreating: false,
    }

    fileChange = e => {
        if(e.target.files){
        this.setState(
          { file: e.target.files[0], fileName: e.target.files[0].name, upload: true},
          () => { console.log( "File chosen --->", this.state.file, console.log("File name  --->", this.state.fileName))},
          )
        }
        else {
        //    this.setState({file: default_goal_pic})
           console.log(this.state.file)
           const imageUrl = URL.createObjectURL(this.state.file)
            console.log(imageUrl)
        }
        
    }

    renderTitle() {
        return (
            <Form.Field>
                <label>Goal Title</label>
                <Input placeholder='Enter Title Here' 
                defaultValue="Edit Goal Title"
                onChange={(e)=>this.setState({title: e.target.value})}></Input>
            </Form.Field>
        )
    }

    renderPhoto() {
        const { statusCode } = this.state;
        return (
            <Segment>
            <Form.Field>
                <label id="PhotoInput">Add Goal Photo</label>
            <Button as="label" htmlFor="file" type="button" animated="fade">
              <Button.Content visible>
                <Icon name="file" />
              </Button.Content>
              <Button.Content hidden>Choose a File</Button.Content>
            </Button>
            <input type="file" id="file" hidden onChange={this.fileChange}/>
            <Form.Input fluid label="Photo Chosen " placeholder="Add new file" readOnly
              value={this.state.fileName}
            />
            <Button style={{ marginTop: "7px" }} onClick={this.fileChange} id="UploadPhotoButton"> Upload </Button>
          </Form.Field>
          </Segment>
        )
    }

    selectDeadline(date) {
        this.setState({deadline:date})
    }

    formatDate(d) {
        // console.log(date.toString('MM/dd/yyyy'))
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        return curr_month + "/" + curr_date + "/" + curr_year
    }

    renderDeadline() {
        return(
            <Segment>
                <FormField>
                    <label>Select Goal Deadline</label>
                    <Grid columns='three' textAlign='center' className="DeadlineGrid">
                    <Grid.Column width={5}>
                    <Input id="todayDate" style={{ width: "175px" }} readOnly value={this.formatDate(this.state.startdate)}></Input>
                    </Grid.Column >
                    <Grid.Column width={1}><Container><h5>to</h5></Container></Grid.Column>
                    <Grid.Column  width={5}>
                    <DatePicker style={{ width: "150px" }} dateformat={"YYYY-MM-DD"} selected={this.state.deadline} onChange={(date)=>{this.selectDeadline(date)}} />
                    </Grid.Column>
                    </Grid>
                </FormField>
            </Segment>
        )
    }

    onTagsChanged(tags) {
        this.setState({tags: tags})
    }

    addTagOptions(e,data) {
        const tagOptions = this.state.tagOptions
        tagOptions.push({key: data.value, text: data.value, value: data.value})
        this.setState({tagOptions:tagOptions})
    }

    setTag(data) {
        this.onTagsChanged(data.value)
    }

    renderTag() {
        return(
            <FormField>
                <label>Add Tags</label>
                <Dropdown search selection 
                    clearable multiple allowAdditions fluid 
                    defaultValue={this.state.defaultTag}
                    onAddItem={(e,data) => this.addTagOptions(e, data)} 
                    onChange={(e,data)=>this.setTag(data)}
                    options={this.state.tagOptions}
                />
            </FormField>
        )
    }


    onClickHandler() {
        // e.preventDefault()
        console.log(this.state.tags)
        let data = new FormData()
        data.append("title", this.state.title)
        let deadline = moment(this.state.deadline).startOf('day').unix() + (24*60*60 - 60)
        console.log("Modified deadline: ", moment.unix(deadline).format('MMMM Do YYYY, h:mm:ss a'))
        data.append("deadline", deadline)
        data.append("tags", JSON.stringify(this.state.tags))
        // this.props.addGoal(data, this.state.file)
        // this.setState({ isCreating: true })
    }

    render(){
        return(
            <LoadingOverlay
                className="spinner"
                active={this.state.isCreating}
                spinner
                text='Editing a new goal...'
            >
            <div className='menubar'>
                <MenuBar/>
            </div>
            <div className='FormCreate'>
                 <h2 id="header">Edit a Goal</h2>
                 <Form id="FormCreateForm">
                {this.renderTitle()}
                {this.renderPhoto()}
                {/* {this.fileRender()} */}
                {this.renderDeadline()}
                {this.renderTag()}
                <Button floated="right">Go Back</Button>
                <Button onClick={()=>this.onClickHandler()} floated="right">Confirm</Button>
                </Form>
            </div>
            </LoadingOverlay>
        )
    }

}



export default (withRouter(EditGoal))