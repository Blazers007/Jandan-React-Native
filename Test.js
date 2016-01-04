'use strict';

const React = require('react-native');
const {
    ScrollView,
    StyleSheet,
    PullToRefreshViewAndroid,
    Text,
    TouchableWithoutFeedback,
    View,
    Image,
    ListView
    } = React;

var page = 0;
var _newsList = [];
import Static from './Static';


const styles = StyleSheet.create({
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5,
    },
    text: {
        alignSelf: 'center',
        color: '#fff',

    },
    layout: {
        flex: 1,
    },
    scrollview: {
        flex: 1,
    },
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

const Row = React.createClass({
    _onClick: function() {
        this.props.onClick(this.props.data);
    },
    render: function() {
        return (
            <TouchableWithoutFeedback onPress={this._onClick} >
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    },
});
const PullToRefreshViewAndroidExample = React.createClass({
    statics: {
        title: '<PullToRefreshViewAndroid>',
        description: 'Container that adds pull-to-refresh support to its child view.'
    },

    componentDidMount() {
        //this._onRefresh();
    },

    getInitialState() {
        return {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(20)).map(
                (val, i) => {return {text: 'Initial row' + i, clicks: 0}}),
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    _onClick(row) {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    },

    render() {
        const rows = this.state.rowData.map((row, ii) => {
            return <Row key={ii} data={row} onClick={this._onClick}/>;
        });
        return (
            <PullToRefreshViewAndroid
                style={styles.layout}
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor={'#ffff00'}
            >
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderNewsItem}/>
            </PullToRefreshViewAndroid>
        );
    },

    renderNewsItem(post, sectionID, rowID, hightlightRow) {
    return (
        <View >
            <Text>asdasdas</Text>
        </View>
    );
},

    _onRefresh() {
        this.setState({isRefreshing: true});
        //fetch(Static.getNewsUrlByPage(page))
        //    .then((response) => response.json())
        //    .then((responseData) => {
        //        // 添加
        //        var posts = _newsList.slice();
        //        responseData.posts.forEach(post=>{
        //            posts.push(post);
        //        });
        //        _newsList = posts;
        //        this.setState({
        //            dataSource: this.state.dataSource.cloneWithRows(_newsList), // 该方法 将 原有的dataSource对象拷贝 并添加了Rows属性
        //        });
        //    })
        //    .catch((error) => console.warn(error))
        //    .done();
    },

});


module.exports = PullToRefreshViewAndroidExample;