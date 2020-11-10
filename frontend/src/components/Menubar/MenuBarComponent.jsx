import React from 'react'
import {withRouter} from 'react-router-dom'
import "./MenuBar.css"
import * as actionCreators from '../../store/actions/index'
import { useDispatch } from 'react-redux'
import { Icon, Sidebar, Menu, Grid } from 'semantic-ui-react'
const MenuBarComponent = (props) => {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onClickLogout = () => {
        dispatch(actionCreators.logoutUser())
        props.history.push('/')
    }

    // if (!auth) {
    //     props.history.push('/')
    // }

    return (
        <Sidebar className="Sidebar"
        animation='uncover'
        vertical
        visible="true"
        // width='very thin'
        >   
        <Grid verticalAlign='middle' rows={6} centered className="gridBar">
        <Grid.Row>
            <Menu.Item as='a' >
                <button class='ui basic button' onClick={()=> {props.history.push('/create')}} className='button-create'>
                    <Icon name='plus circle' size='large' id='icon'></Icon>
                    <br></br>
                    Create
                </button>
            </Menu.Item>
            </Grid.Row>

            <Grid.Row>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={()=>props.history.push('/main')} className='button'>
                    <Icon name='home' size='large' id='icon'></Icon>
                    <br></br>
                    Main
                </button>
            </Menu.Item>
            </Grid.Row>

            <Grid.Row>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={()=>props.history.push('/dashboard')} className='button'>
                    <Icon name='chart bar outline' size='large' id='icon'></Icon>
                    <br></br>
                    Dashboard
                </button>
            </Menu.Item>
            </Grid.Row>
            <Grid.Row>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={()=>props.history.push('/explore')} className='button'>
                    <Icon name='search' size='large' id='icon'></Icon>
                    <br></br>
                    Explore
                </button>
            </Menu.Item>
            </Grid.Row>
            <Grid.Row>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={()=>props.history.push('/profile')} className='button'>
                    <Icon name='user circle' size='large' id='icon'></Icon>
                    <br></br>
                    Profile
                </button>
            </Menu.Item>
            </Grid.Row>
            <Grid.Row>
            <Menu.Item as='a'>
                <button class='ui basic button' onClick={()=>onClickLogout()} className='button-logout'>
                    <Icon name='arrow alternate circle right outline' size='large' id='icon'></Icon>
                    <br></br>
                    Logout
                </button>
            </Menu.Item>
            </Grid.Row>
        </Grid>
        </Sidebar>
    )
}



export default withRouter(MenuBarComponent)