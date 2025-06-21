import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';


interface FABPosition {
  bottom?: number;
  top?: number;
  left?: number;
  right?: number;
}

interface FABProps extends TouchableOpacityProps {
  position?: FABPosition;
  size?: number;
  backgroundColor?: string;
  children: React.ReactNode;
  onPress: () => void;
}

const FloatingActionButton: React.FC<FABProps> = ({
  position = { bottom: 20, right: 20 },
  size = 56,
  backgroundColor = '#2563eb', // blue-600
  children,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`absolute items-center justify-center rounded-full shadow-lg elevation-5`}
      style={[
        {
          width: size,
          height: size,
          backgroundColor,
          ...position,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      {...props}
    >
      <View className="items-center justify-center">
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;