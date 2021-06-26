import React from 'react'
import {List, Avatar} from 'antd';
import { RobotOutlined, SmileOutlined } from '@ant-design/icons';

function Message(props) {

    const icon = props.who === 'chatbot' ? <RobotOutlined/> : <SmileOutlined/>

    return (
        <List.Item style={{ padding: '1rem'}}>
            <List.Item.Meta
                avatar={<Avatar icon={icon}/>}
                title={props.who}
                description={props.text}
            />
        </List.Item>
    )
}

export default Message
