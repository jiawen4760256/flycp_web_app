import React, { useState,useEffect } from 'react'
import './index.css'
import {
  getHomeList,
} from '../../store';
import { useSelector } from 'react-redux';
export default () => {
	const [htmlData, setHtmlData] = useState<any>([])
	
	const {about} = useSelector(getHomeList);
	let userListHtml = (<></>)
	useEffect(() => {
		let tmp = []
		tmp.push(...about)
		tmp.push(...about)
		setHtmlData(tmp)
	},[about])

	if( htmlData.length != 0){
		userListHtml = (<>
			{htmlData.map((item:any, index:any) => (<>
				<div className='about-row'>
					{item}
				</div>
			</>))}
		</>)

	}

  return (<>
		<div className='about-body'>
			<h2 className='about-title'>我们的使命</h2>
			<div className="about-content" >
				<div className="about-container">
       	 	<div className="about-scroll-list">
						{userListHtml}
					</div>
				</div>
			</div>
		</div>
	</>)
}

