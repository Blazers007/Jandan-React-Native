'use strict';

import React from 'react-native';
const {
	Component,
	StyleSheet,
	ListView,
	Text,
	View,
	Image,
} = React;

import Static from './Static';
import {CardItem} from './CardItem';
import {CardUpperExtra} from './CardUpperExtra';
import {CardBottomExtra} from './CardBottomExtra';

//vars
var page = 0;
var _duanziList = [];

export class DuanziPager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			loading: false,
			page: 0,
			_duanziList: []
		}
	}

	componentDidMount() {
        this.fetchData(true);
	}

	fetchData(refresh) {
		// Start Loading
		// 设置更新状态
		if (refresh) {
			this.setState({
				page: 0,
				_duanziList: []
			})
		}
		this.setState({
			page: this.state.page +1,
			loading: true
		});
		fetch(Static.getDuanziUrlByPage(page))
			.then(response => response.json())
			.then(responseData => {
				let post = this.state._duanziList.slice();
				responseData.comments.forEach(item => {
					post.push(item);
				});
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(post),
					loading: false,
					_duanziList: post
				});
			})
			.catch(error => console.warn(error))
			.done();
	}

	render(){
		return(
			<ListView
			  dataSource={this.state.dataSource}
			  renderRow={this.renderDuanziItem}
              onEndReached={() => console.log(' ==== Duanzi End ====')}/>
		)
	}

	renderDuanziItem = (post) => {
		return (
			<CardItem>
				<CardUpperExtra
                    post={post}
                    shared={false}/>
                <Text style={styles.text}>        {post.comment_content}</Text>
                <CardBottomExtra/>
			</CardItem>
		)
	}
}

const styles = StyleSheet.create({
    text: {
        marginLeft: 16,
        marginRight: 12,
        color: '#222',
        fontSize: 14,
        lineHeight: 22
    }
});