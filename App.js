import { View, Platform } from 'react-native';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StackNavigator behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />
    </View>
  );
}
