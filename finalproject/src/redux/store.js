import {createStore} from "redux";
import {actionType, mainViewType} from "./config";
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
}

const reducer = function (state, action) {
    //state 초기화.
    if (state === undefined) {
        return {
            mainView: mainViewType.MainPage,
            logged: false,
            memberData: [], // 회원목록
            id: "",
            loginId: "",
            loginEmail: "",
            googleOn: false,
            mainSearch: {
                category: "all",
                searchVal: "",
                searchResultDataList: [],
            },
            weatherInfo: [], // 날씨정보
            weatherInfo_2: [], // 날씨정보_2
            weatherInfo_3: [], // 날씨정보_3

            /* chatting */
            isOpenChatWindow: false,
            selectedRoomNum: 0,
            selectedFriend: "",
            selectedChattingRoomMsgList: [],
            isChatAutoUpdate: false,
            chattingRoomListInfo: [],

            /* pub/sub */
            publishFunctionMsg: "",
        }
    }

    // state 불변성 유지해야함. immutability
    // newState 새로 파서 기존꺼 + 변경할거 넣은다음 redux의 state 바꿔치기.
    let newState = {};

    //action.type 별로 로직처리 다르게 하기.
    if (action.type === actionType.setMainView) {
        // window.setTimeout(setPositionFooter, 100);
        newState = Object.assign({}, state, {
            mainView: action.mainView,
        });
    } else if (action.type === actionType.SIGN_UP) {

        newState = Object.assign({}, state, {
            mainView: action.mainView,
        });
    } else if (action.type === actionType.LOG_IN) {
        newState = Object.assign({}, state, {
            loginId: action.loginId,
            logged: action.logged
        });
    } else if (action.type === actionType.LOG_OUT) {
        newState = Object.assign({}, state, {
            loginId: action.loginId,
            logged: action.logged,
            googleOn: false
        });
    } else if (action.type === actionType.LOGIN_REQUEST) {
        newState = Object.assign({}, state, {});
    } else if (action.type === actionType.LOGIN_SUCCESS) {
        newState = Object.assign({}, state, {
            logged: true,
            id: action.type.id,
        });
    } else if (action.type === actionType.LOGIN_FAILURE) {
        newState = Object.assign({}, state, {
            logged: false,
            id: "",
        });
    } else if (action.type === actionType.MEMBER_LIST) {
        newState = Object.assign({}, state, {
            memberData: action.payload
        });
    } else if (action.type === actionType.shareBoardUpdate) {
        newState = Object.assign({}, state);
    } else if (action.type === actionType.googleLogin) {
        newState = Object.assign({}, state, {
            googleOn: action.googleOn,
            loginId: action.loginId,
            logged: action.logged
        })
    } else if (action.type === actionType.googleLogout) {
        newState = Object.assign({}, state, {
            googleOn: action.googleOn
        })
    } else if (action.type === actionType.setSearchResultDataList) {
        newState = Object.assign({}, state, {
            mainSearch: {
                category: action.category,
                searchVal: action.searchVal,
                searchResultDataList: action.searchResultDataList,
            },
        });
    } else if (action.type === actionType.weatherUpdate) {
        newState = Object.assign({}, state, {
            weatherInfo: action.weatherInfo,
            weatherInfo_2: action.weatherInfo_2,
            weatherInfo_3: action.weatherInfo_3,
        });
    } else if (action.type === actionType.setChatWindow) {
        newState = Object.assign({}, state, {
            isOpenChatWindow: action.isOpenChatWindow,
        });
    } else if (action.type === actionType.setSelectedRoomNum) {
        newState = Object.assign({}, state, {
            selectedRoomNum: action.selectedRoomNum,
            selectedFriend: action.selectedFriend,
        });
    } else if (action.type === actionType.setIsChatAutoUpdate) {
        newState = Object.assign({}, state, {
            isChatAutoUpdate: action.isChatAutoUpdate,
        });
    } else if (action.type === actionType.publishFunctionMsg) {
        //구독중인 함수들중에서 publishFunctionMsg 의 내용과 맞는 함수만 실행되게끔. pub/sub 비슷하게 만듦.
        //구독중인 함수들은 일단 모두 들어오기때문에 if(publishFunctionMsg == "abcd") 인경우만 들어오게 알아서 처리.
        /* 끝나고 이걸 해줘야 한다.
        *
        store.dispatch({
            type: actionType.publishFunctionMsg,
            publishFunctionMsg: "",
        });
        * */
        newState = Object.assign({}, state, {
            publishFunctionMsg: action.publishFunctionMsg,
        });
    } else if (action.type === actionType.chattingRoomListInfo) {
        newState = Object.assign({}, state, {
            chattingRoomListInfo: action.chattingRoomListInfo,
        });
    } else if (action.type === actionType.selectedChattingRoomMsgList) {
        newState = Object.assign({}, state, {
            selectedChattingRoomMsgList: action.selectedChattingRoomMsgList,
        });
    }

    console.log("reducer()", state, action, newState);
    return newState;
}

const enhancedReducer = persistReducer(persistConfig, reducer);

export default createStore(enhancedReducer
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

