import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>CampusXATL (Expo)</Text>
			<Link href="/auth">Go to Sign In</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
});