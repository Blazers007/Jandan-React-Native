/**
 * Created by Blazers on 2015/12/25.
 */
'use strict';

var React = require('react-native');
var { requireNativeComponent, View} = React;

class ARImage extends React.Component {

    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
        this.state = {
            height: 300
        }
    }

    render() {
        return <ARImageView
            style={this.createDynamicStyleByHeight()}
            {...this.props}
            onChange={this._onChange}/>;
    }

    _onChange(event: Event) {
        let screenWidth = event.nativeEvent.screenWidth / 3;
        let width = event.nativeEvent.width;
        let height = event.nativeEvent.height;
        let asp = width / height;
        console.log(asp);
        if (asp <= 0.4) {
            this.setState({
                height: parseInt(screenWidth / 1.118)
            })
        } else {
            this.setState({
                height: parseInt(screenWidth / asp)
            })
        }
    }

    createDynamicStyleByHeight() {
        return {
            height: this.state.height,
        }
    }
}

ARImage.propTypes = {
    src: React.PropTypes.string,
    ...View.propTypes
};

var ARImageView = requireNativeComponent('ARImageView', ARImage, {
    nativeOnly: {onChange: true}
});

module.exports = ARImage;