import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMsg } from '../_actions/message_actions';
import Message from './section/Message'
import { List, Avatar } from 'antd';
import { RobotOutlined, SmileOutlined } from '@ant-design/icons';
import Card from './section/Card'


function Chatbot() {
    const dispatch = useDispatch();
    const msgFromRedux = useSelector(state => state.message.messages);

    useEffect(() => {
        eventQuery('event_Welcome')
    }, []);

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
        };

        // 화면 업로드를 위한 대화 save
        dispatch(saveMsg(conversation));

        // 보낼 문장에 대한 form
        const textQueryVariables = {
            text: msg
        };

        // 요청 & 응답 처리
        try {
            // textQuery Route에 req 보내기
            const res = await axios.post('/api/dialogflow/textQuery', textQueryVariables);

            // 요청에 대한 응답이 담긴 부분
            for (let content of res.data.fulfillmentMessages) {
                conversation = {
                    who: 'chatbot',
                    content: content
                };

                // 화면 업로드를 위한 대화 save
                dispatch(saveMsg(conversation));
            }


        } catch (error) {
            conversation = {
                who: 'chatbot',
                content: {
                    text: {
                        text: "Failed to send message."
                    }
                }
            };
            // 화면 업로드를 위한 대화 save
            dispatch(saveMsg(conversation));
        }
    }

    const eventQuery = async (event) => {

        // event에 대한 form
        const eventQueryVariables = {
            event
        };

        // 요청 & 응답 처리
        try {
            // eventQuery Route에 req 보내기
            const res = await axios.post('/api/dialogflow/eventQuery', eventQueryVariables);
            // 요청에 대한 응답이 담긴 부분
            for (let content of res.data.fulfillmentMessages) {
                let conversation = {
                    who: 'chatbot',
                    content: content
                };

                // 화면 업로드를 위한 대화 save
                dispatch(saveMsg(conversation));
            }
        } catch (error) {
            let conversation = {
                who: 'chatbot',
                content: {
                    text: {
                        text: "Failed to request to(or response in) eventQuery"
                    }
                }
            };
            // 화면 업로드를 위한 대화 save
            dispatch(saveMsg(conversation));
        }
    }

    const keyPressHandler = (event) => {
        if (event.key === 'Enter') {
            // 아무것도 입력하지 않고 엔터를 누를 경우
            if (!event.target.value) {
                return alert('내용을 입력해 주세요');
            }

            // 내용 입력 후 엔터 > textQuery에 req 보냄 > input창 비워줌
            textQuery(event.target.value);

            event.target.value = '';
        }
    }

    const renderOneMsg = (message, i) => {
        // normal message와 card message 구분
        if (message.content && message.content.text && message.content.text.text) {
            // normal message
            return <Message key={i} who={message.who} text={message.content.text.text} />
        } else if (message.content && message.content.payload.fields.card) {
            // card message
            const icon = message.who === 'chatbot' ? <RobotOutlined /> : <SmileOutlined />
            return (

                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={icon} />}
                        title={message.who}
                        description={renderCard(message.content.payload.fields.card.listValue.values)}
                    />
                </List.Item>

            )
        }
    }

    const renderMsg = (returnedMsg) => {
        if (returnedMsg) {
            return returnedMsg.map((message, i) => {
                return renderOneMsg(message, i);
            })
        } else {
            return null;
        }
    }

    const renderCard = (cards) => {
        return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />)
    }

    return (
        <div style={{ width: 700, height: 700, border: '3px solid #000', borderRadius: '7px' }}>
            <div style={{ width: '100%', height: 644, overflow: 'auto' }}>
                {renderMsg(msgFromRedux)}
            </div>
            <input
                style={{ margin: 0, width: '100%', height: 50, padding: '5px', fontSize: '1rem' }}
                placeholder='Send a message...'
                onKeyPress={keyPressHandler}
                type="text"
            />
        </div>
    )

}

export default Chatbot;