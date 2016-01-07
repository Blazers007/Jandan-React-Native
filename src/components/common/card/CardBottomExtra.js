/**
 * Created by Blazers on 2015/12/25.
 * Props
 *  vote: {
 *      liked: boolean
 *      disliked: boolean
 *      favorite: boolean
 * }
 *
 */
'use strict';

import React from 'react-native';
const {
        Component,
        Animated,
        View,
        Text,
        Image,
        StyleSheet,
        TouchableWithoutFeedback,
        ToastAndroid,
    } = React;
import Database from './../../utils/DatabaseUtil';

export default class CardBottomExtra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            likedPressed: false,
            disliked: false,
            dislikedPressed: false,
            favorite: false,
            favoritePressed: false,
            commentPressed: false,
            fav: {
                rotate: new Animated.Value(0),
                scale: new Animated.Value(1),
                opacity: new Animated.Value(1)
            },
            oo: {
                translateY: new Animated.Value(0),
                opacity: new Animated.Value(0)
            },
            xx: {
                translateY: new Animated.Value(0),
                opacity: new Animated.Value(0)
            }
        };
    }

    componentDidMount() {
        // Check Mark
        Database.isThisTypeIdFaved(this.props.type, this.props.post._id)
            .then(res=>this.setState({favorite: res}));
    }

    render() {
        let up = this.state.liked || this.state.likedPressed ? require('image!ic_thumb_up_16dp') : require('image!ic_thumb_up_grey600_16dp');
        let down = this.state.disliked || this.state.dislikedPressed ? require('image!ic_thumb_down_16dp') : require('image!ic_thumb_down_grey600_16dp');
        let fav = this.state.favorite || this.state.favoritePressed ? require('image!ic_favorite_16dp') : require('image!ic_favorite_grey600_16dp');
        let comment = this.state.commentPressed ? require('image!ic_comment_16dp') : require('image!ic_comment_grey600_16dp');
        return (
            <View>
                <View style={styles.divider}/>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <TouchableWithoutFeedback
                            onPressIn={()=>this.setState({likedPressed: true})}
                            onPressOut={()=>this.setState({likedPressed: false})}
                            onPress={()=>this.setOO()}
                            style={styles.badgeViewTouchable}>
                            <View style={styles.badgeView}>
                                <Image
                                    source={up}
                                    style={styles.image}/>
                                <Text style={[styles.badge, (this.state.likedPressed||this.state.liked)&&{color: '#0f9bf5'}]}>0</Text>
                                <Animated.Text style={[styles.animatedBadge, {
                                    color: '#0f9bf5',
                                    transform:[
                                        {translateY: this.state.oo.translateY}
                                    ],
                                    opacity: this.state.oo.opacity
                                }]}>+1</Animated.Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPressIn={()=>this.setState({dislikedPressed: true})}
                            onPressOut={()=>this.setState({dislikedPressed: false})}
                            onPress={()=>this.setXX()}
                            style={styles.badgeViewTouchable}>
                        <View style={styles.badgeView}>
                                <Image
                                    source={down}
                                    style={styles.image}/>
                                <Text style={[styles.badge, (this.state.dislikedPressed||this.state.disliked)&&{color: '#ff3234'}]}>0</Text>
                                <Animated.Text style={[styles.animatedBadge, {
                                    color: '#ff3234',
                                    transform:[
                                        {translateY: this.state.xx.translateY}
                                    ],
                                    opacity: this.state.xx.opacity
                                }]}>+1</Animated.Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPressIn={()=>this.setState({commentPressed: true})}
                            onPressOut={()=>this.setState({commentPressed: false})}
                            onPress={()=>this.enterComment()}
                            style={styles.badgeViewTouchable}>
                        <View style={styles.badgeView}>
                                <Image
                                    source={comment}
                                    style={styles.image}/>
                                <Text style={[styles.badge, (this.state.commentPressed)&&{color: '#4bbb59'}]}>0</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback
                        onPressIn={()=>this.setState({favoritePressed: true})}
                        onPressOut={()=>this.setState({favoritePressed: false})}
                        onPress={()=>{this.setFavoriteOrNot()}}>
                        <View style={styles.wrapper}>
                            <Animated.Image
                                source={fav}
                                style={[styles.image, {
                                transform:[
                                    {scale: this.state.fav.scale}
                                ],
                                opacity: this.state.fav.opacity
                            }]}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.divider}/>
            </View>
        )
    }

    enterComment() {
        console.log('Comment');
    }

    /**
     * 点击OO效果
     * */
    setOO() {
        if (this.state.liked || this.state.disliked)
            return;
        this.setState({
            liked: true
        });
        Animated.parallel([
            Animated.sequence([
                Animated.timing(
                    this.state.oo.opacity,
                    {toValue: 1, duration: 50}
                ),
                Animated.timing(
                    this.state.oo.opacity,
                    {toValue: 0, duration: 600}
                )]),
            Animated.timing(
                this.state.oo.translateY,
                {toValue: -30, duration: 600}
            )
        ]).start();
    }

    /*
    * 点击XX效果
    * */
    setXX() {
        if (this.state.liked || this.state.disliked)
            return;
        this.setState({
            disliked: true
        });
        Animated.parallel([
            Animated.sequence([
                Animated.timing(
                    this.state.xx.opacity,
                    {toValue: 1, duration: 50}
                ),
                Animated.timing(
                    this.state.xx.opacity,
                    {toValue: 0, duration: 600}
                )]),
            Animated.timing(
                this.state.xx.translateY,
                {toValue: -30, duration: 600}
            )
        ]).start();
    }

    /**
     * 改变样式 并播放动画
     * */
    setFavoriteOrNot() {
        if (this.state.favorite) {
            // 取消收藏
            this.setState({favorite: false});
            Database.setFavedOrNotByTypeAndId(false, this.props.type, this.props.post._id)
                .then(res => {if(res) ToastAndroid.show('已取消收藏', ToastAndroid.SHORT)})
        } else {
            // 添加收藏
            this.setState({favorite: true});
            Database.setFavedOrNotByTypeAndId(true, this.props.type, this.props.post._id, this.props.post)
                .then(res => {if(res) ToastAndroid.show('已添加收藏', ToastAndroid.SHORT)})
        }
        Animated.parallel([
            Animated.sequence([
                Animated.timing(
                    this.state.fav.opacity,
                    {toValue: 0.3, duration: 300}
                ),
                Animated.timing(
                    this.state.fav.opacity,
                    {toValue: 1, duration: 300}
                )]),
            Animated.sequence([
                Animated.timing(
                    this.state.fav.scale,
                    {toValue: 1.5, duration: 300}
                ),
                Animated.timing(
                    this.state.fav.scale,
                    {toValue: 1, duration: 300}
                )])
        ]).start();
        //
        //this.props.post.bla_favorite = true; //TODO:传递是引用 可以直接对其进行修改
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftContainer: {
        flexDirection: 'row'
    },
    badgeViewTouchable: {
        marginLeft: 4
    },
    badgeView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    wrapper: {
        padding: 12
    },
    badge: {
        fontSize: 12,
        color: '#757575',
        marginLeft: 12
    },
    animatedBadge: {
        position: 'absolute',
        fontSize: 12,
        top:14,
        right:8
    },
    image: {
        width: 16,
        height: 16
    },
    divider: {
        height: 0.5,
        backgroundColor: '#e5e7e9'
    }
});
