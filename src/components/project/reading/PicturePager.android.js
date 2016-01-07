/**
 * Created by Blazers on 2015/12/24.
 *
 *  暂时不分离List Cell Item？
 *
 */
'use strict';

import React from 'react-native';

const {
        Component,
        StyleSheet,
        ListView,
        Text,
        Image,
        View,
        TouchableHighlight,
        PullToRefreshViewAndroid,
    } = React;

import Static from '../../../static/Static';
import _ from 'underscore';

// Component
var ARImage = require('./../../common/AutoResizingImage.android.js');
import CardItem from '../../common/card/CardItem';
import CardUpperExtra from '../../common/card/CardUpperExtra';
import CardBottomExtra from '../../common/card/CardBottomExtra';

// 数据库
import Database from './../../../utils/DatabaseUtil';

export default class PicturePager extends Component {

    /**
     * this.props.type 区别类型
     * */
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loading: false
        };
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
     * 将内容更新到DataSource
     * */
    updateListData() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.list), // 该方法 将 原有的dataSource对象拷贝 并添加了Rows属性
            loading: false
        });
    }

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
        fetch(Static.getPictureUrlByPageAndKey(this.page, this.props.KEY))
            .then(response => response.json())
            .then((responseData) => {
                let post = this.list.slice();
                // 转换 posts -> pictures
                let imagePosts = _.flatten(
                    responseData.comments.map(item => {
                        let author = item.comment_author;
                        let comment = item.text_content;
                        let date = item.comment_date;
                        let pics = item.pics;
                        let comment_ID = item.comment_ID;
                        // 遍历Pic
                        return pics.map((pic, index) => {
                            return {
                                _id: comment_ID + '_' + index,
                                comment_author: author,
                                comment: comment,
                                comment_date: date,
                                pic: pic
                            }
                        });
                    })
                );
                imagePosts.forEach(picture => post.push(picture));
                this.list = post;
                this.updateListData();
                // 保存至数据库
                Database.saveDataByKeyAndPage(imagePosts, this.props.KEY, this.page);
                if (refresh) Database.saveRefreshTime(this.props.KEY);
            })
            .catch((error) => console.warn(error))
            .done();
    }


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
     * Static Render
     * */
    renderItem = (post, secId, rowId) => {
        if (post.comment && post.comment.trim().length > 0) {
            return (
                <CardItem>
                    <CardUpperExtra post={post} shared={false} />
                    <TouchableHighlight onPress={()=>this.onImagePress(post.pic)}>
                        <View>
                            <ARImage src={post.pic}/>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.text}>{post.comment.trim()}</Text>
                    <CardBottomExtra post={post} type={this.props.KEY}/>
                </CardItem>
            )
        }
        return (
            <CardItem>
                <CardUpperExtra post={post} shared={false} />
                <TouchableHighlight onPress={()=>this.onImagePress(post.pic)}>
                    <View>
                        <ARImage src={post.pic}/>
                    </View>
                </TouchableHighlight>
                <CardBottomExtra post={post} type={this.props.KEY}/>
            </CardItem>
        )
    };

    onImagePress(uri) {
        this.props.nav.push({
            title: 'Image',
            name: 'image',
            uri: uri
        });
    }

    onImageLoaded(width, height) {
        //console.log(width. height);
    }

    createDynamicStyleByHeight() {
        let height = 300;
        return {
            height: height
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    picture: {
        height: 250,
        margin: 0,
        padding: 0
    },
    text: {
        marginLeft: 16,
        marginRight: 12,
        marginTop:8,
        marginBottom: 8,
        color: '#222',
        fontSize: 14,
        lineHeight: 22
    }
});