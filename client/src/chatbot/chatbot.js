import React from 'react';
import axios from 'axios';

function Chatbot() {

    // 서버의 textQuery에 req 보내고 res 처리
    const textQuery = async (msg) => {
        
        // 보낸 메세지 관리

        // msg에대한 form 만들어줌
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: msg
                }
            }
        }

        // 보낼 문장에 대한 form
        const textQueryVariables = {
            text: msg
        }

        // 요청 & 응답 처리
        try {
            // textQuery Route에 req 보내기
            const res = await axios.post('/api/dialogflow/textQuery', textQueryVariables)

            // 요청에 대한 응답이 담긴 부분
            const content = res.data.fulfillmentMessages[0]

            conversation = {
                who: 'chatbot',
                content: content
            }

            console.log(conversation)

        } catch(error) {
            conversation = {
                who: 'chatbot',
                content: {
                    text: {
                        text: "Failed to send message."
                    }
                }
            }
            console.log("Error : ",conversation)
        }
    }

    const keyPressHandler = (event) => {
        if(event.key === 'Enter'){
           // 아무것도 입력하지 않고 엔터를 누를 경우
            if(!event.target.value){
                return alert('내용을 입력해 주세요');
            }

            // 내용 입력 후 엔터 > textQuery에 req 보냄 > input창 비워줌
            textQuery(event.target.value)

            event.target.value = '';
        }
    }


    return (
        <div style={{ width: 700, height: 700, border: '3px solid #000', borderRadius: '7px' }}>
            <div style={{ width: '100%', height: 644, overflow:'auto'}}>
            </div>
            <input 
                style={{ margin: 0, width: '100%', height: 50, padding: '5px', fontSize: '1rem'}}
                placeholder='Send a message...'
                onKeyPress={keyPressHandler}
                type="text"
            />
        </div>
    )

}

export default Chatbot;