package com.l1.auto;

import android.graphics.Color;
import android.graphics.PointF;
import android.graphics.drawable.Animatable;
import android.net.Uri;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.backends.pipeline.PipelineDraweeControllerBuilder;
import com.facebook.drawee.controller.AbstractDraweeControllerBuilder;
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
import com.facebook.react.uimanager.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.views.image.ReactImageView;

import javax.annotation.Nullable;

/**
 * Created by Blazers on 2015/12/25.
 */
public class ARImageManager extends SimpleViewManager<ARSimpleDraweeView> {

    public static final String REACT_CLASS = "ARImageView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public ARSimpleDraweeView createViewInstance(ThemedReactContext context) {
        ARSimpleDraweeView draweeView = new ARSimpleDraweeView(context);
        draweeView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        return draweeView;
    }

    // In JS this is Image.props.source.uri
    @ReactProp(name = "src")
    public void setSource(ARSimpleDraweeView view, @Nullable String source) {
        view.setup(source);
    }

}
