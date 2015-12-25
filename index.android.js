/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

// React 集成组件
import React from 'react-native';
const {
        Component,
        AppRegistry,
        StyleSheet,
        Text,
        View,
        DrawerLayoutAndroid,
        ToolbarAndroid,
        Animated,
        Navigator,
        BackAndroid
    } = React;

// 渐变色组件
import LinearGradient from 'react-native-linear-gradient';
// TabLayout组件
var ScrollableTabView = require('react-native-scrollable-tab-view');


// 自身组件
import {NewsPager} from './NewsPager.android';
import {NewsDetail} from './NewsDetail.android';
import {PicturePager} from './PicturePager';
import {DuanziPager} from './DuanziPager.android';

// 全局变量
var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

// Const 常量
const toolbarActions = [
    {title: '离线阅读', icon: require('image!ic_inbox_black_18dp'), show: 'always'}
];

class l1 extends Component{

    constructor(props) {
        super(props);
        this.state= {
            bounceValue: new Animated.Value(0),
            loaded: false
        };
    }

    componentDidMount() {
        //
        this.state.bounceValue.setValue(1.5);     // Start large
        Animated.spring(                          // Base: spring, decay, timing
            this.state.bounceValue,                 // Animate `bounceValue`
            {
                toValue: 0.8,                         // Animate to smaller size
                friction: 1,                          // Bouncier spring
            }
        ).start();
        setTimeout(()=>this.setState({loaded: true}), 2000);
    }


    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <Navigator
                style={styles.container}
                initialRoute={{name: 'home'}}
                configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
                renderScene={this.routeMapper}/>
        )
    }

    onActionSelected(position) {
        //
    }

    /**
     * Render Functions
     * */
    renderLoadingView() {
        return (
            <Animated.Image                         // Base: Image, Text, View
                source={{uri: 'http://www.jiehengsen.com/uploads/allimg/140923/9-14092310323b06.jpg'}}
                style={{
          flex: 1,
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ]
        }}/>
        )
    }

    /**
     *
     * <NewsPager nav={navigationOperations}/>
     *
     * <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']} style={styles.shadow}/>
     *
     * Router and Navigator
     * */
    routeMapper(route, navigationOperations, onComponentRef) {
        _navigator = navigationOperations;
        if (route.name === 'home') {
            var navigationView = (
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!'</Text>
                </View>
            );
            return (
                <DrawerLayoutAndroid
                    ref='drawer'
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => navigationView}>
                    <DrawerLayoutAndroid
                        ref='drawerRight'
                        drawerWidth={200}
                        drawerPosition={DrawerLayoutAndroid.positions.Right}
                        renderNavigationView={() => navigationView}>
                        <View style={styles.container}>
                            <ToolbarAndroid
                                navIcon={require('image!ic_menu_black_18dp')}
                                title='煎蛋阅读'
                                titleColor='black'
                                style={styles.toolbar}
                                actions = {toolbarActions}
                                onIconClicked={() => this.refs.drawer.openDrawer()}
                                onActionSelected={this.onActionSelected}/>
                            <ScrollableTabView
                                style={styles.tabBar}
                                tabBarUnderlineColor='#434343'
                                tabBarActiveTextColor='#343434'
                                tabBarInactiveTextColor='#989898'>
                                <NewsPager tabLabel="新鲜事" nav={navigationOperations}/>
                                <PicturePager tabLabel="无聊图" type="wuliao"/>
                                <DuanziPager tabLabel="段子" type="wuliao"/>
                                <PicturePager tabLabel="梅志图" type="meizhi"/>
                            </ScrollableTabView>
                        </View>
                    </DrawerLayoutAndroid>
                </DrawerLayoutAndroid>
            )
        } else if (route.name === 'news') {
            return (
                <NewsDetail style={styles.container} post={route.post}/>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    toolbar: {
        backgroundColor: "#fafafa",
        height: 56,
    },
    tabBar: {
        backgroundColor: "#fafafa",
        height: 40
    },
    shadow: {
        height: 4
    }
});

AppRegistry.registerComponent('l1', () => l1);
