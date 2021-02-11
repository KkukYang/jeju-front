import React,{Component} from 'react';
import {URL} from "../../../redux/config";
import axios from 'axios';
import store from '../../../redux/store';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Button from '@material-ui/core/Button';

class CourseDayItem extends Component {

    constructor(props){
        super(props);
    }

    render() {
        
        return (
            <span>
                    <img src={this.props.img} style={{width: '150px', height: '150px'}}/><br/>
                    <caption>{this.props.title}</caption>
            </span>
        );
    }
}

export default CourseDayItem;