import AppIcon from "@/assets/icons/ExpoVectorIcons";
import { Button } from "@/components/ui/button";
import CustomTextInput from "@/components/ui/input/CustomTextInput";
import Spinner from "@/components/ui/spinner";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [stage, setStage] = useState<"initial" | "email" | "phone">("initial");
    const [loading, setloading] = useState(false);
    const { logIn } = useAuthStore();
    const [inputError, setInputError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [otpError, setOtpError] = useState("");

    const isEmail = (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

    const isPhone = (value: string) =>
        /^\+?[0-9]{10,15}$/.test(value.replace(/\s/g, ""));

    const isOtp = (value: string) =>
        /^\d{4,6}$/.test(value.trim());

    // Live validation for input stage
    useEffect(() => {
        if (!input.trim()) {
            setInputError("");
        } else if (isEmail(input)) {
            setInputError("");
        } else if (isPhone(input)) {
            setInputError("");
        } else if (input.includes("@")) {
            setInputError("Enter a valid email address.");
        } else {
            setInputError("Enter a valid phone number.");
        }
    }, [input]);

    const handleNext = () => {
        if (isEmail(input)) {
            setInputError("");
            setStage("email");
        } else if (isPhone(input)) {
            setInputError("");
            setStage("phone");
        }
    };

    const handleContinue = () => {
        if (stage === "email") {
            if (!password.trim()) {
                setPasswordError("Password is required.");
                return;
            }
            setPasswordError("");
            alert(`Logging in with email: ${input}, password: ${password}`);
        } else if (stage === "phone") {
            if (!isOtp(otp)) {
                setOtpError("Enter a valid OTP (4–6 digits).");
                return;
            }
            setOtpError("");
            alert(`Verifying phone: ${input}, otp: ${otp}`);
        }
    };

    const handleBack = () => {
        if (stage !== "initial") {
            setStage("initial");
            setPassword("");
            setOtp("");
            setPasswordError("");
            setOtpError("");
        } else {
            router.back();
        }
    };

    const isNextDisabled = inputError !== "" || input.trim() === "";
    const isContinueDisabled =
        (stage === "email" && password.trim() === "") ||
        (stage === "phone" && !isOtp(otp));

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <View className="pt-4 px-6">
                    <Button variant={"ghost"} size={"icon"} onPress={handleBack}>
                        <AppIcon name="chevron-left" set="Feather" size={30} color="#1D4ED8" />
                    </Button>
                </View>

                <View className="flex-1 px-6 mt-24">
                    {stage === "initial" && (
                        <>
                            <Text className="text-xl font-semibold mb-4 text-gray-800">
                                Sign up with Email or Phone
                            </Text>

                            <CustomTextInput
                                placeholder="Enter Email or Phone Number"
                                value={input}
                                onChangeText={setInput}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                error={inputError}
                            />

                            <View className="flex-row items-center my-12 px-6">
                                <View className="flex-1 h-px bg-gray-500" />
                                <Text className="mx-2 text-gray-600 text-md font-medium">Or</Text>
                                <View className="flex-1 h-px bg-gray-500" />
                            </View>

                            <View className="gap-4">
                                <Button
                                    variant="default"
                                    className="bg-blue-600"
                                    size="lg"
                                    onPress={() => alert("Google Sign In")}
                                >
                                    <Text className="font-semibold text-white">Continue with Google</Text>
                                </Button>
                            </View>

                            <View className="gap-4 mt-4">
                                <Button
                                    variant="default"
                                    className="bg-blue-600"
                                    size="lg"
                                    onPress={logIn}
                                >
                                    <Text className="font-semibold text-white">SignIn</Text>
                                </Button>
                            </View>
                        </>
                    )}

                    {stage === "email" && (
                        <>
                            <Text className="text-xl font-semibold mb-4 text-gray-800">
                                Enter your password
                            </Text>
                            <CustomTextInput
                                placeholder="Password"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError("");
                                }}
                                error={passwordError}
                                type="password"
                            />

                        </>
                    )}

                    {stage === "phone" && (
                        <>
                            <Text className="text-xl font-semibold mb-4 text-gray-800">
                                Enter the OTP sent to your phone
                            </Text>
                            <CustomTextInput
                                placeholder="OTP"
                                value={otp}
                                onChangeText={(text) => {
                                    setOtp(text);
                                    setOtpError("");
                                }}
                                keyboardType="numeric"
                                error={otpError}
                            />
                        </>
                    )}
                </View>

                <View className="px-6 pb-6">
                    {stage === "initial" ? (
                        <Button
                            variant="default"
                            className="bg-blue-600"
                            size={"lg"}
                            onPress={handleNext}
                            disabled={isNextDisabled || loading}
                        >
                            {loading ? (
                                <Spinner color="#fff" />
                            ) : (
                                <Text className="font-semibold text-white">Next</Text>
                            )}
                        </Button>
                    ) : (
                        <Button
                            variant="default"
                            className="bg-blue-600"
                            size={"lg"}
                            onPress={handleContinue}
                            disabled={isContinueDisabled || loading}
                        >
                            {loading ? (
                                <Spinner color="#fff" />
                            ) : (
                                <Text className="font-semibold text-white">
                                    {stage === "email" ? "Continue" : "Verify"}
                                </Text>
                            )}
                        </Button>
                    )}
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Signup;
