/**
* NewsDetail -- WebView for android
*/

'use strict';

import React from 'react-native';

const {
		Component,
		StyleSheet,
		View,
		Text,
        WebView
	} = React;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://m.facebook.com';

export class NewsDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
            url: DEFAULT_URL,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
		};
	}

	render() {
        return (
            <WebView
                style={styles.webView}
                url={this.props.post.url}/>
        );
	}

    onNavigationStateChange() {

    }

    onShouldStartLoadWithRequest() {

    }


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	webView: {
	    height: 350
  }
});
