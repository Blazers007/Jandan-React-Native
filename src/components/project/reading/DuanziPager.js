'use strict';

import React from 'react-native';
const {
	Component,
	StyleSheet,
	ListView,
	Text,
	PullToRefreshViewAndroid,
    View,
} = React;

import Static from '../../../static/Static';

/**
 * Extend Key :  bla_liked bla_disliked bla_favorite
 * */

// 组件
import CardItem from '../../common/card/CardItem';
import CardUpperExtra from '../../common/card/CardUpperExtra';
import CardBottomExtra from '../../common/card/CardBottomExtra';

// 数据库
import Database from './../../../utils/DatabaseUtil';


export default class DuanziPager extends Component {
	constructor(props) {
		super(props);
        // State 对象
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			loading: false
		};
        // 变量
		this.list = [];
        this.page = 0;
	}

	componentDidMount() {
		// 01 首先加载本地数据
		Database.loadDataByKeyAndPage(this.props.KEY, 1)
			.then(list => {
				this.page = 1;
				list.forEach(item => {if (item != null) this.list.push(item)});
				this.updateListData();
			})
			.catch(err => {
				console.log(err);
				this.fetchData(true);
			});

		// 01-2 (异步执行) 判断是否需要读取数据
		Database.isNeedToRefresh(this.props.KEY)
			.then(refresh => {
				if (refresh) {
					this.fetchData(true);
				}
			});
	}

    /**
     * 更新List
     * */
    updateListData() {
        //this.list.forEach(item=>console.log(item));
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.list),
            loading: false
        });
    }

	fetchData(refresh) {
        if (this.state.loading)
            return;
		if (refresh) {
			this.list.length = 0;
            this.page = 1;
		} else {
            this.page ++;
        }
		// Fetching Data from Network
		fetch(Static.getDuanziUrlByPage(this.page))
			.then(response => response.json())
			.then(responseData => {
                // ? TODO:为何必须采用这种方式更新列表？ 直接利用原对象会导致比较指针问题而不能更新？
				let post = this.list.slice();
				responseData.comments.forEach(item => {
                    if (item != null) {
                        item._id = item.comment_ID;
                        post.push(item);
                    }
				});
                this.list = post;
				this.updateListData();
                //
                Database.saveDataByKeyAndPage(responseData.comments, this.props.KEY, this.page);
                if (refresh) Database.saveRefreshTime(this.props.KEY);
			})
			.catch(error => console.warn(error))
			.done();
	}


	render(){
		return(
            <PullToRefreshViewAndroid
                style={styles.container}
                refreshing={this.state.loading}
                onRefresh={()=>this.fetchData(true)}
                colors={['#000']}
                progressBackgroundColor={'#fff'}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    onEndReached={()=>this.fetchData(false)}/>
            </PullToRefreshViewAndroid>
		)
	}

	renderItem = (post) => {
        if (!post)
            return(
                <View></View>
            );
		return (
			<CardItem>
				<CardUpperExtra post={post} shared={false}/>
                <Text style={styles.text}>{post.comment_content}</Text>
                <CardBottomExtra post={post} type={this.props.KEY} />
			</CardItem>
		)
	};

    saveData(){
        let i = 0;
        if (this.list.some((item, index) => {
                i = index;
                return item.bla_favorite;
            }))
            console.log('--------------------- '+i+'--------------------------------');
    }

    componentWillUnmount() {
        console.log('-------------------------U N M O U N T-----------------------------');
        this.saveData();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        marginLeft: 16,
        marginRight: 12,
		marginBottom: 4,
        marginTop:-2,
        color: '#222',
        fontSize: 14,
        lineHeight: 24
    }
});