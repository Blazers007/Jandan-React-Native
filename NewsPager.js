/**
 * Created by Blazers on 2015/12/23.
 *
 * 将新鲜事页面独立出来 封装为一个Component 便于操作
 */

'use strict';

import React from 'react-native';

const {
        Component,
        StyleSheet,
        Text,
        View,
        Image,
        ListView,
        PullToRefreshViewAndroid,
        TouchableNativeFeedback,
        InteractionManager,
    } = React;
import Static from './Static';
import _ from 'underscore';
import Database from './Database';

export default class NewsPager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loading: false
        };
        //
        this.list = [];
        this.page = 0;
    }

    componentDidMount() {
        // 01 首先加载本地数据
        Database.loadDataByKeyAndPage(this.props.KEY, 1)
            .then(list => {
                this.page = 1;
                list.forEach(item => this.list.push(item));
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
     * 根据页码获取
     * */
    fetchData(refresh) {
        if (this.state.loading)
            return;
        this.setState({
            loading: true
        });
        if (refresh) {
            this.list.lenth = 0;
            this.page = 1;
        } else {
            this.page ++;
        }
        // Start Fetching Data
        fetch(Static.getNewsUrlByPage(this.page))
            .then((response) => response.json())
            .then((responseData) => {
                // 添加 如果是刷新 list已经被清空
                var posts = this.list.slice();
                responseData.posts.forEach(post=>{
                    posts.push(post);
                });
                this.list = posts;
                this.updateListData();
                // 存储 仅仅存储该页的内容
                Database.saveDataByKeyAndPage(responseData.posts, this.props.KEY, this.page);
                if (refresh) Database.saveRefreshTime(this.props.KEY);
            })
            .catch((error) => {
                console.warn(error);
                this.setState({
                    loading: false
                });
            })
            .done();
    }

    /**
     * 将内容更新到DataSource
     * */
    updateListData() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.list), // 该方法 将 原有的dataSource对象拷贝 并添加了Rows属性
            loading: false
        });
    }


    /**
     * 如果需要渲染Loading不要替换掉ListView这样会导致ListView重新渲染 Scroll位置也随之回到0
     * */
    render() {
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

    /**
     * https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
     *
     * render的方法是异步执行 并且执行环境this不等于Class对象 需要预先绑定 或者使用下面的语法定义
     *
     * */
    renderItem = (post, sectionID, rowID, hightlightRow) => {
        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple()}
                onPress={()=>this.onNewsItemPressed(post)}>
                <View style={styles.itemRow}>
                    <Image
                        source={{uri: post.custom_fields.thumb_c[0]}}
                        style={styles.thumbnail}/>
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.year}>{post.author.name} @ {post.date}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    };

    onNewsItemPressed(post) {
        console.log(post.url);
        InteractionManager.runAfterInteractions(()=>{
            this.props.nav.push({
                title: post.title,
                name: 'news',
                post: post
            });
        })
    }
}

/**
 * Styles
 * */
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        height: 86,
        padding: 8,
        borderBottomWidth: 6,
        borderBottomColor: 'rgba(241,241,241,1)'
    },
    thumbnail: {
        width: 88,
        height: 64,
        marginRight: 16
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        color: "#2b2b2b",
        marginBottom: 8,
    },
    year: {
        fontSize: 14,
        color: '#686868',
    },
    listView: {
        marginTop: -4
    }
});