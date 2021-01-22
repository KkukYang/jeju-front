import React, {Component} from "react";
import MainComp from "./component/main/MainComp";
import FooterComp from "./component/footer/FooterComp";
import HeaderComp from "./component/header/HeaderComp";
import {
    BrowserRouter
} from "react-router-dom";
import styled from "styled-components";
import Menu from "./component/header/Menu";
import gsap from "gsap";
import "./App.css";
import {NavLink, Route} from "react-router-dom";
import {Home, Login, ShareBoard, MyPage, Notice, Reservation, Admin, TourList, Tour} from './component/header/menus';
import MainPageComp from "./component/main/mainpage/MainPageComp";
import ReservationPageComp from "./component/main/reservation/ReservationPageComp";
import NoticePageComp from "./component/main/notice/NoticePageComp";
import ShareBoardPageComp from "./component/main/shareboard/ShareBoardPageComp";
import LoginPageComp from "./component/main/auth/LoginPageComp";
import MemberListPageComp from "./component/main/admin/MemberListPageComp";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStaticHeader: true,
            mainview: "mainpage",
            footer: "footer_comp",
            logged: false,
            onLogin: this.onLogin,
            onLogout: this.onLogout
        }

        window.onmousewheel = function (e) {
            console.log(window.scrollY);
            this.showHeader(window.scrollY);
        }.bind(this);
        window.onscroll = function (e) {
            console.log(window.scrollY);
            this.showHeader(window.scrollY);
        }.bind(this);

    }


    showHeader = (scrollVal) => {
        const isStaticHeader = this.state.isStaticHeader;
        if (scrollVal > 0) {
            if (!isStaticHeader) {
                this.setState({
                    isStaticHeader: true
                });
                gsap.to("div.hide", {
                    y: 70,
                    duration: 1
                });
            }
        } else {
            this.setState({
                isStaticHeader: false
            });
            gsap.to("div.hide", {
                y: -70,
                duration: 1
            });
        }
    }


    // Login 함수
    onLogin = () => {
        this.setState({
            logged: true
        });
    }

    // Logout 함수
    onLogout = () => {
        this.setState({
            logged: false
        });
    }

    render() {
        const {logged, onLogout} = this.state;

        return (
            <BrowserRouter>
                <Menu logged={logged}
                      onLogout={onLogout}
                      type="hide"
                />
                <div className="mainFrame">
                    <HeaderComp logged={logged}
                                onLogout={onLogout}
                    />
                    <MainComp
                    />
                    <FooterComp/>
                </div>
                <Route exact path="/" component={MainPageComp}>
                    {/*<Home></Home>*/}
                </Route>
                <Route exact path="/Reservation/:name?" component={ReservationPageComp}>
                    {/*<Reservation></Reservation>*/}
                </Route>
                <Route exact path="/Notice/:name?" component={NoticePageComp}>
                    {/*<Notice></Notice>*/}
                </Route>

                <Route exact path="/TourList/:name?" component={TourList}></Route>
                {/* <Route exact path="/TourList/:name?" component={TourPageComp}></Route> */}
                <Route exact path="/Tour/:name?" component={Tour}></Route>

                <Route exact path="/ShareBoard/:name?" component={ShareBoardPageComp}>
                    {/*<ShareBoard></ShareBoard>*/}
                </Route>
                <Route exact path="/MyPage/:name?" component={MyPage}>
                    {/*<MyPage></MyPage>*/}
                </Route>
                <Route exact path="/Login/:name?" component={LoginPageComp}>
                    {/*<Login></Login>*/}
                </Route>
                <Route exact path="/Admin:name?" component={MemberListPageComp}>
                    {/*<Admin></Admin>*/}
                </Route>
            </BrowserRouter>
        )
    }

}

export default App;
/*
    HeaderComp
        Title
            Home
            Notice
            Reservation
            Tour
                TourList
            ShareBoard
            MyPage
            Login / Logout
    MainComp
        Home
            -
            -
        검색
            - 검색 카테고리 select/option
            - 단어검색어 input
            - 검색 button
        관광명소 - 지도 클릭
            - 제주시 명소 링크.
            - 애월읍 명소 링크.
            ...
        공지사항
            - +버튼 -> 공지사항 페이지 이동. -button 안에 img
            - 공지사항 리스트중 하나 클릭. -table td a tag 안에 span 문자열
        공유게시판
            - +버튼 -> 공유게시판 페이지 이동. -button 안에 img
            - 공유게시판 리스트중 하나 클릭. -table td a tag 안에 span 문자열
    footer
        회사 정보
 */
