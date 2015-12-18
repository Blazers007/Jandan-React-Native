/**
* NewsDetail -- WebView for android
*/

'use strict';

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
	WebView
} = React;

var NewsDetail = React.createClass({
	getInitialState: function() {
		return {
			liked: false,
			status: 'No Page Loaded',
      		backButtonEnabled: false,
      		forwardButtonEnabled: false,
      		loading: true,
      		scalesPageToFit: true,
		};
	},
	render: function() {
		return(
			<View style={styles.container}>
				<Text>WebView:{this.props.link}</Text>
				<WebView  style={styles.webView} url={this.props.link} />
			</View>
		)
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	webView: {
	    height: 350,
  },
});

module.exports = NewsDetail;