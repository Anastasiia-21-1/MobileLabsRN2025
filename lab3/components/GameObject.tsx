import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, View, Text } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useGameContext} from "@/store/context";
import FeedbackText from "@/components/FeedbackText";

const doubleTapRef = React.createRef();

const GameObject: React.FC = () => {
  const {
    addScore,
    incrementClickCount,
    incrementDoubleClickCount,
    setHasCompletedDrag,
    setHasCompletedHold,
    setHasCompletedSwipeRight,
    setHasCompletedSwipeLeft,
    setHasCompletedPinch,
  } = useGameContext();

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;

  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const showFeedbackMessage = (message: string, points: number) => {
    setFeedbackMessage(`${message} (+${points} points)`);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
    }, 1_500);
  };

  const onSingleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      addScore(1);
      incrementClickCount();
      showFeedbackMessage('Tap', 1);
    }
  };

  const onDoubleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      addScore(2);
      incrementDoubleClickCount();
      showFeedbackMessage('Double Tap', 2);
    }
  };

  const onLongPress = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      addScore(5);
      setHasCompletedHold(true);
      showFeedbackMessage('Long Press', 5);
    }
  };

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: false }
  );

  const onPanHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      addScore(3);
      setHasCompletedDrag(true);
      showFeedbackMessage('Drag', 3);
    }
  };

  const onFlingRight = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const points = Math.floor(Math.random() * 10) + 1;
      addScore(points);
      setHasCompletedSwipeRight(true);
      showFeedbackMessage('Swipe Right', points);
    }
  };

  const onFlingLeft = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const points = Math.floor(Math.random() * 10) + 1;
      addScore(points);
      setHasCompletedSwipeLeft(true);
      showFeedbackMessage('Swipe Left', points);
    }
  };

  const baseScale = useRef(new Animated.Value(1)).current;
  const pinchScale = useRef(new Animated.Value(1)).current;
  const lastScale = useRef(1);
  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: false }
  );

  const onPinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);

      addScore(4);
      setHasCompletedPinch(true);
      lastScale.current = 1;

      showFeedbackMessage('Pinch', 4);
    }
  };

  const combinedScale = Animated.multiply(baseScale, pinchScale);

  const bgColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3498db', '#e74c3c'],
  });

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.gameArea}>
        <FlingGestureHandler
          direction={2} // Right
          onHandlerStateChange={onFlingRight}
        >
          <FlingGestureHandler
            direction={4} // Left
            onHandlerStateChange={onFlingLeft}
          >
            <PanGestureHandler
              onGestureEvent={onPanGestureEvent}
              onHandlerStateChange={onPanHandlerStateChange}
            >
              <Animated.View>
                <PinchGestureHandler
                  onGestureEvent={onPinchGestureEvent}
                  onHandlerStateChange={onPinchHandlerStateChange}
                >
                  <Animated.View>
                    <LongPressGestureHandler
                      minDurationMs={3000}
                      onHandlerStateChange={onLongPress}
                    >
                      <Animated.View>
                        <TapGestureHandler
                          onHandlerStateChange={onSingleTap}
                          waitFor={doubleTapRef}
                        >
                          <Animated.View>
                            <TapGestureHandler
                              ref={doubleTapRef}
                              onHandlerStateChange={onDoubleTap}
                              numberOfTaps={2}
                            >
                              <Animated.View
                                style={[
                                  styles.gameObject,
                                  {
                                    transform: [
                                      { translateX },
                                      { translateY },
                                      { scale: Animated.multiply(scale, combinedScale) },
                                      { rotate: rotation },
                                    ],
                                    backgroundColor: bgColor,
                                  },
                                ]}
                              >
                                <Text style={styles.objectText}>TAP ME</Text>
                              </Animated.View>
                            </TapGestureHandler>
                          </Animated.View>
                        </TapGestureHandler>
                      </Animated.View>
                    </LongPressGestureHandler>
                  </Animated.View>
                </PinchGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </FlingGestureHandler>
        </FlingGestureHandler>

        <FeedbackText feedbackMessage={feedbackMessage} showFeedback={showFeedback} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameArea: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gameObject: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  objectText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default GameObject;
