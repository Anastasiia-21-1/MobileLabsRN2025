import {StyleSheet, Text, View} from "react-native";
import React from "react";

interface FeedbackTextProps {
  showFeedback: boolean;
  feedbackMessage: string;
}

export default function FeedbackText({showFeedback, feedbackMessage}: FeedbackTextProps) {
  if (!showFeedback) return null

  return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  feedbackContainer: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 10,
  },
  feedbackText: {
    color: 'white',
    fontWeight: 'bold',
  },
})