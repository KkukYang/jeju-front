import {URL} from "./redux/config";
import store from "./redux/store";
import axios from "axios";

class ChattingLogic {

    getRoomList(callback = null) {
        let url = URL + "/chat/getRoom" +
            "?user=" + store.getState().loginId;

        console.log(url);

        axios.get(url
        ).then(res => {
            console.log("getRoomList() res :", res);
            if (callback != null) {
                callback(res);
            }
        }).catch(err => {
            console.log("getRoomList() err :", err);
        });
    }

    getMsgList(callback = null) {
        let url = URL + "/chat/getMsgs" +
            "?roomNum=" + store.getState().selectedRoomNum;

        console.log(url);

        axios.get(url)
            .then(res => {
                console.log(res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    createRoom(friendId, callback = null) {
        let url = URL + "/chat/createRoom";
        let user1 = store.getState().loginId;
        let user2 = friendId;

        console.log(url);

        axios.post(url, {user1, user2})
            .then(res => {
                console.log(res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    /*
    * // 메시지 입력
	@PostMapping("/chat/insertMsg")
	public void insertMsg(@RequestBody ChatmsgDto dto) {
		mapper.insertMsg(dto);
	}
    * */
    sendMessage(_msg, callback = null) {
        let roomNum = store.getState().selectedRoomNum;
        let msg = _msg;
        let sender = store.getState().loginId;

        let url = URL + "/chat/insertMsg";
        let data = {
            roomNum, msg, sender,
        };

        console.log(url, data);

        axios.post(url, data)
            .then(res => {
                console.log(res);
                if (callback != null) {
                    callback(res);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

}

export default ChattingLogic;
