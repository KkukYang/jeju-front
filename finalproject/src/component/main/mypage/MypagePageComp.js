import React, {Component} from 'react'
import './style/RCA.css';
import moment from 'moment';
import Header from './Header';
import Calendar from './Calendar';


class MypagePageComp extends Component {

    constructor(props) {
        super(props);
        console.log("MypagePageComp constructor", props);
    }
      state={
        calendarYM : moment(),
        today : moment(),
        selected : moment().format("YYYY-MM-DD")

      }

      static defaultProps = {
        clickFn : ()=>{}
    }

    moveMonth = (month) => {
        this.setState({
            calendarYM : this.state.calendarYM.add(month,'M')
        })
    }

    changeSelected = (clickedDate) =>{

        if(moment(clickedDate).isSame(this.state.selected,'day')){
            this.props.clickFn(clickedDate);
            return;
        }

        this.setState({
            selected : clickedDate
        })

        this.props.clickFn(clickedDate)
        
        if(moment(clickedDate).isBefore(this.state.calendarYM,'month')){
            this.moveMonth(-1)
        }else if(moment(clickedDate).isAfter(this.state.calendarYM,'month')){
            this.moveMonth(1)
        }
    }

    render() {
        return (
            
            
            <div className="test-layout">
               <div className="RCA-app-container">
               {/* {this.state.calendarYM.format("YYYY년 MM월") }    
               <button onClick={()=> this.setState({this.state.today.})>이전달</button>
               <span>{this.state.today.format("현재 YYYY - MM - DD")}</span>
                <button>다음달</button> */}
                <Header calendarYM={this.state.calendarYM.format("YYYY년 MM월")}
                        today={this.state.today.format("현재 YYYY - MM - DD")}
                        moveMonth={this.moveMonth}/>
                    
                     
                    <Calendar YM={this.state.calendarYM.format("YYYY-MM-DD")}
                        selected={this.state.selected}
                        changeSelected={this.changeSelected}
                    />
                </div>
            </div>
        )
    }

}

export default MypagePageComp;
