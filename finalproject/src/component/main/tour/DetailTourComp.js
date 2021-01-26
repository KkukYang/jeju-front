import React,{Component} from 'react';
import axios from 'axios';
import MapComp from './MapComp';
import ReviewListComp from './ReviewListComp';
import {URL} from '../../../redux/config';
import './TourDetailCss.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

class DetailTourComp extends Component {

    constructor({match}, props) {
        super(props);

        this.state = {
            spotdata:[],
            contentsid: match.params.name,
            open: false, 
            setOpen: false
        }

    }

    // componentDidUpdate() {
    //     window.scrollTo(0,0);
    // }

    getData=()=>{
        const url = URL + "/spot/select?contentsid=" + this.state.contentsid;

        axios.get(url)
            .then(res=>{
                this.setState({
                    spotdata : res.data
                })
            }).catch(err=>{
                console.log("DetailTourComp getData 오류 : " + err);
            })
    }

    componentWillMount(){
        this.getData();
    }

    heartClick=(e)=>{
        if(e.target.className == 'heart clickheart'){
            e.target.className = 'heart';       
        }
        else{
            e.target.className = 'heart clickheart';
            this.handleOpen();
        }
            
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    insertWish=()=>{
        // console.log(this.refs.wishday.value);

        let url = URL + "/wish/insertspot";
        let memId = 'sanghee'; // 나중에 로그인 아이디로 넣기
        let spotId = this.state.contentsid;
        let content = this.state.spotdata.roadaddr;
        let wishday = this.refs.wishday.value;
        let wishtime = this.refs.wishtime.value;

        // axios.post(url, {})
    }
      

    render() {
        var star = this.state.spotdata.star==5?
        <span id="thumbStar" style={{color: "#F0CD58"}}><span class="fas fa-star"></span><span class="fas fa-star"></span><span class="fas fa-star"></span>
                                                            <span class="fas fa-star"></span><span class="fas fa-star"></span></span>
            :this.state.spotdata.star==4?
            <span id="thumbStar" style={{color: "#F0CD58"}}><span class="fas fa-star"></span><span class="fas fa-star"></span><span class="fas fa-star"></span>
                                                            <span class="fas fa-star"></span><span class="far fa-star"></span></span>
            :this.state.spotdata.star==3?
            <span id="thumbStar" style={{color: "#F0CD58"}}><span class="fas fa-star"></span><span class="fas fa-star"></span><span class="fas fa-star"></span>
                                                            <span class="far fa-star"></span><span class="far fa-star"></span></span>
            :this.state.spotdata.star==2?
            <span id="thumbStar" style={{color: "#F0CD58"}}><span class="fas fa-star"></span><span class="fas fa-star"></span><span class="far fa-star"></span>
                                                            <span class="far fa-star"></span><span class="far fa-star"></span></span>
            :<span id="thumbStar" style={{color: "#F0CD58"}}><span class="fas fa-star"></span><span class="far fa-star"></span><span class="far fa-star"></span>
                                                            <span class="far fa-star"></span><span class="far fa-star"></span></span>;
        
        return (
            <div>
                {/* 이미지, spot 정보 */}
                <img src={this.state.spotdata.img} alt="이미지 없음" style={{width: '100%'}}/>
                <div style={{color: 'whitesmoke'}} class="thumbText">
                    <b id="thumbTitle">{this.state.spotdata.title}</b><br/>
                    <span id="thumbTag" style={{color: '#bbb'}}>{this.state.spotdata.tag}</span><br/>
                    <span id="thumbRoad" style={{color: '#bbb'}}><span class="fa fa-map-marker"></span>&nbsp;&nbsp;{this.state.spotdata.roadaddr}</span><br/>
                    
                    <span id="thumbHeart" className='heart' style={{position: 'absolute', cursor: 'pointer'}} onClick={this.heartClick.bind(this)}></span>
                </div>
                <br/><br/>

                {/* 일정 추가 모달 */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className="modal"
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                    <div className="paper">
                        <span className="modalTitle">일정 추가</span><br/>
                        🏰&nbsp;&nbsp;{this.state.spotdata.title}<br/>
                        🗺&nbsp;&nbsp;{this.state.spotdata.roadaddr}<br/>
                        🗓&nbsp;&nbsp;여행 날짜
                        <input type="date" class="form-control form-control-sm" ref="wishday"></input>
                        ⏰&nbsp;&nbsp;예정 시간
                        <input type="time" class="form-control form-control-sm" ref="wishtime"></input><br/>
                        <div style={{textAlign: 'center'}}>
                            <button type="button" class="btn btn-warning modalBtn" onClick={this.insertWish.bind(this)}><b>추가</b></button>
                        </div>

                    </div>
                    </Fade>
                </Modal>

                {/* 소개 */}
                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#3073BD'}}>
                        &nbsp;&nbsp;&nbsp;소개&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
                <br/>
                <div id="thumbIntro">
                    {star}<br/>
                    {this.state.spotdata.introduction}
                </div>
                
                {/* 주변 정보 */}
                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#3073BD'}}>
                        &nbsp;&nbsp;주변 정보&nbsp;&nbsp;
                    </span>
                </div>
                <br/>
                
                {/* 카카오 지도 */}
                <MapComp longitude={this.state.spotdata.longitude} latitude={this.state.spotdata.latitude}
                    title={this.state.spotdata.title}/>
                <br/><br/>

                <div className="detailTitle">
                    <span className="detailTitleContent" style={{backgroundColor:'white', color: '#3073BD'}}>
                        &nbsp;&nbsp;&nbsp;후기&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
                <br/>

                {/* 후기 */}
                <ReviewListComp contentsid={this.state.contentsid}/>
            </div>
        );
    }
}

export default DetailTourComp;