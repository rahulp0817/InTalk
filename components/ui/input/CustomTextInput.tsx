import { Ionicons } from '@expo/vector-icons';
import clsx from 'clsx';
import React, {
    forwardRef,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    label?: string;
    error?: string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    required?: boolean;
    variant?: 'default' | 'outlined' | 'underline' | 'none';
    type?: 'text' | 'password' | 'search';
    onClear?: () => void;
}

export const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
    (
        {
            label,
            error,
            startIcon,
            endIcon,
            containerClassName,
            labelClassName,
            inputClassName,
            errorClassName,
            required,
            variant = 'default',
            type = 'text',
            onClear,
            ...props
        },
        ref,
    ) => {

        const [isFocused, setIsFocused] = useState(false);
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        // 0 → unfocused, 1 → focused (will animate between)
        const focusAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            // Skip animation if we are showing a red error border
            if (error) return;

            Animated.timing(focusAnim, {
                toValue: isFocused ? 1 : 0,
                duration: 200,
                useNativeDriver: false, // animating borderColor
            }).start();
        }, [isFocused, error, focusAnim]);


        const togglePasswordVisibility = () => {
            setIsPasswordVisible(prev => !prev);
        };

        const renderEndIcon = () => {
            if (type === 'password') {
                return (
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                );
            }

            if (type === 'search' && props.value) {
                return (
                    <TouchableOpacity onPress={onClear}>
                        <Ionicons name="close" color="gray" size={20} />
                    </TouchableOpacity>
                );
            }

            return endIcon;
        };

        const baseBorder: any =
            variant === 'underline'
                ? { borderBottomWidth: 2, borderRadius: 0 }
                : variant === 'none'
                    ? {}
                    : { borderWidth: variant === 'outlined' ? 2 : 1, borderRadius: 8 };


        const animatedBorderColor = error
            ? '#EF4444' // red if error
            : focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#D1D5DB', '#3B82F6'], // gray → blue
            });

        return (
            <View className={clsx('w-full', containerClassName)}>
                {label && (
                    <Text
                        className={clsx(
                            'mb-2 text-sm font-medium',
                            error ? 'text-red-500' : 'text-gray-700',
                            labelClassName,
                        )}
                    >
                        {label}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                )}

                <Animated.View
                    style={[
                        styles.inputWrapper,
                        baseBorder,
                        { borderColor: animatedBorderColor },
                    ]}
                    className={clsx(
                        'flex flex-row items-center px-3 h-12 w-full transition-all',
                        inputClassName,
                    )}
                >
                    {/* Optional search prefix icon */}
                    {type === 'search' && (
                        <Ionicons
                            name="search"
                            color="gray"
                            size={20}
                            style={styles.iconSpacing}
                        />
                    )}

                    {/* Optional custom prefix icon */}
                    {startIcon && <View style={styles.iconSpacing}>{startIcon}</View>}

                    {/* Actual TextInput */}
                    <TextInput
                        {...props}
                        ref={ref}
                        secureTextEntry={type === 'password' && !isPasswordVisible}
                        onFocus={e => {
                            setIsFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={e => {
                            setIsFocused(false);
                            props.onBlur?.(e);
                        }}
                        placeholderTextColor="gray"
                        style={[styles.textInput, props.style]}
                    />

                    {/* Suffix icon(s) */}
                    {renderEndIcon() && (
                        <View style={styles.iconSpacing}>{renderEndIcon()}</View>
                    )}
                </Animated.View>

                {error && (
                    <Text className={clsx('mt-1 text-xs text-red-500', errorClassName)}>
                        {error}
                    </Text>
                )}
            </View>
        );
    },
);

const styles = StyleSheet.create({
    inputWrapper: {
        alignItems: 'center',
    },
    iconSpacing: {
        marginRight: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
        paddingVertical: 0,
        ...(Platform.OS === 'android' && { textAlignVertical: 'center' }),
    },
});

export default CustomTextInput;
