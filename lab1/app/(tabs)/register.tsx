import React, { useState } from 'react';
import {StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Button} from 'react-native';
import { Stack, router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  surname: string;
  name: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  surname?: string;
  name?: string;
}

export default function RegisterScreen() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    surname: '',
    name: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.surname) {
      newErrors.surname = 'Surname is required';
    }
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      
      router.replace('/');
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText type="title" style={styles.title}>Register</ThemedText>
          
          <ThemedTextInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          
          <ThemedTextInput
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
            error={errors.password}
            secureTextEntry
            autoCapitalize="none"
          />
          
          <ThemedTextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange('confirmPassword', value)}
            error={errors.confirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          
          <ThemedTextInput
            label="Surname"
            placeholder="Enter your surname"
            value={formData.surname}
            onChangeText={(value) => handleChange('surname', value)}
            error={errors.surname}
            autoCapitalize="words"
          />
          
          <ThemedTextInput
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
            error={errors.name}
            autoCapitalize="words"
          />
          
          <Button
            title="Register"
            onPress={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
    marginTop: 48,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});