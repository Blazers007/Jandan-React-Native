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
        Animated,
        Navigator,
        BackAndroid,
        Text
    } = React;

// 全局变量
var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

// Const
const NavMenuItems = [
    {text:'阅读', icon: require('image!ic_mood_black_24dp')},
    {text:'收藏', icon: require('image!ic_favorite_black_24dp')},
    {text:'设置', icon: require('image!ic_settings_black_24dp')}
];

// Menu
import {NavMenu} from './NavMenu.android';
// Scene
import ReadingScene from './ReadingPage';
import FavoriteScene from './FavoritePage';

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
                friction: 1                     // Bouncier spring
            }
        ).start();
        setTimeout(()=>this.setState({loaded: true}), 2000);
    }


    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        // Loading Complete
        return (
            <Navigator
                style={{flex: 1}}
                initialRoute={{name: 'home'}}
                configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
                renderScene={this.routeMapper}/>
        )
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
            {scale: this.state.bounceValue}  // Map `bounceValue` to `scale`
          ]
        }}/>
        )
    }

    renderNavDrawerMenu(index) {
        return (
            <NavMenu navListItems={NavMenuItems} selectNavIndex={index} onPress={this.onNavMenuListItemPressed}/>
        )
    }

    onNavMenuListItemPressed(index) {
        console.warn(index);
    }

    /**
     *
     * <NewsPager nav={navigationOperations}/>
     *
     * <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']} style={styles.shadow}/>
     *
     * Router and Navigator
     *
     * TODO:修改renderNavMenu的方法 更精简 更外围控制！ 不需要Scene内部再复写
     *
     * */
    routeMapper = (route, navigationOperations, onComponentRef) => {
        _navigator = navigationOperations;
        if (route.name === 'home') {
            return (<ReadingScene nav={navigationOperations} index={0} renderNavDrawer={this.renderNavDrawerMenu} />)
        } else if(route.name === 'favorite'){
            return (<FavoriteScene nav={navigationOperations} index={1} renderNavDrawer={this.renderNavDrawerMenu}/>)
        } else if (route.name === 'news') {
            return (<NewsDetail style={styles.container} post={route.post}/>)
        } else if (route.name === 'image') {
            return (<ImageLightBox uri={route.uri} navigator={navigationOperations}/>)
        }
    };
}

AppRegistry.registerComponent('l1', () => l1);
