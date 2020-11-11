import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Grid, Menu } from 'semantic-ui-react'
import { Form, Button, Segment } from 'semantic-ui-react'
import * as actionCreators from '../../../store/actions'
import { useDispatch } from 'react-redux'
import './AddTaskForm.css'
import Rating from '@material-ui/lab/Rating';
import DatePicker from "react-datepicker"

const AddTaskForm = (props) => {
    const { register, handleSubmit, watch, errors } = useForm()
    
    const onSubmit =(data, e) => { // e: event
        console.log(data)
    }


    const onError = (errors, e) => console.log(errors, e);
    watch() // watchAllFields

    const options = [
        { key: 'm', text: 'Monday', value: 'monday' },
        { key: 't', text: 'Tuesday', value: 'tuesday ' },
        { key: 'w', text: 'Wednesday', value: 'wednesday' },
        { key: 'th', text: 'Thursday', value: 'thursday' },
        { key: 'f', text: 'Friday', value: 'friday' },
        { key: 's', text: 'Saturday', value: 'saturday' },
        { key: 'su', text: 'Sunday', value: 'sunday' },
      ]
    const [importance, setImportance] = React.useState(2)
    

    return (
        <Form>
            <Segment className="AddTaskForm">
                <h3>&nbsp; Add Task</h3>
                <Form.Group widths='equal'>
                    <Form.Input label='Title' placeholder='Enter task title' />
                    </Form.Group>
                        <Form.Group>
                            <Form.Select
                                multiple selection
                                label='Day of Week'
                                options={options}
                                onAddItem={(e,data) => this.addTags(e, data)}
                                placeholder='Day of Week'
                            />
                            <Form.Input label='Deadline' placeholder='Deadline' />
                            {/* <DatePicker style={{ width: "150px" }} dateformat={"YYYY-MM-DD"} selected={deadline} onChange={(date)=>{setDeadline(date)}} /> */}                        </Form.Group>
                    <Form.Group inline>
                    <label>Importance</label>
                        <Rating
                        name="simple-controlled"
                        size="large"
                        value={importance}
                        onChange={(event, newValue) => {
                            setImportance(newValue);
                        }} 
                        />
                    </Form.Group>
                    <Form.Button className="AddTaskSubmitButton">Submit</Form.Button>                    
                </Segment>
        </Form>
    )
}

export default AddTaskForm