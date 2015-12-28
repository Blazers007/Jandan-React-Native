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
    } = React;

import Static from './Static';
import _ from 'underscore';

// Component
var ARImage = require('./src/AutoResizingImage.android');
import {CardItem} from './CardItem';
import {CardUpperExtra} from './CardUpperExtra';
import {CardBottomExtra} from './CardBottomExtra';

export class PicturePager extends Component {

    /**
     * this.props.type 区别类型
     * */
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loading: false,
            page: 0,
            _pictureList: []
        }
    }

    componentDidMount() {
        this.fetchData(true);
    }

    fetchData(refresh) {
        // 设置更新状态
        if (refresh) {
            this.setState({
                page: 0,
                _pictureList: []
            })
        }
        this.setState({
                page: this.state.page +1,
                loading: true
        });
        fetch(Static.getPictureUrlByPageAndType(this.state.page, this.props.type))
            .then(response => response.json())
            .then((responseData) => {
                let post = this.state._pictureList.slice();
                // 转换 posts -> pictures
                _.flatten(
                    responseData.comments.map(item => {
                        let author = item.comment_author;
                        let comment = item.text_content;
                        let date = item.comment_date;
                        let pics = item.pics;
                        // 遍历Pic
                        return pics.map(pic => {
                            return {
                                comment_author: author,
                                comment: comment,
                                comment_date: date,
                                pic: pic
                            }
                        });
                    })
                ).forEach(picture => {
                    post.push(picture);
                });
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(post),
                    loading: false,
                    _pictureList: post
                });
            })
            .catch((error) => console.warn(error))
            .done();
    }


    render() {
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderPictureItem}
                onEndReached={()=>console.log(' ==== Picture End ====')}/>
        )
    }

    /**
     * Static Render
     * */
    renderPictureItem = (post, secId, rowId) => {
        console.log(post.comment, post.comment.length);
        if (post.comment && post.comment.lenth > 0) {
            return (
                <CardItem>
                    <CardUpperExtra post={post} shared={false} />
                    <ARImage src={post.pic}/>
                    <Text style={styles.text}>        {post.comment.trim()}</Text>
                    <CardBottomExtra/>
                </CardItem>
            )
        }
        return (
            <CardItem>
                <CardUpperExtra post={post} shared={false} />
                <ARImage src={post.pic}/>
                <CardBottomExtra/>
            </CardItem>
        )
    };

    onImageLoaded(width, height) {
        console.log(width. height);
    }

    createDynamicStyleByHeight() {
        let height = 300;
        return {
            height: height
        }
    }
}

const styles = StyleSheet.create({
    picture: {
        height: 250,
        margin: 0,
        padding: 0
    },
    text: {
        marginLeft: 16,
        marginRight: 12,
        color: '#222',
        fontSize: 14,
        lineHeight: 22
    }
});