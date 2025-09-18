import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AuthScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sign In</Text>
			<TextInput placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} style={styles.input} />
			<TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
			<Button title={loading ? 'Signing in...' : 'Sign In'} onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 500); }} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
	title: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
	input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8 },
});