/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

// Static
var REQUEST_URL = 'http://jandan.net/?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&page=1&custom_fields=thumb_c,views&dev=1?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&page=1&custom_fields=thumb_c,views&dev=1';

var React = require('react-native');
var LinearGradient = require('react-native-linear-gradient');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  Animated,
  Navigator
} = React;

// Var Scenes
var NewsDetail = require('./NewsDetail');

// Vars
var toolbarActions = [
  {title: '离线阅读', icon: require('image!ic_inbox_black_18dp'), show: 'always'}
];

var DRAWER_REF = 'drawer';

var l1 = React.createClass({

  // 初始化 存储 标志位
  getInitialState: function() {
  	return {
  		dataSource: new ListView.DataSource({
  			rowHasChanged: (row1, row2) => row1 != row2,
  		}),
  		loaded: false,
      bounceValue: new Animated.Value(0),
      view: false,
  	};
  },

  componentDidMount: function() {
    //
    this.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();  
  	this.fetchData();
  },

  fetchData: function() {
  	fetch(REQUEST_URL)
  	  .then((response) => response.json())
  	  .then((responseData) => {
  	  	setTimeout(()=>this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts), // 该方法 将 原有的dataSource对象拷贝 并添加了Rows属性
          loaded: true
        }), 3000);
  	  })
  	  .catch((error) => console.warn(error))
  	  .done();

      //
      setTimeout(()=>this.setState({view: true}), 5000);
  },

  render: function() {
  	if (!this.state.loaded) {
  		return this.renderLoadingView();
  	}

    var navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!'</Text>
    </View>
    );

    if (this.state.view) {
      return (
        <NewsDetail link='http://jandan.net/2015/12/18/ramen-perform-marriages.html'/>
      )
    }

  	return(
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
              <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']} style={styles.shadow}/>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderNewsItem}
                style={styles.listView}/>
          </View>
          </DrawerLayoutAndroid>  
      </DrawerLayoutAndroid>    
  	)
  },

  onActionSelected: function(position) {

  },

  renderLoadingView: function() {
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
  },

  renderNewsItem: function(post) {
    return (
      <View style={styles.itemRow}>
          <Image
            source={{uri: post.custom_fields.thumb_c[0]}}
            style={styles.thumbnail}/>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.year}>{post.author.name} @ {post.date}</Text>
          </View>
        </View>
    );
  },

  _handlePress: function() {

  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: "#fafafa",
    height: 56,
  },
  shadow: {
    height: 4
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

AppRegistry.registerComponent('l1', () => l1);
