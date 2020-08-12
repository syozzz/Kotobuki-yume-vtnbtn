import styled from 'styled-components'
import styles from '../../styles/info.module.css'
import {
    ClockCircleOutlined
} from '@ant-design/icons'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Badge, Popover } from 'antd'

const NotifyBox = styled.div`
  color: rgba(0,0,0,.6);
  font-size: 14px;
  position: relative;
  margin-left: 10px;
  margin-top: 5px;
 
  
  @-webkit-keyframes opacity {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
  }
  @keyframes opacity {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
  }
  
  &:before {
    content: '[';
    position: absolute;
    left: -8px;
    top: 1px;
  }
  
  &:after {
    content: ']';
    position: relative;
    left: 3px;
    bottom: 1px;
  }
  
  &:before, &:after {
    color: #16a085;
    animation: 2s linear 0s normal none infinite opacity;
    -webkit-animation: 2s ease-out 0s normal none infinite opacity;
    -moz-animation: 2s ease-out 0s normal none infinite opacity;
    -o-animation: 2s ease-out 0s normal none infinite opacity;
  }
  
`

const Notify = () => {

    const [ biliLive, setBiliLive ] = useState(undefined)
    const [ ytbLive, setYtbLive ] = useState(undefined)

    useEffect(() => {
        axios.get('/api/live-bili')
            .then(function (response) {
                if (response.data.code === 0) {
                    const {
                        liveStatus,
                        url,
                        title,
                        cover
                    } = response.data.data
                    if (liveStatus === 1) {
                        setBiliLive({url, title, cover})
                    }
                }
            })

    }, [])

    return (
        <div className={styles.notifyBox}>
            <h4>
            <span style={{position: 'relative', top: '1px', paddingRight: '3px'}}>
                <ClockCircleOutlined style={{fontSize: '18px', color: '#1da1f2'}}/>
            </span>直播动态(beta)
            </h4>
            <NotifyBox>
                【youtube】{ytbLive ? '正在直播...' : '未开播'}
            </NotifyBox>
            <NotifyBox>
                【bilibili】{biliLive ?
                <Popover title={biliLive.title} placement="bottom" content={
                    <div style={{
                        height: '150px',
                        width: '250px',
                        background: `url(${biliLive.cover}) no-repeat center center`,
                        backgroundSize: 'contain'
                    }}></div>
                }>
                    <Badge status="processing" text={<a href={biliLive.url} target="_blank">直播中</a>} />
                </Popover>
                 : '未开播'}
            </NotifyBox>
        </div>
    )

}

export default Notify