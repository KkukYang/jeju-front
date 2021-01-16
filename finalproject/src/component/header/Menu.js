import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import {Home, Login, ShareBoard, MyPage, Notice, Reservation, Tour, Admin} from './menus';
import store from "../../redux/store";
import {actionType, mainViewType} from "../../redux/config";


class Menu extends Component {

    constructor(props) {
        super(props);
        console.log("Menu constructor ", this.props)
    }

    setMainView = (mainView) => {
        console.log("Home setMainView()");
        store.dispatch({
            type: actionType.setMainView,
            // mainView: mainViewType.MainPage
            mainView: mainView
        });
    }

    render() {
        console.log("Menu render ", this.props)
        return (
            <div>
                <ul className="menu">
                    <li>
                        <NavLink exact to="/"
                                 onClick={() => {
                                     console.log("Home NavLink onClick");
                                     this.setMainView(mainViewType.MainPage);
                                 }}
                        >홈(로고)</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Reservation"
                                 onClick={() => {
                                     console.log("Reservation NavLink onClick");
                                     this.setMainView(mainViewType.Reservation);
                                 }}
                        >예약</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Notice"
                                 onClick={() => {
                                     console.log("Notice NavLink onClick");
                                     this.setMainView(mainViewType.Notice);
                                 }}
                        >공지사항</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Tour"
                                 onClick={() => {
                                     console.log("Tour NavLink onClick");
                                     this.setMainView(mainViewType.Tour);
                                 }}
                        >관광명소</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/ShareBoard"
                                 onClick={() => {
                                     console.log("ShareBoard NavLink onClick");
                                     this.setMainView(mainViewType.ShareBoard);
                                 }}
                        >공유게시판</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/MyPage"
                                 onClick={() => {
                                     console.log("MyPage NavLink onClick");
                                     this.setMainView(mainViewType.MyPage);
                                 }}
                        >MyPage</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Login"
                                 onClick={() => {
                                     console.log("Login NavLink onClick");
                                     this.setMainView(mainViewType.Login);
                                 }}
                        >Login</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/Admin"
                                 onClick={() => {
                                     console.log("Admin NavLink onClick");
                                     this.setMainView(mainViewType.Admin);
                                 }}
                        >Admin</NavLink>
                    </li>
                </ul>

                <hr style={{clear: 'both'}}/>

                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route exact path="/Reservation/:name?">
                    <Reservation></Reservation>
                </Route>
                <Route exact path="/Notice/:name?">
                    <Notice></Notice>
                </Route>
                <Route exact path="/Tour/:name?">
                    <Tour></Tour>
                </Route>
                <Route exact path="/ShareBoard/:name?">
                    <ShareBoard></ShareBoard>
                </Route>
                <Route exact path="/MyPage/:name?">
                    <MyPage></MyPage>
                </Route>
                <Route exact path="/Login/:name?">
                    <Login></Login>
                </Route>
                <Route exact path="/Admin:name?">
                    <Admin></Admin>
                </Route>
            </div>
        )
    }
}

export default Menu;