import React,{Component} from 'react';
import './style/RCA.css';
import {URL} from "../../../redux/config";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import store from '../../../redux/store';
import {  FcCollaboration } from "react-icons/fc";
import { Button } from 'react-bootstrap';
import moment from 'moment';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class ClistItem extends Component {

    constructor(props){
        super(props);

        

    }

    
    onDelete=()=>{
        let url=URL+"/wish/delete?num="+this.props.row.num;
        
        console.log(this.props.row.num); 
        
        axios.get(url)
        .then(res=>{
          window.location.reload()

        }).catch(err=>{
          console.log("삭제시 오류:"+err);
        });
       }

    //    onData=()=>{
    //        let url= URL+"/plan/insert";
    //        let memId=store.getState().loginId;
    //        let title=this.props.row.title;
    //        let content=this.props.row.addr;
    //        let wishday=this.props.row.wishday;
    //        let wishtime=this.props.row.wishtime;

    //        axios.post(url,{memId,title,content,wishday,wishtime})
    //        .then(res=>{
    //             //this.props.history.push("/shareplan");
    //        }).catch(err=>{
    //         console.log("shareplan insert 오류 : " + err);
    //        })

    //    }

    render() {
        
        const {row} = this.props;
        
        return (
            // <div>
                
                <TimelineItem>
                    <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        {row.wishtime}
                    </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined" style={{width: '40px', height: '40px'}}>
                        {/* <FastfoodIcon /> */}
                        {row.content=="spot"?"🛕":row.content==="myplan"?"📅":row.content==="share"?"👨‍🍳":
                            row.content.split(",")[0]==="카페"?"☕":row.content.split(",")[0]==="음식점"?"🍔":
                            row.content.split(",")[0]==="숙박"?"🛌":""}
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                    <Paper elevation={3} style={{padding: '6px 16px'}}>

                        {row.title}
                    </Paper>
                    </TimelineContent>
                </TimelineItem>
                
                // {
                 //   row.content==="spot"?<div>{row.wishtime}&nbsp;🛕{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton>
                    //  {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    //  {/* </div>:row.content==="myplan"?<div>{row.wishtime}&nbsp;📅{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:row.content==="share"?<div>{row.wishtime}&nbsp;👨‍🍳{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:row.content.split(",")[0]==="카페"?<div>{row.wishtime}&nbsp;☕{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:row.content.split(",")[0]==="음식점"?<div>{row.wishtime}&nbsp;🍔{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:row.content.split(",")[0]==="숙박"?<div>{row.wishtime}&nbsp;🛌{row.title}<IconButton aria-label="delete"  onClick={this.onDelete.bind(this)}><DeleteIcon/></IconButton> */}
                    // {/* <Button variant="warning" onClick={this.onData.bind(this)}>일정공유</Button> */}
                    // {/* </div>:''
                // } */}
            // </div>
        );
    }
}


export default ClistItem;