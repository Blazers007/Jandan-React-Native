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
        TouchableHighlight
    } = React;

import Static from './Static';
import _ from 'underscore';

// vars
var page = 1;
var _newsList = [];


export class NewsPager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loading: false
        };
    }

    componentDidMount() {
        this.fetchData(true);
        setTimeout(()=>this.props.nav,5000);
    }

    /**
     * 根据页码获取
     * */
    fetchData(refresh) {
        if (refresh) {
            _newsList.lenth = 0;
            page = 1;
        } else {
            page ++;
        }

        console.log('=================================================');
        if (this.state.loading)
            return;
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        this.setState({loading: true});
        fetch(Static.getNewsUrlByPage(page))
            .then((response) => response.json())
            .then((responseData) => {
                // 添加
                var posts = _newsList.slice();
                responseData.posts.forEach(post=>{
                   posts.push(post);
                });
                _newsList = posts;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(_newsList), // 该方法 将 原有的dataSource对象拷贝 并添加了Rows属性
                    loading: false
                });
            })
            .catch((error) => console.warn(error))
            .done();
    }

    /**
     * 如果需要渲染Loading不要替换掉ListView这样会导致ListView重新渲染 Scroll位置也随之回到0
     * */
    render() {
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderNewsItem}
                onEndReached={()=>this.fetchData(false)}/>
        )
    }

    /**
     * https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
     *
     * render的方法是异步执行 并且执行环境this不等于Class对象 需要预先绑定 或者使用下面的语法定义
     *
     * */
    renderNewsItem = (post, sectionID, rowID, hightlightRow) => {
        console.log(sectionID, rowID);
        return (
            <View>
                <TouchableHighlight
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
                </TouchableHighlight>
            </View>
        );
    };

    onNewsItemPressed(post) {
        console.log(post.url);
        this.props.nav.push({
            title: post.title,
            name: 'news',
            post: post
        });
    }
}

/**
 * Styles
 * */
const styles = StyleSheet.create({
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