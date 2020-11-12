import React, {Component} from 'react'
import { List, Icon, Checkbox, Grid, Button} from 'semantic-ui-react'
import './TaskBar.css'
class TaskBarComponent extends Component {

    isRecurrent(daylist) {
        if(daylist.length == 0) {
            return(
                <Button.Group size="tiny" floated="right">
                <Button icon className="TaskBarButton">
                    <Icon name='pencil alternate' />
                </Button>
                </Button.Group>
            )
        }
        else {
            return (
          <Button.Group size="tiny" floated="right">
            <Button icon className="TaskBarButton">
              <Icon name='redo' />
          </Button>
          <Button icon className="TaskBarButton">
              <Icon name='pencil alternate' />
          </Button>
          </Button.Group>
          
          )
        }
    }
    render() {
        return(
        <List.Item className="TaskBarListItem">
            <List.Content floated='right'>
            {this.isRecurrent(this.props.days_of_week)}
            </List.Content>
            <Icon className="TaskBarListTriangle" name='right triangle'/>
            <List.Content className="TaskBarListContent">{this.props.title}</List.Content>
            </List.Item>
        )
    }
}

export default TaskBarComponent