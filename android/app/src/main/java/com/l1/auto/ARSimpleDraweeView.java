package com.l1.auto;

import android.content.Context;
import android.graphics.PointF;
import android.graphics.drawable.Animatable;
import android.net.Uri;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.backends.pipeline.PipelineDraweeControllerBuilder;
import com.facebook.drawee.controller.BaseControllerListener;
import com.facebook.drawee.drawable.ProgressBarDrawable;
import com.facebook.drawee.drawable.ScalingUtils;
import com.facebook.drawee.generic.GenericDraweeHierarchy;
import com.facebook.drawee.generic.GenericDraweeHierarchyBuilder;
import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.imagepipeline.image.ImageInfo;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by Blazers on 2015/12/25.
 */
public class ARSimpleDraweeView extends SimpleDraweeView {

    public ARSimpleDraweeView(Context context, GenericDraweeHierarchy hierarchy) {
        super(context, hierarchy);
    }

    public ARSimpleDraweeView(Context context) {
        super(context);
    }

    public void setup(String source) {
        ImageRequest imageRequest = ImageRequest.fromUri(Uri.parse(source));
        PipelineDraweeControllerBuilder builder = Fresco.newDraweeControllerBuilder()
            .setImageRequest(imageRequest)
            .setControllerListener(new FrescoControlListener())
            .setAutoPlayAnimations(false);
        setController(builder.build());
        GenericDraweeHierarchy hierarchy = new GenericDraweeHierarchyBuilder(getResources())
            .setProgressBarImage(new ProgressBarDrawable())
            .build();
        setHierarchy(hierarchy);
        getHierarchy().setActualImageScaleType(ScalingUtils.ScaleType.FIT_CENTER);
    }


    class FrescoControlListener extends BaseControllerListener<ImageInfo> {

        @Override
        public void onFinalImageSet(String s, ImageInfo imageInfo, Animatable animatable) {
            if (imageInfo == null) {
                return;
            }
            int width = imageInfo.getWidth();
            int height = imageInfo.getHeight();
            // 判断大小 显示提示图片
            if (width > 2048 || height > 2048) {
                // Event img
            }
            // 控制硬件加速 以及宽高比
            if (width > 2048 || height > 2048)
                setLayerType(View.LAYER_TYPE_SOFTWARE, null);
            else
                setLayerType(View.LAYER_TYPE_HARDWARE, null);
            float asp = (float)imageInfo.getWidth() / (float)(imageInfo.getHeight());
            // 改变ScaleType
            if (asp <= 0.4) {
                getHierarchy().setActualImageScaleType(ScalingUtils.ScaleType.FOCUS_CROP);
                getHierarchy().setActualImageFocusPoint(new PointF(0.5f, 0f));
            }
            if (/*SPHelper.getBooleanSP(getContext(), SPHelper.AUTO_GIF_MODE_ON, false) &&*/ animatable != null)
                animatable.start();

            WritableMap event = Arguments.createMap();
            event.putInt("screenWidth", getMeasuredWidth());
            event.putInt("height", height);
            event.putInt("width", width);
            ReactContext reactContext = (ReactContext) getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "topChange",
                event
            );
        }

        @Override
        public void onFailure(String s, Throwable throwable) {

        }

        @Override
        public void onRelease(String s) {
            // Log.i("Release Image", s);
        }
    }

    public void onReceiveNativeEvent() {
        WritableMap event = Arguments.createMap();
        event.putString("height", "300");
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
            getId(),
            "topChange",
            event
        );
    }

}
