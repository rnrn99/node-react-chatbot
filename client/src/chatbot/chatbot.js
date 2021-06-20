import React from 'react';

function Chatbot() {

    const keyPressHandler = (event) => {
        if(event.key === 'Enter'){
           // 아무것도 입력하지 않고 엔터를 누를 경우
            if(!event.target.value){
                return alert('내용을 입력해 주세요');
            }

            // 내용 입력 후 엔터 > textQuery에 req 보냄 > input창 비워줌

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