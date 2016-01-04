/**
* NewsDetail -- WebView for android
*/

'use strict';

import React from 'react-native';

var WebViewAndroid = require('react-native-webview-android');
import Static from './Static';

const {
		Component,
		StyleSheet,
		View,
		Text,
        WebView
	} = React;

var SITE_URL = 'https://www.baidu.com';

export default class NewsDetail extends Component {

	constructor(props) {
		super(props);
        this.state =  {
            url: SITE_URL,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            htmlString: null
        };
	}

    componentDidMount() {
        fetch(Static.getNewsContentUrl(this.props.post.id))
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    htmlString: responseData.post.content
                })
            })
            .catch(error => console.warn(error))
            .done();
    }

    /**
     * //+ '<link rel=\"stylesheet\" type=\"text/css\" href=\"file:///android_asset/css/style.css\" />'
     //+ '<script src=\"file:///android_asset/js/main.js\" type=\"text/javascript\"></script>'
     * */
	render() {
        if (this.state.htmlString) {
            let string = '<!DOCTYPE html><html><body><head>'
                        + '</head>'
                        + this.state.htmlString
                        + '</body></html>';
            return (
                <WebViewAndroid
                    ref="webViewAndroidSample"
                    javaScriptEnabled={true}
                    geolocationEnabled={false}
                    builtInZoomControls={false}
                    onNavigationStateChange={this.onNavigationStateChange}
                    html={string}
                    style={styles.containerWebView} />
            );
        }
        return (
            <View style={styles.containerWebView}>
                <Text>Loading。。。</Text>
            </View>
        );
	}

    onNavigationStateChange() {

    }

    onShouldStartLoadWithRequest() {

    }


}

const styles = StyleSheet.create({
    containerWebView: {
        flex: 1,
    }
});
