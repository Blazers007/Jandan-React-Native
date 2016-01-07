/**
 * Created by Blazers on 2016/1/7.
 */
'use strict';
import React from 'react-native';
const {
    Component,
    StyleSheet,
    ListView,
    View,
    Image,
    TouchableNativeFeedback
    } = React;

import DimensionsUtil from './../../../utils/DimensionsUtil';
import Database from './../../../utils/DatabaseUtil';

export default class FavoritePicture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        this.list = [];
    }

    componentDidMount() {
        // 搜索数据库加载对象
        Database.getFavedListByTypeOrderByDate('WuliaoList')
            .then(list => {
                list.forEach(item => this.list.push(item));
                this.updateList();
            })
            .catch(err => console.log(err));
    }

    updateList() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.list)
        });
    }

    render() {
        // 判断Platform来采用不同的刷新机制
        return(
            <ListView
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
            />
        )
    }

    renderItem = (post) => {
        return (
            <Image
                style={[DimensionsUtil.generateRowItemStyle.call(this, 3, 1, 2), {backgroundColor: '#ccc'}]}
                source={{uri: post.extra.pic}}/>
        )
    };
}

const styles = StyleSheet.create({
    list: {
        paddingLeft:1,
        paddingRight:1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});