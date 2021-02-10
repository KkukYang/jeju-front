import React, {Component} from "react";
import {URL} from '../../../redux/config';
import MyBudgetItem from "./MyBudgetItem";
import axios from 'axios';
import store from '../../../redux/store'; 
import Button from '@material-ui/core/Button';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class MyBudget extends Component {
    constructor(props) {
        super(props);
        console.log("MyBudget constructor", props);
        this.state={
            listData:[],
            wishday1:'',
            wishday2:'',
        };
    }

    list=()=>{
        let memId = store.getState().loginId;        
        let wishday1 = this.refs.wishday1.value;
        let wishday2 = this.refs.wishday2.value;
        let url = URL + "/wish/budget?memId="+memId+"&wishday1="+wishday1+"&wishday2="+wishday2;
        let url2 = URL + "/wish/budgetsum?memId="+memId+"&wishday1="+wishday1+"&wishday2="+wishday2;
        let url3 = URL + "/wish/capitalsum?memId="+memId+"&wishday1="+wishday1+"&wishday2="+wishday2;

        console.log(url2);
        // console.log(wishday2);
        // console.log(wishday1);

        axios.get(url)
        .then(res=>{
            console.log(res.data);
            this.setState({
                listData:res.data
            })
        }).catch(err=>{
            console.log("wishlist 오류 : " + err);
        })

        axios.get(url2)
        .then(res=>{
            console.log(res.data);
            this.setState({
                moneySumData:res.data
            })
        }).catch(err=>{
            console.log("moneySumData 오류 : " + err);
        })

        axios.get(url3)
        .then(res=>{
            console.log(res.data);
            this.setState({
                capitalSumData:res.data
            })
        }).catch(err=>{
            console.log("capitalSumData 오류 : " + err);
        })
    }

    insertCapital = () => {
        let url = URL + "/wish/insertcapital";
        let memId = store.getState().loginId;        
        let content = '여행예산, ' + this.refs.content.value;
        let wishday = this.refs.wishday.value;
        let capital = this.refs.capital.value;

        // console.log(memId);
        // console.log(content);
        // console.log(capital);
        if(wishday == '' || capital == '')
            alert("날짜와 여행예산를 모두 선택해주세요.");
        else{
            axios.post(url, {memId, content, wishday, capital
            }).then(res => {
                this.toggle();
                this.setState({
                    alertOpen: true
                })
            }).catch(err=>{
                console.log("여행예산 저장시 오류:"+err);
            })
        }
    } 

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    // modal 함수
    handleOpen = () => {
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.");
        }
        else{
            this.setState({
                open: true
            })
        }
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    toggle = () => {
        if(!store.getState().logged){
            alert("로그인이 필요한 서비스입니다.");
        }
        else{
            
            this.setState({
                open: !this.state.open
            })
        }
    }

    render() {
        var sum = this.state.capitalSumData - this.state.moneySumData
        return (
            <div>                                 
                {/*/!* 여행비 추가 버튼 *!/*/}
                <MDBBtn size="sm" color="dark-green" type="button"
                        className="AddCapitalBtn wow fadeInDown"
                        data-wow-delay="0.4s"
                        style={{marginTop: '1.3%'}}
                        onClick={() => {
                            if (store.getState().loginId != null && store.getState().loginId != "") {
                                this.toggle();
                            } else {
                                let _result = window.confirm("로그인이 필요한 서비스 입니다.\n로그인 하시겠습니까?");

                                if (_result) {
                                    this.props.history.push("/login");
                                }
                            }
                        }}
                > <b>여행비 추가</b>
                </MDBBtn>             
                {/* 여행비 추가 모달 */}
                <MDBModal isOpen={this.state.open} toggle={this.toggle} centered>
                    <MDBModalHeader toggle={this.toggle} className="CapitalAddModal">여행비 추가</MDBModalHeader>
                    <MDBModalBody>
                        <div className="ShipAddModal">
                            📝&nbsp;&nbsp;<b>메모</b>
                            <input type="text" ref="content" class="form-control form-control-sm"
                            value={this.state.content} onChange={this.handleChange}/>
                            <br/>
                            🗓&nbsp;&nbsp;<b>여행 시작일</b>
                            <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                            💰&nbsp;&nbsp;<b>여행예산</b>
                            <input type="text" class="form-control form-control-sm" ref="capital" onClick={this.handleChange}/>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="dark-green" onClick={this.insertCapital.bind(this)}>추가</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                <div className="dayselect">
                🗓&nbsp;&nbsp;<b>시작일</b>
                <input type="date" class="form-control form-control-sm" ref="wishday1"></input>
                🗓&nbsp;&nbsp;<b>종료일</b>
                <input type="date" class="form-control form-control-sm" ref="wishday2"></input>
                </div>
                <Button color="primary" onClick={this.list.bind(this)}>검색</Button>
                <div id="MyBudgetTable">
                    <table className="table table-hover" id="MyBudgetMainTable">
                        <thead style={{backgroundColor: '#fafafa'}}>
                            <tr style={{textAlign: 'center'}}>
                                {/* <td style={{width:'5%'}}>#</td> */}
                                <td style={{width:'40%'}}>내용</td>
                                <td style={{width:'20%'}}>일시</td>
                                <td style={{width:'20%'}}>비용</td>
                                <td style={{width:'20%'}}>예산</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.listData.map((row, idx)=>(
                                    <MyBudgetItem row={row} key={idx} history={this.props.history}/>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>합계 : {sum} 원</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {/* alert 창 */}
                <Dialog
                        open={this.state.alertOpen}
                        onClose={()=>{this.setState({alertOpen:false})}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"일정 추가 완료"}</DialogTitle>
                </Dialog>         
            </div>
        )
    }
}

export default MyBudget;
