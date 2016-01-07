/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    TabBarIOS,
    Text,
    View,
    Image,
    } = React;

// TabLayout组件
import {NewsPager} from './src/components/project/reading/NewsPager.js';
import {DuanziPager} from './src/components/project/reading/DuanziPager.js';
import {PicturePager} from './src/components/project/reading/PicturePager.ios.js';

class l1 extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedTab: 'News'
        }
    }

    render() {
        return (
            <TabBarIOS style={{marginTop: 30}}>
                <TabBarIOS.Item
                    title="新鲜事"
                    selected={this.state.selectedTab === 'News'}
                    onPress={()=>this.setState({selectedTab: 'News'})}
                    icon={require('image!news')}>
                    <NewsPager style={{flex:1}}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="段子"
                    selected={this.state.selectedTab === 'Duanzi'}
                    onPress={()=>this.setState({selectedTab: 'Duanzi'})}
                    icon={require('image!duanzi')}>
                    <DuanziPager/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="无聊图"
                    selected={this.state.selectedTab === 'Wuliao'}
                    onPress={()=>this.setState({selectedTab: 'Wuliao'})}
                    icon={require('image!picture')}>
                    <PicturePager type="wuliao"/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#fff",
        height: 32
    },
});

AppRegistry.registerComponent('l1', () => l1);
